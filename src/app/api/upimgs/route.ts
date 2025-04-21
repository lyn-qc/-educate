// app/api/upload/route.ts'
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from 'fs/promises'
import path from 'path'
import { message } from "antd";
import { UserModel, MessageModel } from "@/db/index";

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('avatar') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.replaceAll(' ', '_')

  try {
    await writeFile(
      path.join(process.cwd(), 'public/uploads/' + filename),
      buffer
    )
    return NextResponse.json({
      url: `/uploads/${filename}`
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    // console.log(body.imgs, 2142363245);
    await UserModel.find({ _id: body._id })
    let a = await UserModel.updateOne({ _id: body._id }, { imgs: body.imgs })


    return NextResponse.json({ code: 200 })
  } catch (error) {
    console.error('PUT请求处理失败', error)
    return NextResponse.json(
      { code: 500, message: '服务器内部错误' },
      { status: 500 }
    )
  }
}