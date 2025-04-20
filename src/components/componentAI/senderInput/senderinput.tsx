/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useRef, useEffect, useState } from 'react'
import { CloudUploadOutlined, LinkOutlined } from '@ant-design/icons';
import { Sender, useXAgent, useXChat, Attachments, AttachmentsProps } from '@ant-design/x';
import { Flex, type GetProp, Button, type GetRef, Divider, Switch, theme } from 'antd';
import InitalPage from '../initalPage/initalPage';
import { useSwitchModel, useInitalFlag, useSiderbarData } from "@/regionAI/jotai/switch"
import MessageList from '../MessageList';

// 定义会话数据接口
interface Conversation {
    _id: string;
    messages: ApiMessage[];
    userAgent?: string;
    createdAt?: Date;
}

// 定义API响应中的消息接口
interface ApiMessage {
    role: 'user' | 'assistant';
    content: string;
    createdAt?: Date;
}

// 定义组件接收的属性类型
interface SenderInputProps {
    onConversationCreated?: () => void;
}

// 定义气泡消息类型
interface BubbleMessage {
    key: string | number;
    role: 'user' | 'assistant';
    content: string;
}

export default function Senderinput({ 
    onConversationCreated
}: SenderInputProps) {
    const { token } = theme.useToken();

    const [content, setContent] = useState('');

    const abortRef = useRef(() => { });
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<GetProp<AttachmentsProps, 'items'>>([]);
    
    const senderRef = React.useRef<GetRef<typeof Sender>>(null);

    const [switchFlag, setSwitchFlag] = useSwitchModel();
    const [initalFlag, setInitalFlag] = useInitalFlag();
    const [selectedConversationId, setSelectedConversationId] = useSiderbarData();
    
    // 是否使用会话历史作为上下文
    const [useHistoryContext, setUseHistoryContext] = useState<boolean>(true);
    
    // 历史消息列表 - 从服务器加载
    const [historyMessages, setHistoryMessages] = useState<ApiMessage[]>([]);
    // 所有要显示的消息
    const [allBubbleMessages, setAllBubbleMessages] = useState<BubbleMessage[]>([]);

    // 当 selectedConversationId 变化时，加载该会话的消息并修改状态
    useEffect(() => {
        const loadSelectedConversation = async () => {
            console.log("selectedConversationId 更新为:", selectedConversationId, typeof selectedConversationId);
            
            // 先清空当前显示的消息，避免显示上一个会话的内容
            setAllBubbleMessages([]);
            
            // 确保 selectedConversationId 非空且有值
            if (selectedConversationId && selectedConversationId.trim() !== '') {
                // 设置显示聊天界面
                setInitalFlag(false);
                // 加载选定的会话，并等待完成
                const success = await loadConversation(selectedConversationId);
                console.log("会话加载结果:", success ? "成功" : "失败", 
                            "当前historyMessages长度:", historyMessages.length);

                // 确保历史记录开关打开
                if (success && historyMessages.length > 0) {
                    setUseHistoryContext(true);
                    console.log("已自动开启历史记录开关");
                }
            } else {
                // 清空历史消息
                setHistoryMessages([]);
                setAllBubbleMessages([]);
            }
        };
        
        loadSelectedConversation();
    }, [selectedConversationId, setInitalFlag]);

    // 加载会话 - 确保返回Promise并等待状态更新
    const loadConversation = async (conversationId: string): Promise<boolean> => {
        try {
            console.log("开始加载会话:", conversationId);
            // 首先尝试获取会话数据
            const response = await fetch(`/api/addSidebar`);
            const result = await response.json();
            
            if (result.code === 200 && Array.isArray(result.data)) {
                // 找到当前选中的会话
                const conversation = result.data.find((conv: Conversation) => conv._id === conversationId);
                
                if (conversation && conversation.messages && Array.isArray(conversation.messages)) {
                    // 防止空消息
                    const validMessages = conversation.messages.filter((msg: ApiMessage) => 
                        msg && msg.content && msg.content.trim() !== '');
                        
                    if (validMessages.length === 0) {
                        console.log("会话存在但没有有效消息");
                        setHistoryMessages([]);
                        setAllBubbleMessages([]);
                        return false;
                    }
                    
                    // 确保消息按时间顺序排序
                    const sortedMessages = [...validMessages].sort((a, b) => {
                        if (!a.createdAt || !b.createdAt) return 0;
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    });
                    
                    // 检查消息角色是否需要统一转换，确保符合OpenAI标准格式
                    const standardizedMessages = sortedMessages.map(msg => {
                        // 创建新对象以避免修改原始对象
                        return {
                            ...msg,
                            role: standardizeRole(msg.role)
                        };
                    });
                    
                    // 记录转换后的消息数量
                    console.log(`准备设置历史消息，数量: ${standardizedMessages.length}`);
                    
                    // 使用Promise方式设置状态，确保完成后再继续
                    await new Promise<void>(resolve => {
                        setHistoryMessages(standardizedMessages);
                        // 使用setTimeout确保状态更新完成
                        setTimeout(() => {
                            console.log(`状态更新后的historyMessages长度: ${standardizedMessages.length}`);
                            resolve();
                        }, 0);
                    });
                    
                    // 添加日志，确认historyMessages设置成功
                    console.log(`设置历史消息到状态，数量: ${standardizedMessages.length}`);
                    
                    // 转换消息为Bubble.List格式 - 用于UI显示
                    const bubbleMessages = standardizedMessages.map((msg: ApiMessage, index: number) => ({
                        key: `history-${index}`,
                        role: msg.role as 'user' | 'assistant',
                        content: msg.content
                    }));
                    
                    setAllBubbleMessages(bubbleMessages);
                    // 强制显示聊天内容
                    setInitalFlag(false);
                    
                    // 设置历史标志，表示有可用的会话历史
                    setUseHistoryContext(standardizedMessages.length > 0);
                    
                    console.log(`已加载会话历史，共 ${standardizedMessages.length} 条有效消息`);
                    
                    // 分析对话历史，检查是否存在用户-AI消息对
                    const pairs = countConversationPairs(standardizedMessages);
                    console.log(`对话包含 ${pairs} 组完整问答对`);
                    return true;
                } else {
                    console.error(`未找到ID为${conversationId}的会话或没有消息`);
                    setHistoryMessages([]);
                    setAllBubbleMessages([]);
                    return false;
                }
            } else {
                console.error('获取会话数据失败');
                setHistoryMessages([]);
                setAllBubbleMessages([]);
                return false;
            }
        } catch (error) {
            console.error('加载会话失败:', error);
            setHistoryMessages([]);
            setAllBubbleMessages([]);
            return false;
        }
    };
    
    // 计算有多少组完整的问答对
    function countConversationPairs(messages: ApiMessage[]): number {
        let pairs = 0;
        for (let i = 0; i < messages.length - 1; i++) {
            if (messages[i].role === 'user' && messages[i+1].role === 'assistant') {
                pairs++;
            }
        }
        return pairs;
    }

    // 保存消息到数据库
    const saveMessages = async (userMessage: string, aiMessage: string) => {
        try {
            // 确保有待保存的消息
            if (!userMessage || !aiMessage) {
                console.error('保存消息失败: 消息内容为空');
                return;
            }
            
            // 从 localStorage 直接获取会话 ID，确保获取最新值
            let effectiveConversationId;
            
            if (typeof window !== 'undefined') {
                const storedId = localStorage.getItem('selected_conversation_id');
                // 解析存储的ID，可能是JSON格式
                try {
                    const parsedId = storedId ? JSON.parse(storedId) : null;
                    effectiveConversationId = 
                        parsedId && typeof parsedId === 'string' && parsedId.trim() !== ''
                        ? parsedId
                        : undefined;
                } catch {
                    // 如果解析失败，直接使用原始字符串
                    effectiveConversationId = 
                        storedId && storedId.trim() !== ''
                        ? storedId
                        : undefined;
                }
            } else {
                // 备用方案：使用状态中的值
                const latestSelectedId = selectedConversationId;
                effectiveConversationId = 
                    latestSelectedId && typeof latestSelectedId === 'string' && latestSelectedId.trim() !== '' 
                    ? latestSelectedId
                    : undefined;
            }
            
            // 发送消息到服务器
            const response = await fetch('/api/addMessages', {
                method: 'POST',
                body: JSON.stringify({
                    conversationId: effectiveConversationId,
                    userMessage,
                    aiMessage
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.code === 200) {
                // 如果创建了新会话或需要更新会话ID
                if (data.data && data.data._id && (!effectiveConversationId || effectiveConversationId !== data.data._id)) {
                    // 设置新创建的会话ID到全局状态和localStorage
                    setSelectedConversationId(data.data._id);
                    
                    // 通知父组件更新会话列表
                    if (onConversationCreated) {
                        onConversationCreated();
                    }
                } else {
                    // 不再重新加载会话历史，因为已经在前端更新了历史消息
                    console.log('消息已保存到数据库，无需重新加载历史');
                }
            } else {
                console.error('保存消息失败:', data.message);
            }
        } catch (error) {
            console.error('保存消息时出错:', error);
        }
    };

    // 监听 initalFlag 变化的日志
    useEffect(() => {
        console.log("initalFlag 变化为:", initalFlag);
    }, [initalFlag]);

    const iconStyle = {
        fontSize: 18,
        color: token.colorText,
    };

    const senderHeader = (
        <Sender.Header
            title="Attachments"
            open={open}
            onOpenChange={setOpen}
            styles={{
                content: {
                    padding: 0,
                },
            }}
        >
            <Attachments
                // Mock not real upload file
                beforeUpload={() => false}
                items={items}
                onChange={({ fileList }) => setItems(fileList)}
                placeholder={(type) =>
                    type === 'drop'
                        ? {
                            title: 'Drop file here',
                        }
                        : {
                            icon: <CloudUploadOutlined />,
                            title: 'Upload files',
                            description: 'Click or drag files to this area to upload',
                        }
                }
                getDropContainer={() => senderRef.current?.nativeElement}
            />
        </Sender.Header>
    );

    useEffect(() => {
        return () => {
            abortRef.current();
        };
    }, []);

    // Agent for request
    const [agent] = useXAgent({
        request: async ({ message }, { onSuccess, onUpdate }) => {
            try {
                // 获取当前的会话ID
                const latestSelectedId = selectedConversationId;
                
                // 确保空字符串被视为无效ID
                const currentConversationId = 
                    latestSelectedId && typeof latestSelectedId === 'string' && latestSelectedId.trim() !== '' 
                    ? latestSelectedId 
                    : undefined;
                
                // console.log(`发送请求，会话ID: ${currentConversationId || '新会话'}`);
                
                // 构造请求体 - 只发送必要的信息，不再传递历史消息
                // API端会直接从数据库获取最近5条历史消息
                const requestBody = {
                    content: message,
                    switchFlag: switchFlag,
                    conversationId: currentConversationId,
                    useHistoryContext: useHistoryContext // 添加历史记录开关状态
                };

                // 添加日志记录当前使用的模型
                console.log(`当前推理模式: switchFlag=${switchFlag}, 使用模型: ${switchFlag ? 'DeepSeek-R1' : 'DeepSeek-V3'}`);
                
                const response = await fetch("/api/chat", {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();                
                
                if (responseData.receivedContent && responseData.receivedContent.choices &&
                    responseData.receivedContent.choices[0] &&
                    responseData.receivedContent.choices[0].message) {

                    const content = responseData.receivedContent.choices[0].message.content;

                    // 处理内容，确保表情符号和换行符能够正确显示
                    const contentChunks = typeof content === 'string'
                        ? content.split('') // 将字符串分割成单个字符，以正确处理表情符号
                        : Array.isArray(content) ? content.map(String) : [String(content)];

                    // 使用流式输出模拟打字效果
                    let currentContent = '';
                    const id = setInterval(() => {
                        if (currentContent.length < contentChunks.length) {
                            currentContent += contentChunks[currentContent.length];
                            onUpdate(currentContent);
                        } else {
                            clearInterval(id);
                            onSuccess(currentContent);
                            setLoading(false);
                            
                            // 确保聊天界面可见
                            setInitalFlag(false);
                            
                            // 保存消息到数据库 - 确保使用最新的会话ID
                            const finalUserMessage = message || '';
                            const finalAiMessage = currentContent || '';
                            
                            // 如果API返回了更新的消息历史，直接使用API返回的历史
                            if (responseData.messageHistory && Array.isArray(responseData.messageHistory)) {
                                // 设置历史消息
                                setHistoryMessages(responseData.messageHistory);
                                
                                console.log(`从API获取更新的消息历史，共 ${responseData.messageHistory.length} 条消息`);
                            }
                            
                            saveMessages(finalUserMessage, finalAiMessage);
                        }
                    }, 50);

                    // 设置取消函数
                    abortRef.current = () => {
                        clearInterval(id);
                        setLoading(false);
                    };
                } else {
                    throw new Error('无效的响应格式');
                }
            } catch (e) {
                console.error('获取响应时出错:', e);
                throw Error(e instanceof Error ? e.message : String(e));
            }
        },
    });

    // Chat messages
    const { onRequest, messages: newMessages, setMessages } = useXChat({
        agent,
    });

    // 当选中的会话ID变化时，清除聊天消息
    useEffect(() => {
        // 清除聊天组件中的消息
        setMessages([]);
    }, [selectedConversationId, setMessages]);

    // 合并历史消息和新消息
    useEffect(() => {
        // 当新消息数组变化时触发
        if (newMessages.length > 0) {
            // 把新消息格式化为Bubble.List所需格式
            const formattedNewMessages = newMessages.map(({ id, message, status }) => ({
                key: id,
                role: status === 'local' ? 'user' as const : 'assistant' as const,
                content: message,
            }));
            
            // 合并历史消息和新消息
            // 仅当有历史消息且这是一个有效的选中会话时，才显示历史消息
            if (selectedConversationId && selectedConversationId.trim() !== '' && historyMessages.length > 0) {
                // 保留历史消息，添加新消息
                const historyBubbles = historyMessages.map((msg, index) => ({
                    key: `history-${index}`,
                    role: msg.role as 'user' | 'assistant',
                    content: msg.content
                }));
                
                // 直接使用历史消息和新消息创建组合，避免依赖当前的 allBubbleMessages
                setAllBubbleMessages([...historyBubbles, ...formattedNewMessages]);
            } else {
                // 只显示新消息
                setAllBubbleMessages(formattedNewMessages);
            }
        }
    }, [newMessages, historyMessages, selectedConversationId]);
    
    // 当只有历史消息变化时，更新显示
    useEffect(() => {
        // 如果没有新消息，但有历史消息和有效的会话ID
        if (newMessages.length === 0 && historyMessages.length > 0 && selectedConversationId && selectedConversationId.trim() !== '') {
            // 只显示历史消息
            const bubbleMessages = historyMessages.map((msg, index) => ({
                key: `history-${index}`,
                role: msg.role as 'user' | 'assistant',
                content: msg.content
            }));
            setAllBubbleMessages(bubbleMessages);
        }
    }, [historyMessages, selectedConversationId, newMessages.length]);

    // 辅助函数：标准化角色名称
    function standardizeRole(role: string): "user" | "assistant" {
        role = role.toLowerCase();
        if (role === 'user' || role === 'local') return 'user';
        return 'assistant';
    }

    // 处理从推荐卡片点击的提示内容
    const handlePromptClick = (promptText: string) => {
        // 创建新会话
        setSelectedConversationId("");
        setInitalFlag(false);
        setAllBubbleMessages([]);
        
        // 提交消息到AI
        if (promptText) {
            // 使用setTimeout确保状态已更新
            setTimeout(() => {
                onRequest(promptText);
                setLoading(true);
            }, 100);
        }
    };

    return (
        <Flex vertical gap="middle" className="w-full h-full">
            {
                initalFlag ?
                    <div className='flex justify-center h-140 pt-20 flex-wrap'>
                        <InitalPage onPromptClick={handlePromptClick} />
                    </div>
                    :
                    <>
                        <div className="flex-grow overflow-hidden w-full">
                            <MessageList
                                messages={allBubbleMessages}
                                className="h-full w-full"
                            />
                        </div>
                    </>
            }
            <div className="w-9/12" style={{ margin: '0 auto' }}>
                <Sender
                    ref={senderRef}
                    header={senderHeader}
                    actions={false}
                    placeholder="按Enter发送消息"
                    loading={agent.isRequesting()}
                    value={content}
                    onChange={setContent}
                    onSubmit={(nextContent) => {
                        onRequest(nextContent);
                        setInitalFlag(false);
                        setContent('');
                        setLoading(true);
                        setItems([]);
                    }}
                    footer={({ components }) => {
                        const { SendButton, LoadingButton, SpeechButton } = components;
                        return (
                            <Flex justify="space-between" align="center">
                                <Flex gap="small" align="center">
                                    <Button style={iconStyle} type="text" icon={<LinkOutlined />}
                                        onClick={() => setOpen(!open)}
                                    />
                                    <Divider type="vertical" />
                                    {switchFlag ? '推理模式(R1)' : '推理模式(V3)'}
                                    <Switch 
                                        size="small" 
                                        checked={switchFlag} 
                                        onChange={(checked) => {
                                            console.log("切换推理模式:", checked ? "R1" : "V3");
                                            setSwitchFlag(checked);
                                        }} 
                                    />
                                </Flex>
                                <Flex align="center">
                                    <SpeechButton style={iconStyle} />
                                    <Divider type="vertical" />
                                    {loading ? (
                                        <LoadingButton type="default" />
                                    ) : (
                                        <SendButton type="primary" disabled={false} />
                                    )}
                                </Flex>
                            </Flex>
                        );
                    }}
                    onCancel={() => {
                        abortRef.current();
                    }}
                />
            </div>
        </Flex>
    );
};
