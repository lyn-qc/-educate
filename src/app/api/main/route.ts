import { UserModel,MessageModel } from "@/db/index";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request:NextRequest){
    await UserModel.updateOne(request.json())
    return NextResponse.json({code:200})
}

// export async function POST(request:NextRequest){
//     console.log(111111);
    
    
    
//     // await MessageModel.updateOne(request.json())
//     // return NextResponse.json({code:200})
// }

export async function POST(request: NextRequest) {
            try {
                console.log(111111);
                const body = await request.json();
                console.log(body.users,2121);
                console.log(body.message,2121);
                
                // 确保这里正确使用了MessageModel
                await MessageModel.updateOne(body.message);
                await UserModel.updateOne(body.users);
                
                return NextResponse.json({ code: 200, message: "更新成功" });
            } catch (error) {
                console.error("POST请求处理失败:", error);
                return NextResponse.json(
                    { code: 500, message: "服务器内部错误" },
                    { status: 500 }
                );
            }
        }

export async function GET(request:NextRequest){
    const uid = request.nextUrl.searchParams.get('uid')
    console.log(uid);
    
    const data = await MessageModel.find().populate('uid')
    console.log(data);
    
    return NextResponse.json({code:200,data})
}