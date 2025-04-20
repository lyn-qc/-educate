'use client';
import React from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import Image from 'next/image';

interface CustomBubbleProps {
  content: string;
  role: 'user' | 'assistant';
  className?: string;
}

const CustomBubble: React.FC<CustomBubbleProps> = ({ content, role, className = '' }) => {
  return (
    <div className={`w-full  ${role === 'user' ? 'flex justify-end' : 'block'}`}>
      {/* AI消息 - 占满宽度 */}
      {role === 'assistant' && (
        <div className="w-full flex flex-row">
          {/* AI头像 */}
          <div className="flex-shrink-0" style={{ marginRight: '10px' }}>
            {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <span className="text-sm font-semibold">AI</span>
            </div> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src={'/1.png'} width={32} height={32} alt="AI" className="rounded-full" />
          </div>
          
          {/* AI消息内容 - 占满宽度 */}
          <div className="flex-grow px-4 py-3 text-gray-800">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      )}
      
      {/* 用户消息 */}
      {role === 'user' && (
        <div className={`
          bg-[var(--color-6)] text-white rounded-lg px-4 py-3 max-w-[85%] shadow-sm ${className}`}
          style={{ margin: '15px 0',padding: '5px' }}
        >
          <div className="whitespace-pre-wrap break-words">{content}</div>
        </div>
      )}
    </div>
  );
};

export default CustomBubble; 