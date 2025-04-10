'use client'
import React, { useRef, useEffect, useState } from 'react'
import { UserOutlined, CloudUploadOutlined, LinkOutlined } from '@ant-design/icons';
import { Sender, Bubble, useXAgent, useXChat, Attachments, AttachmentsProps } from '@ant-design/x';
import { Flex, type GetProp, Button, type GetRef, Divider, Switch, theme } from 'antd';
import InitalPage from '../initalPage/initalPage';
import { useSwitchModel, useInitalFlag } from "@/regionAI/jotai/switch"

// 定义会话数据接口
interface Conversation {
    _id: string;
    messages: ApiMessage[];
    userAgent?: string;
    createdAt?: Date;
}

// 定义API响应中的消息接口
interface ApiMessage {
    role: string;
    content: string;
    createdAt?: Date;
}

const roles: GetProp<typeof Bubble.List, 'roles'> = {
    ai: {
        placement: 'start',
        avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
    },
    local: {
        placement: 'end',
        avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
    },
};

// 定义组件接收的属性类型
interface SenderInputProps {
    selectedConversationId?: string | null;
    onConversationCreated?: () => void;
}

export default function Senderinput({ 
    selectedConversationId,
    onConversationCreated
}: SenderInputProps) {
    const { token } = theme.useToken();

    const [content, setContent] = useState('');

    const abortRef = useRef(() => { });
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<GetProp<AttachmentsProps, 'items'>>([]);

    const senderRef = React.useRef<GetRef<typeof Sender>>(null);

    const [switchFlag, setSwitchFlag] = useSwitchModel();
    const [initalFlag, setInitalFlag] = useInitalFlag();
    
    // 历史消息列表 - 从服务器加载
    const [historyMessages, setHistoryMessages] = useState<ApiMessage[]>([]);
    // 所有要显示的消息
    const [allBubbleMessages, setAllBubbleMessages] = useState<GetProp<typeof Bubble.List, 'items'>>([]);

    // 当 selectedConversationId 变化时，加载该会话的消息并修改状态
    useEffect(() => {
        if (selectedConversationId) {
            // 设置显示聊天界面
            setInitalFlag(false);
            // 加载选定的会话
            loadConversation(selectedConversationId);
        } else {
            // 清空历史消息
            setHistoryMessages([]);
            setAllBubbleMessages([]);
        }
    }, [selectedConversationId, setInitalFlag]);

    // 加载会话 - 现在直接使用已有数据而不是发请求
    const loadConversation = async (conversationId: string) => {
        try {
            console.log("正在加载会话ID:", conversationId);
            // 首先尝试获取会话数据
            const response = await fetch(`/api/addSidebar`);
            const result = await response.json();
            
            if (result.code === 200 && Array.isArray(result.data)) {
                // 找到当前选中的会话
                const conversation = result.data.find((conv: Conversation) => conv._id === conversationId);
                
                if (conversation && conversation.messages && Array.isArray(conversation.messages)) {
                    console.log("找到会话，消息数量:", conversation.messages.length);
                    setHistoryMessages(conversation.messages);
                    
                    // 转换消息为Bubble.List格式
                    const bubbleMessages = conversation.messages.map((msg: ApiMessage, index: number) => ({
                        key: `history-${index}`,
                        role: msg.role === 'ai' ? 'ai' : 'local',
                        content: msg.content
                    }));
                    
                    setAllBubbleMessages(bubbleMessages);
                    // 强制显示聊天内容
                    setInitalFlag(false);
                } else {
                    console.error(`未找到ID为${conversationId}的会话或没有消息`);
                    setHistoryMessages([]);
                    setAllBubbleMessages([]);
                }
            } else {
                console.error('获取会话数据失败');
                setHistoryMessages([]);
                setAllBubbleMessages([]);
            }
        } catch (error) {
            console.error('加载会话失败:', error);
            setHistoryMessages([]);
            setAllBubbleMessages([]);
        }
    };

    // 监听 initalFlag 变化的日志
    useEffect(() => {
        console.log("initalFlag 变化为:", initalFlag);
    }, [initalFlag]);

    const iconStyle = {
        fontSize: 18,
        color: token.colorText,
    };

    const senderHeader = (
        <Sender.Header
            title="Attachments"
            open={open}
            onOpenChange={setOpen}
            styles={{
                content: {
                    padding: 0,
                },
            }}
        >
            <Attachments
                // Mock not real upload file
                beforeUpload={() => false}
                items={items}
                onChange={({ fileList }) => setItems(fileList)}
                placeholder={(type) =>
                    type === 'drop'
                        ? {
                            title: 'Drop file here',
                        }
                        : {
                            icon: <CloudUploadOutlined />,
                            title: 'Upload files',
                            description: 'Click or drag files to this area to upload',
                        }
                }
                getDropContainer={() => senderRef.current?.nativeElement}
            />
        </Sender.Header>
    );

    useEffect(() => {
        return () => {
            abortRef.current();
        };
    }, []);

    // Agent for request
    const [agent] = useXAgent({
        request: async ({ message }, { onSuccess, onUpdate }) => {
            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    body: JSON.stringify({
                        content: message,
                        switchFlag: switchFlag,
                        conversationId: selectedConversationId
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const responseData = await response.json();

                if (responseData.receivedContent && responseData.receivedContent.choices &&
                    responseData.receivedContent.choices[0] &&
                    responseData.receivedContent.choices[0].message) {

                    const content = responseData.receivedContent.choices[0].message.content;

                    // 处理内容，确保表情符号和换行符能够正确显示
                    const contentChunks = typeof content === 'string'
                        ? content.split('') // 将字符串分割成单个字符，以正确处理表情符号
                        : Array.isArray(content) ? content.map(String) : [String(content)];

                    // 使用流式输出模拟打字效果
                    let currentContent = '';
                    const id = setInterval(() => {
                        if (currentContent.length < contentChunks.length) {
                            currentContent += contentChunks[currentContent.length];
                            onUpdate(currentContent);
                        } else {
                            clearInterval(id);
                            onSuccess(currentContent);
                            setLoading(false);
                            
                            // 确保聊天界面可见
                            setInitalFlag(false);
                            
                            // 如果新会话被创建，通知父组件更新会话列表
                            if (responseData.newConversationId && onConversationCreated) {
                                onConversationCreated();
                            }
                        }
                    }, 50);

                    // 设置取消函数
                    abortRef.current = () => {
                        clearInterval(id);
                        setLoading(false);
                    };
                } else {
                    throw new Error('无效的响应格式');
                }
            } catch (e) {
                console.error('获取响应时出错:', e);
                throw Error(e instanceof Error ? e.message : String(e));
            }
        },
    });

    // Chat messages
    const { onRequest, messages: newMessages } = useXChat({
        agent,
    });

    // 合并历史消息和新消息
    useEffect(() => {
        if (newMessages.length > 0) {
            // 把新消息格式化为Bubble.List所需格式
            const formattedNewMessages = newMessages.map(({ id, message, status }) => ({
                key: id,
                role: status === 'local' ? 'local' : 'ai',
                content: message,
            }));
            
            // 合并历史消息和新消息
            // 仅当有历史消息且这是一个新的会话（非首次）时，才显示历史消息
            if (selectedConversationId && historyMessages.length > 0) {
                // 保留历史消息，添加新消息
                const combinedMessages = [
                    ...allBubbleMessages.filter(msg => typeof msg.key === 'string' && msg.key.startsWith('history-')),
                    ...formattedNewMessages
                ];
                setAllBubbleMessages(combinedMessages);
            } else {
                // 只显示新消息
                setAllBubbleMessages(formattedNewMessages);
            }
        } else if (historyMessages.length > 0 && selectedConversationId) {
            // 只有历史消息，没有新消息
            const bubbleMessages = historyMessages.map((msg, index) => ({
                key: `history-${index}`,
                role: msg.role === 'ai' ? 'ai' : 'local', 
                content: msg.content
            }));
            setAllBubbleMessages(bubbleMessages);
        }
    }, [newMessages, historyMessages, selectedConversationId]);

    return (
        <Flex vertical gap="middle" className="w-full h-full">
            {
                initalFlag ?
                    <div className='flex justify-center h-140 pt-20 flex-wrap'>
                        <InitalPage />
                    </div>
                    :
                    <Bubble.List
                        roles={roles}
                        className="h-140 px-40"
                        items={allBubbleMessages}
                    />
            }
            <Sender
                ref={senderRef}
                header={senderHeader}
                actions={false}
                className="max-w-9/12 mx-auto"
                placeholder="Press Enter to send message"
                loading={agent.isRequesting()}
                value={content}
                onChange={setContent}
                onSubmit={(nextContent) => {
                    onRequest(nextContent);
                    setInitalFlag(false);
                    setContent('');
                    setLoading(true);
                    setItems([]);
                }}
                footer={({ components }) => {
                    const { SendButton, LoadingButton, SpeechButton } = components;
                    return (
                        <Flex justify="space-between" align="center">
                            <Flex gap="small" align="center">
                                <Button style={iconStyle} type="text" icon={<LinkOutlined />}
                                    onClick={() => setOpen(!open)}
                                />
                                <Divider type="vertical" />
                                推理模式
                                <Switch size="small" checked={switchFlag} onChange={(e) => {
                                    setSwitchFlag(e)
                                }} />
                            </Flex>
                            <Flex align="center">
                                <SpeechButton style={iconStyle} />
                                <Divider type="vertical" />
                                {loading ? (
                                    <LoadingButton type="default" />
                                ) : (
                                    <SendButton type="primary" disabled={false} />
                                )}
                            </Flex>
                        </Flex>
                    );
                }}
                onCancel={() => {
                    abortRef.current();
                }}
            />
        </Flex>
    );
};
