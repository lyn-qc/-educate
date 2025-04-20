import React from 'react'
import {
    CommentOutlined,
    FireOutlined,
    HeartOutlined,
    ReadOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { Welcome, Prompts } from '@ant-design/x';
import type { PromptsProps } from '@ant-design/x';
import { Space, Card, message } from 'antd';

const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
        {icon}
        <span>{title}</span>
    </Space>
);

const items: PromptsProps['items'] = [
    {
        key: '1',
        label: renderTitle(<FireOutlined style={{ color: '#FF4D4F' }} />, '设计热门话题'),
        description: '设计领域热门讨论',
        children: [
            {
                key: '1-1',
                description: `帮我分析2025年UI设计的主要趋势`,
            },
            {
                key: '1-2',
                description: `如何在设计中有效运用AI工具提高效率`,
            },
            {
                key: '1-3',
                description: `如何设计一个既美观又符合用户体验的移动应用界面`,
            },
        ],
    },
    {
        key: '2',
        label: renderTitle(<ReadOutlined style={{ color: '#1890FF' }} />, '设计指南'),
        description: '如何设计一个好产品?',
        children: [
            {
                key: '2-1',
                icon: <HeartOutlined />,
                description: `设计原则`,
            },
            {
                key: '2-2',
                icon: <SmileOutlined />,
                description: `设计趋势`,
            },
            {
                key: '2-3',
                icon: <CommentOutlined />,
                description: "设计工具",
            },
        ],
    }
];

interface InitalPageProps {
    onPromptClick?: (promptText: string) => void;
}

export default function InitalPage({ onPromptClick }: InitalPageProps) {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <>
            {contextHolder}
            <Welcome
                variant="borderless"
                className="w-9/12"
                icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                title="我是 Koto, 很高兴见到你!"
                description="专门为设计师和创意工作者提供专业支持。我可以帮助你完成各种设计相关的任务"
            />
            
            <Card
                style={{ borderRadius: 0, border: 0 }}
                className="w-9/12"
            >
                <Prompts
                    title="你想要的问题?"
                    items={items}
                    wrap
                    styles={{
                        item: {
                            width: 'calc(40% - 6px)',
                            flex: 'none',
                            backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
                            border: 0,
                        },
                        subItem: {
                            background: 'rgba(255,255,255,0.45)',
                            border: '1px solid #FFF',
                        },
                    }}
                    onItemClick={(info) => {
                        const promptText = info.data.description as string;
                        if (onPromptClick && promptText) {
                            onPromptClick(promptText);
                        }
                        messageApi.open({
                            type: 'success',
                            content: `已选择: ${promptText}`,
                        });
                    }}
                />
            </Card>
        </>
    )
}
