// import mongoose from "mongoose";
import mongoose, { Model, Schema } from "mongoose";
import { sidebarModel } from "./AI"
// import mongoose from 'mongoose';

declare global {
    var mongoose: {
        conn: typeof mongoose | null;
        promise: any;
    };
}

if (!global.mongoose) {
    global.mongoose = {
        conn: null,
        promise: null
    };
}

async function connectDB() {
    if (global.mongoose.conn) {
        return global.mongoose.conn;
    }

    if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://tea:123456ljy@cluster0.kayno.mongodb.net/educate");
    }

    try {
        global.mongoose.conn = await global.mongoose.promise;
        console.log('数据库连接成功');
        return global.mongoose.conn;
    } catch (error) {
        console.error('数据库连接失败:', error);
        throw error;
    }
}

// let cachedConnection: typeof mongoose | null = null;

// async function connectDB() {
//     if (cachedConnection) {
//         return cachedConnection;
//     }
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URL || 'mongodb+srv://tea:123456ljy@cluster0.kayno.mongodb.net/educate');
//         console.log('ok');
//         cachedConnection = conn;
//         return conn;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }
connectDB();
const deepseekSchema = new mongoose.Schema({
    messages: [
        {
            role: String, // 'user' 或 'assistant'
            content: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    sessionId: String,     // 可选：会话ID
    ipAddress: String,     // 请求IP
    userAgent: String,     // 用户浏览器信息
    createdAt: { type: Date, default: Date.now },
})

let deepseekmodel;
try {
    deepseekmodel = mongoose.models.deepseek || mongoose.model('deepseek', deepseekSchema);
} catch (error) {
    console.error('Error registering deepseek model:', error);
    throw error;
}

const UserSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    phone:String,
    job:String,
    sex:String,
    password:String,
    imgs:String
})

// let UsersModel;

// try{
//     UsersModel = mongoose.models.users || mongoose.model('users', UsersSchema);
// }catch(error){
//     console.log('Error registering users model:',error)
// }

const MessageSchema = new mongoose.Schema({
    local:String,
    city:String,
    address:String,
    code:String,
    nation:String,
    time:String,
    about:String,
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

// let MessageModel;

// try{
//     MessageModel = mongoose.models.messages || mongoose.model('message', MessageSchema,'message')
// }catch(error){
//     console.log('Error registering message model:',error)
// }

// 定义接口
interface IUser {
    imgs:string,
    name: string;
    username: string;
    email: string;
    phone: string;
    job: string;
    sex: string;
    password: string;
}

interface IMessage {
    local: string;
    city: string;
    address: string;
    code: string;
    nation: string;
    time: string;
    about: string;
    uid: mongoose.Types.ObjectId;
}

// 声明模型变量
let UserModel: Model<IUser>;
let MessageModel: Model<IMessage>;

// 初始化模型
// try {
//     UsersModel = mongoose.models.users || mongoose.model<IUser>('users', UsersSchema);
// } catch(error) {
//     console.log('Error registering users model:', error);
// }

try{
    UserModel = mongoose.models.user || mongoose.model<IUser>('user', UserSchema,'user');
}catch(error){
    console.log('Error registering users model:',error);
}

try {
    MessageModel = mongoose.models.message || mongoose.model<IMessage>('message', MessageSchema, 'message');
} catch(error) {
    console.log('Error registering message model:', error);
}

export {

    deepseekmodel,
    // 杨志豪
    sidebarModel,
    //cry
    UserModel,
    MessageModel
}
