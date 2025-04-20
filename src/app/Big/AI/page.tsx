"use client"
import Conversation, { ConversationData } from "@/components/componentAI/conversations/conversations";
import Senderinput from "@/components/componentAI/senderInput/senderinput";
import { AlignRightOutlined } from "@ant-design/icons";
import { useInitalFlag, useSiderbarData } from "@/regionAI/jotai/switch";
import { useEffect, useState } from "react";


export default function Page() {
  const [, setInitalFlag] = useInitalFlag(); // 只使用setter，不使用state变量
  const [selectedConversationId, setSelectedConversationId] = useSiderbarData();
  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 获取会话列表数据 - 使用真实API
  const fetchConversations = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/addSidebar");
      const data = await response.json();
      
      if (data.code === 200 && Array.isArray(data.data)) {
        // console.log("获取到会话数据:", data.data.length, "条记录");
        setConversations(data.data);
      } else {
        console.error('获取会话数据失败:', data.message || '未知错误');
        setConversations([]);
      }
    } catch (error) {
      console.error('获取会话列表失败:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  // 选择会话
  const handleSelectConversation = (conversationId: string) => {
    
    // 从conversations中找到对应的会话
    const selectedConversation = conversations.find(conv => conv._id === conversationId);
    if (selectedConversation) {
      // 先设置ID，然后设置显示标志
      setSelectedConversationId(conversationId);
      
      // 使用initalFlag控制右侧显示聊天内容而不是欢迎页面
      setInitalFlag(false);
    } else {
      console.error(`未找到ID为${conversationId}的会话`);
    }
  };

  // 删除会话 - 使用alert提示
  const handleDeleteConversation = (conversationId: string) => {
    alert(`准备删除会话ID: ${conversationId}，后端接口尚未准备好`);
    // 如果删除的是当前选中的会话，回到欢迎页面
    if (selectedConversationId === conversationId) {
      setSelectedConversationId(""); // 使用空字符串，sidebarData atom 的初始值是 ""
      setInitalFlag(true);
    }
  };

  // 创建新会话
  const handleCreateNewConversation = () => {
    // alert('准备创建新会话，后端接口尚未准备好');
    setSelectedConversationId(""); // 使用空字符串，sidebarData atom 的初始值是 ""
    setInitalFlag(true); // 显示欢迎页面
  };

  // 首次加载时获取会话列表并初始化状态
  useEffect(() => {
    console.log("Page组件 - 初始化状态，当前会话ID:", selectedConversationId);
    
    // 获取会话列表
    fetchConversations();
    
    // 如果已经有从localStorage读取的会话ID，使用欢迎页标志取决于ID是否存在
    if (selectedConversationId && selectedConversationId.trim() !== '') {
      // 如果有保存的ID，不显示欢迎页
      setInitalFlag(false);
      console.log("Page组件 - 检测到保存的会话ID，不显示欢迎页");
    } else {
      // 否则显示欢迎页
      setInitalFlag(true);
      console.log("Page组件 - 未检测到保存的会话ID，显示欢迎页");
    }
  }, []);

  return (
    <>
      <div className='w-full h-full flex flex-row'>
        <div className='w-1/5 h-full bg-[var(--color-9)] min-w-[240px]'>
          <div
            className="w-full h-18 text-[var(--color-3)] leading-18 font-bold text-2xl flex flex-row justify-between"
            style={{ padding: '0 10px' }}
          >
            KotoAI
            <AlignRightOutlined className="text-lg cursor-pointer" />
          </div>
          <div
            className="w-11/12 h-10 text-[var(--color-8)] leading-10 font-bold text-lg text-center bg-[var(--color-1)] rounded-md cursor-pointer"
            onClick={handleCreateNewConversation}
            style={{ margin: '0 auto' }}
          >
            开启新对话
          </div>
          <div className="w-full h-[calc(100%-7rem)]">
            <Conversation 
              conversationData={conversations}
              loading={loading}
              onDeleteConversation={handleDeleteConversation}
              onSelectConversation={handleSelectConversation}
              activeConversationId={selectedConversationId}
            />
          </div>
        </div>
        <div className='w-4/5 h-full overflow-hidden'>
          <div className="w-full h-full">
            <Senderinput 
              onConversationCreated={fetchConversations} 
            />
          </div>
        </div>
      </div>
    </>
  )
}
