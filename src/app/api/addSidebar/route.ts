import { sidebarModel } from "@/db/index"
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { messages, userAgent, createAt } = await request.json();

    await sidebarModel.create({
        messages,
        userAgent,
        createAt
    })
    return NextResponse.json({
        code: 200,
        message: true
    })
}

export async function GET() {
    const data = await sidebarModel.find()

    return NextResponse.json({ code: 200, success: true, data: data })
}
