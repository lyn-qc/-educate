import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error -- sidebarModel is imported from a module without types
import { sidebarModel } from "@/db/index";
import mongoose from "mongoose";

// 定义SidebarModel接口，用于修复TypeScript错误
interface Message {
    role: string;
    content: string;
    createdAt: Date;
}

interface SidebarDocument extends mongoose.Document {
    _id: string;
    messages: Message[];
    userAgent?: string;
    createdAt: Date;
}

// 为sidebarModel添加类型断言
const typedSidebarModel = sidebarModel as mongoose.Model<SidebarDocument>;

export async function POST(request: NextRequest) {
    try {
        // 获取请求数据
        const { conversationId, userMessage, aiMessage } = await request.json();
        
        // 准备新消息数据
        const newMessages = [
            { role: 'user', content: userMessage, createdAt: new Date() },
            { role: 'assistant', content: aiMessage, createdAt: new Date() }
        ];
        
        let savedConversation: SidebarDocument | null = null;
        
        // 检查是否有有效的会话ID
        const hasValidConversationId = conversationId && typeof conversationId === 'string' && conversationId.trim() !== '';
        // console.log("会话ID验证结果:", {
        //     hasValidId: hasValidConversationId,
        //     idValue: hasValidConversationId ? conversationId : '(无效)',
        //     isEmpty: conversationId === "",
        //     isUndefined: conversationId === undefined
        // });
        
        try {
            // 追加消息到现有会话
            if (hasValidConversationId) {
                // console.log("尝试将消息添加到现有会话:", conversationId);
                savedConversation = await typedSidebarModel.findByIdAndUpdate(
                    conversationId,  // 使用传入的ID
                    { 
                        $push: { 
                            messages: { 
                                $each: newMessages 
                            } 
                        } 
                    },
                    { new: true }
                );
                
                if (!savedConversation) {
                    // 如果会话不存在，改为创建新会话
                    // console.log("指定的会话 ID 不存在，创建新会话");
                    savedConversation = await typedSidebarModel.create({
                        messages: newMessages,
                        userAgent: aiMessage.length > 30 ? aiMessage.substring(0, 30) + '...' : aiMessage,
                        createdAt: new Date()
                    });
                    console.log("已创建新会话:", savedConversation._id);
                } else {
                    console.log("成功将消息添加到现有会话:", conversationId);
                }
            } else {
                // console.log("创建新会话 - 未提供有效的会话ID");
                // 创建新会话
                savedConversation = await typedSidebarModel.create({
                    messages: newMessages,
                    userAgent: aiMessage.length > 30 ? aiMessage.substring(0, 30) + '...' : aiMessage,
                    createdAt: new Date()
                });
                console.log("成功创建新会话:", savedConversation._id);
            }
        } catch (error) {
            console.error("操作数据库失败，错误详情:", error);
            // 如果更新失败（例如无效的ID格式），创建新会话
            savedConversation = await typedSidebarModel.create({
                messages: newMessages,
                userAgent: aiMessage.length > 30 ? aiMessage.substring(0, 30) + '...' : aiMessage,
                createdAt: new Date()
            });
            console.log("由于错误创建了新会话:", savedConversation._id);
        }
        
        return NextResponse.json({ 
            code: 200,
            success: true, 
            data: savedConversation,
            conversationId: savedConversation._id
        });
    } catch (error) {
        console.error("处理请求时出错:", error);
        return NextResponse.json({ 
            code: 500, 
            success: false, 
            message: "服务器内部错误" 
        }, { status: 500 });
    }
}