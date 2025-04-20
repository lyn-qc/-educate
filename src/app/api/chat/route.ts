import { NextResponse, NextRequest } from "next/server";
import { sidebarModel } from "@/db/AI"; // 导入数据库模型
import mongoose from "mongoose";

interface ChatMessage {
  role: string;
  content: string;
  createdAt?: Date;
}

// 定义数据库中消息的接口
interface DbMessage {
  role: string;
  content: string;
  createdAt?: Date;
  _id?: mongoose.Types.ObjectId;
}

// 定义会话接口
interface DbConversation {
  _id: mongoose.Types.ObjectId;
  messages: DbMessage[];
  userAgent?: string;
  createdAt?: Date;
}

export async function GET(request: NextRequest) {
  const content = request.nextUrl.searchParams.get('content');
  return NextResponse.json({ data: content })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, switchFlag, conversationId, useHistoryContext = true } = body;
    
    // 验证接收的请求
    // console.log(`接收到对话请求，会话ID: ${conversationId || '新会话'}, 使用历史: ${useHistoryContext}`);
    
    // 从数据库获取历史消息，只有当useHistoryContext为true时才获取
    let messageHistory: ChatMessage[] = [];
    
    if (conversationId && useHistoryContext) {
      try {
        // 查询数据库获取当前会话
        const conversation = await sidebarModel.findById(conversationId) as DbConversation | null;
        
        if (conversation && conversation.messages && Array.isArray(conversation.messages)) {
          // console.log(`从数据库获取到历史消息，数量: ${conversation.messages.length}`);
          
          // 过滤有效消息并排序
          const validMessages = conversation.messages
            .filter((msg: DbMessage) => msg && msg.content && msg.content.trim() !== '')
            .sort((a: DbMessage, b: DbMessage) => {
              if (!a.createdAt || !b.createdAt) return 0;
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            });
          
          // 获取最近5条消息，如果不足5条则获取全部
          const recentMessages = validMessages.slice(-5);
          
          // 转换为所需格式
          messageHistory = recentMessages.map((msg: DbMessage) => ({
            role: standardizeRole(msg.role),
            content: msg.content
          }));
          
          // console.log(`成功获取历史消息，使用${messageHistory.length}条作为上下文`);
        } else {
          console.log("未找到指定会话或会话没有消息");
        }
      } catch (dbError) {
        console.error("从数据库获取历史消息失败:", dbError);
      }
    }
    
    // 确保所有消息的role字段使用正确的格式
    const standardizedHistory = messageHistory;

    // 分析历史消息中可能的角色设定
    const roleInstruction = extractRoleInstruction(standardizedHistory);
    // console.log("检测到的角色设定:", roleInstruction ? roleInstruction.substring(0, 50) + "..." : "无特定角色");

    // 提取关键信息作为记忆点
    const memoryPoints = extractKeyMemoryPoints(standardizedHistory);
    
    // 检查当前问题是否可能与历史相关
    const contextRelevance = analyzeContextRelevance(content, standardizedHistory);
    
    // 创建适应性强的系统提示
    const systemContent = createSystemPrompt(
      roleInstruction, 
      memoryPoints, 
      standardizedHistory.length,
      contextRelevance
    );

    // 创建系统消息
    const systemPrompt = {
      role: "system",
      content: systemContent
    };

    // 添加系统提示和所有历史消息
    // 保持完整历史记录，确保AI有足够上下文
    const allMessages = [
      systemPrompt,
      ...standardizedHistory,
      { role: "user", content }
    ];
    
    // 记录实际发送的消息数量
    // console.log(`发送到AI的消息数量: ${allMessages.length}`);
    
    // 构建请求体
    const requestBody = {
      model: switchFlag ? 'Pro/deepseek-ai/DeepSeek-R1' : 'Pro/deepseek-ai/DeepSeek-V3',
      stream: false,
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      frequency_penalty: 0.5,
      n: 1,
      messages: allMessages
    };

    

    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk-tqfkieqcpqrdxhigohmfhipmkbfmnxewoeuodxvhtcmguolr',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    };

    let xiaoxi = null;
    try {
      const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', options);
      xiaoxi = await response.json();

      if (xiaoxi && xiaoxi.choices && xiaoxi.choices[0]) {
        console.log("AI响应成功");
      } else {
        console.log("AI响应格式异常");
      }
    } catch (err) {
      console.error("调用API失败:", err);
    }

    // 创建更新后的消息历史，包含当前用户消息和AI回复
    const updatedMessageHistory = [
      ...standardizedHistory,
      { role: "user", content },
      { role: "assistant", content: xiaoxi?.choices?.[0]?.message?.content || "无回复" }
    ];

    return NextResponse.json({
      success: true,
      receivedContent: xiaoxi,
      message: "Data received successfully",
      conversationId: conversationId,
      messageHistory: updatedMessageHistory // 返回更新后的完整历史记录
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // console.error('处理请求时出错:', errorMessage);
    return NextResponse.json({
      success: false,
      error: errorMessage
    }, { status: 400 });
  }
}

// 辅助函数：标准化角色名称
function standardizeRole(role: string): "user" | "assistant" | "system" {
  role = role.toLowerCase();
  if (role === 'user' || role === 'local') return 'user';
  if (role === 'assistant' || role === 'ai') return 'assistant';
  return 'system';
}

// 辅助函数：从历史消息中提取角色设定指令
function extractRoleInstruction(history: ChatMessage[]): string | null {
  // 角色设定通常在用户消息中出现
  const rolePatterns = [
    /你(现在|是|将|应该|要|需要)?是(一[个名位])?([^，。！？\n]+)/i,
    /你(现在|将|应该|要|必须)?扮演(一[个名位])?([^，。！？\n]+)/i,
    /作为(一[个名位])?([^，。！？\n]+)/i,
    /充当(一[个名位])?([^，。！？\n]+)/i,
    /假设你是([^，。！？\n]+)/i,
    /我需要([^，。！？\n]+)(帮助|协助|建议)/i
  ];

  // 从较晚到较早的消息查找角色设定
  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    if (msg.role !== 'user') continue;
    
    // 先检查明确的角色设定指令
    for (const pattern of rolePatterns) {
      const match = msg.content.match(pattern);
      if (match) {
        // 查找完整角色描述及相关上下文
        return msg.content;
      }
    }
    
    // 检查是否包含专业领域名词
    const professionKeywords = ['工程师', '专家', '顾问', '老师', '教授', '助手', '医生', '律师', '程序员', '开发者', "设计"];
    for (const keyword of professionKeywords) {
      if (msg.content.includes(keyword)) {
        // 提取包含关键词的句子和上下文
        const sentences = msg.content.split(/[。！？.!?]/);
        for (const sentence of sentences) {
          if (sentence.includes(keyword)) {
            return msg.content; // 返回包含角色关键词的整个消息
          }
        }
      }
    }
  }
  
  return null;
}

// 辅助函数：提取关键记忆点
function extractKeyMemoryPoints(history: ChatMessage[]): string[] {
  if (history.length < 2) return [];

  const memoryPoints: string[] = [];
  const seenPoints = new Set<string>(); // 避免重复记忆点
  
  // 重要信息关键词
  const importantKeywords = [
    '记住', '重要', '关键', '注意', '请记', '不要忘', 
    '名字是', '我叫', '我的名字', '我的职业', '我的工作',
    '我想要', '我需要', '我希望', '我要求'
  ];
  
  // 分析用户-AI的对话对，提取关键信息
  for (let i = 0; i < history.length; i++) {
    const msg = history[i];
    
    if (msg.role === 'user') {
      // 1. 检查用户输入是否包含重要关键词
      for (const keyword of importantKeywords) {
        if (msg.content.includes(keyword)) {
          // 提取包含关键词的句子
          const sentences = msg.content.split(/[。！？.!?]/);
          for (const sentence of sentences) {
            if (sentence.includes(keyword) && sentence.length < 100) {
              const point = `用户说: ${sentence.trim()}`;
              if (!seenPoints.has(point)) {
                memoryPoints.push(point);
                seenPoints.add(point);
              }
            }
          }
          break; // 已找到一个关键词，无需继续检查当前消息的其他关键词
        }
      }
      
      // 2. 短问题通常更重要
      if (msg.content.length < 40 && msg.content.length > 5) {
        const point = `用户问: ${msg.content}`;
        if (!seenPoints.has(point)) {
          memoryPoints.push(point);
          seenPoints.add(point);
        }
      }
    }
    
    if (msg.role === 'assistant' && i > 0 && history[i-1].role === 'user') {
      // 检查AI回答中是否包含标记重要信息的词
      const answer = msg.content;
      const importantAnswer = importantKeywords.some(keyword => answer.includes(keyword));
      
      if (importantAnswer && answer.length < 100) {
        const point = `助手说: ${answer.substring(0, 50)}${answer.length > 50 ? '...' : ''}`;
        if (!seenPoints.has(point)) {
          memoryPoints.push(point);
          seenPoints.add(point);
        }
      }
    }
  }
  
  // 限制记忆点数量，优先保留最新的记忆点
  return memoryPoints.slice(-7); // 增加到7个记忆点
}

// 辅助函数：分析上下文相关性
function analyzeContextRelevance(currentContent: string, history: ChatMessage[]): string {
  // 实现简单的上下文相关性分析逻辑
  if (history.length === 0) {
    return "新对话，无历史上下文";
  }
  
  // 检查当前内容是否与历史消息有关联
  const lastMessages = history.slice(-3); // 获取最近3条消息
  const hasContextContinuity = lastMessages.some(msg => 
    currentContent.includes(msg.content.substring(0, 10)) || // 内容部分匹配
    msg.content.includes(currentContent.substring(0, 10))    // 内容部分匹配
  );
  
  return hasContextContinuity 
    ? "当前问题与历史对话高度相关" 
    : "当前问题可能是新话题";
}

// 辅助函数：创建系统提示
function createSystemPrompt(roleInstruction: string | null, memoryPoints: string[], historyLength: number, contextRelevance: string): string {
  let prompt = `你是一个高度智能的设计AI助手，能够记住对话的完整上下文并保持角色一致性。`;
  
  // 添加角色设定
  if (roleInstruction) {
    prompt += `\n\n根据用户指示，你的角色设定是: ${roleInstruction}`;
    prompt += `\n无论用户后续提问如何，请始终保持这个角色设定，并从该角色的专业视角回答问题。`;
  }
  
  // 添加记忆指导
  prompt += `\n\n重要指南:
1. 记住并整合之前对话中的所有信息，保持对话连贯性
2. 当被问到你是谁或你的角色时，请基于用户之前的设定回答
3. 当用户提及之前讨论的内容时，请回顾历史记录并准确回应
4. 在整个对话过程中保持一致的角色和语气
5. 始终记住用户之前告诉你的专业领域或身份设定
6. 基于当前会话中的${historyLength}条历史消息进行回答
7. 使用Markdown格式进行回复，特别是在解释复杂概念、列出步骤或展示代码时`;

  // 添加关键记忆点
  if (memoryPoints.length > 0) {
    prompt += `\n\n请记住对话中的关键信息:`;
    memoryPoints.forEach((point, index) => {
      prompt += `\n${index + 1}. ${point}`;
    });
  }
  
  // 添加上下文相关性分析结果
  prompt += `\n\n上下文相关性分析结果: ${contextRelevance}`;
  
  return prompt;
}