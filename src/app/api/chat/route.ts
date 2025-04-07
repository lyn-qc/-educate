import { NextResponse,NextRequest } from "next/server";


export async function GET(request:NextRequest) {
    const content = request.nextUrl.searchParams.get('content');    

      // const options = {
    //     method: 'POST',
    //     headers: {
    //         Authorization: 'Bearer sk-tqfkieqcpqrdxhigohmfhipmkbfmnxewoeuodxvhtcmguolr',
    //         'Content-Type': 'application/json'
    //     },
    //     body: '{"model":"Pro/deepseek-ai/DeepSeek-V3","stream":false,"max_tokens":512,"temperature":0.7,"top_p":0.7,"top_k":50,"frequency_penalty":0.5,"n":1,"messages":[{"content":"锅包肉怎么做？","role":"user"}]}'
    // };


    // fetch('https://api.siliconflow.cn/v1/chat/completions', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    return NextResponse.json({ data: content })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // console.log('Received request body:', body);
    const { content } = body;
    // console.log('Extracted content:', content);
    
    return NextResponse.json({ 
      success: true,
      receivedContent: content,
      message: "Data received successfully" 
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message 
    }, { status: 400 });
  }
}