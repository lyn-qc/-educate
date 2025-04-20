'use client';
import React, { useRef, useEffect } from 'react';
import CustomBubble from './CustomBubble';

interface MessageItem {
  key: string | number;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageListProps {
  messages: MessageItem[];
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 当消息列表变化时，滚动到底部
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // 初始加载时和窗口大小变化时滚动到底部
  useEffect(() => {
    scrollToBottom();
    
    const handleResize = () => {
      scrollToBottom();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 添加调试信息
  if (!messages || messages.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center h-full ${className}`}>
        <p className="text-gray-500">暂无消息</p>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col space-y-6 overflow-auto py-6 ${className} mx-auto w-full h-full`}
      style={{ padding: '0 150px' }}
    >
      <div className="flex-grow">
        {messages.map((message, index) => (
          <div key={message.key || index} className="mb-6">
            <CustomBubble 
              role={message.role} 
              content={message.content || '空消息'} 
            />
          </div>
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 