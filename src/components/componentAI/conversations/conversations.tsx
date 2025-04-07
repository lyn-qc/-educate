'use client'
import { DeleteOutlined, EditOutlined, StopOutlined } from '@ant-design/icons';
import { Conversations } from '@ant-design/x';
import type { ConversationsProps } from '@ant-design/x';
import { App, type GetProp } from 'antd';
import React from 'react';

const items: GetProp<ConversationsProps, 'items'> = Array.from({ length: 4 }).map((_, index) => ({
    key: `item${index + 1}`,
    label: `Conversation Item ${index + 1}`,
    // disabled: index === 3,
}));

export default function conversations() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { message } = App.useApp();

    const menuConfig: ConversationsProps['menu'] = (conversation: { key: unknown; }) => ({
        items: [
            {
                label: 'Operation 1',
                key: 'operation1',
                icon: <EditOutlined />,
            },
            {
                label: 'Operation 2',
                key: 'operation2',
                icon: <StopOutlined />,
                disabled: true,
            },
            {
                label: 'Operation 3',
                key: 'operation3',
                icon: <DeleteOutlined />,
                danger: true,
            },
        ],
        onClick: (menuInfo) => {
            menuInfo.domEvent.stopPropagation();
            message.info(`Click ${conversation.key} - ${menuInfo.key}`);
        },
    });

    return (
        <Conversations
            className='w-full h-full bg-[var(--color-9)]'
            defaultActiveKey="item1"
            menu={menuConfig}
            items={items}
        />
    )
}
