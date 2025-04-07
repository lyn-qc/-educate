import Conversations from "@/components/componentAI/conversations/conversations";
import Senderinput from "@/components/componentAI/senderInput/senderinput";
import { AlignRightOutlined } from "@ant-design/icons";

export default function Page() {
  return (
    <>
      <div className='w-full h-full flex flex-row'>
        <div className='w-1/5 h-full bg-[var(--color-9)]'>
          <div className="w-full h-18 text-[var(--color-3)] leading-18 px-4 font-bold text-2xl flex flex-row justify-between">
            KotoAI
            <AlignRightOutlined className="text-lg cursor-pointer" />
          </div>
          <div className="w-11/12 h-10 text-[var(--color-8)] leading-10 font-bold text-lg text-center  bg-[var(--color-1)] rounded-md mx-auto cursor-pointer">
            开启新对话
          </div>
          <div className="w-full h-[calc(100%-7rem)]">
            <Conversations />
          </div>
        </div>
        <div className='w-4/5 h-full'>
          <div className="w-full flex justify-center h-full">
            <Senderinput />
          </div>
        </div>
      </div>
    </>
  )
}
