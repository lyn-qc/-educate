import mongoose from "mongoose";

// 侧边栏表
const sidebarSchema = new mongoose.Schema({
    messages: [
        {
            role: String, // 'user' 或 'assistant'
            content: String,
            createdAt: { type: Date, default: Date.now } // 当前消息时间
        }
    ],
    // sessionId: String,     // 可选：会话ID
    // ipAddress: String,     // 请求IP
    userAgent: String,     // 用户信息
    createdAt: { type: Date, default: Date.now }, // 当前会话时间
})

let sidebarModel;
try {
    sidebarModel = mongoose.models.deepseek || mongoose.model('deepseek', sidebarSchema);
} catch (error) {
    console.error('Error registering deepseek model:', error);
    throw error;
}

export {
    sidebarModel
}