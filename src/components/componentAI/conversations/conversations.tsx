'use client'
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import type { ConversationsProps } from '@ant-design/x';
import { type GetProp, Spin, Empty } from 'antd';
import React, { useEffect, useState } from 'react';

// 定义会话数据的接口
export interface ConversationData {
    _id: string;
    messages: {
        role: string;
        content: string;
        createdAt?: Date;
    }[];
    userAgent?: string;
    createdAt?: Date;
}

// 定义组件接收的props类型
interface ConversationComponentProps {
    // 可以从父组件传入会话数据，或让组件自己获取
    conversationData?: ConversationData[];
    onDeleteConversation?: (id: string) => void;
    onSelectConversation?: (id: string) => void;
    loading?: boolean;
}

export default function Conversation({
    conversationData,
    onDeleteConversation,
    onSelectConversation,
    loading: externalLoading
}: ConversationComponentProps) {
    // 使用useState创建会话列表状态
    const [conversationItems, setConversationItems] = useState<GetProp<ConversationsProps, 'items'>>([]);
    const [loading, setLoading] = useState<boolean>(externalLoading !== undefined ? externalLoading : true);

    // 处理会话激活（选中）事件
    const handleActiveChange = (activeKey: string) => {
        console.log("会话被选中，ID:", activeKey);
        if (onSelectConversation) {
            onSelectConversation(activeKey);
        }
    };

    const menuConfig: ConversationsProps['menu'] = (conversation: { key: unknown; }) => ({
        items: [
            {
                label: '编辑',
                key: 'edit',
                icon: <EditOutlined />,
            },
            {
                label: '停用',
                key: 'stop',
                icon: <StopOutlined />,
                disabled: true,
            },
            {
                label: '删除',
                key: 'delete',
                icon: <DeleteOutlined />,
                danger: true,
            },
        ],
        onClick: (menuInfo) => {
            menuInfo.domEvent.stopPropagation();
            // 根据menuInfo.key处理不同的操作
            if (menuInfo.key === 'delete') {
                if (onDeleteConversation) {
                    onDeleteConversation(conversation.key as string);
                } else {
                    handleDeleteConversation(conversation.key as string);
                }
            } else {
                alert(`操作 ${conversation.key} - ${menuInfo.key}`);
            }
        },
    });

    // 处理删除会话的函数
    const handleDeleteConversation = async (conversationId: string) => {
        try {
            // 实现删除会话的逻辑
            const response = await fetch(`/api/deleteConversation?id=${conversationId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.code === 200) {
                // 删除成功后重新获取会话列表
                getSidebar();
            }
        } catch (error) {
            console.error('删除会话失败:', error);
        }
    };

    // 获取侧边栏数据
    const getSidebar = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/addSidebar");
            const data = await response.json();

            if (data.code === 200 && Array.isArray(data.data)) {
                formatAndSetConversations(data.data);
            } else {
                console.error('获取会话数据失败:', data.message || '未知错误');
                setConversationItems([]);
            }
        } catch (error) {
            console.error('获取会话列表失败:', error);
            setConversationItems([]);
        } finally {
            setLoading(false);
        }
    };

    // 格式化会话数据函数
    const formatAndSetConversations = (conversations: ConversationData[]) => {
        // 格式化数据以符合Conversations组件的要求
        const formattedItems = conversations.map((conversation: ConversationData) => {
            // 使用userAgent作为标题，如果没有则使用消息内容或默认标题
            let label = '新会话';

            if (conversation.userAgent) {
                // 使用userAgent作为标题
                label = conversation.userAgent;
            } else if (conversation.messages && conversation.messages.length > 0) {
                // 使用第一条消息内容作为备选标题
                label = conversation.messages[0].content;
            }

            // 截取适当长度作为标题
            if (label.length > 20) {
                label = `${label.substring(0, 20)}...`;
            }

            // 格式化日期
            let formattedDate = '';
            if (conversation.createdAt) {
                const date = new Date(conversation.createdAt);
                formattedDate = date.toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }

            return {
                key: conversation._id,
                label: label,
                description: formattedDate || undefined,
            };
        });

        setConversationItems(formattedItems);
    };

    // 当外部传入会话数据时，使用外部数据
    useEffect(() => {
        if (conversationData) {
            formatAndSetConversations(conversationData);
        } else {
            // 如果没有传入数据，则自行获取数据
            getSidebar();
        }
    }, [conversationData]);

    // 监听外部loading状态变化
    useEffect(() => {
        if (externalLoading !== undefined) {
            setLoading(externalLoading);
        }
    }, [externalLoading]);

    // 如果正在加载，显示加载指示器
    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-9)]">
                <Spin tip="加载会话列表..." />
            </div>
        );
    }

    // 如果没有数据，显示空状态
    const isEmpty = conversationItems.length === 0;

    return (
        <div className="w-full h-full bg-[var(--color-9)]">
            {isEmpty ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Empty description="暂无会话记录" />
                </div>
            ) : (
                <Conversations
                    className='w-full h-full'
                    menu={menuConfig}
                    items={conversationItems}
                    onActiveChange={handleActiveChange}
                />
            )}
        </div>
    );
}
