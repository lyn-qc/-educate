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
import { Button, Space, App, Card } from 'antd';

const renderTitle = (icon: React.ReactElement, title: string) => (
    <Space align="start">
        {icon}
        <span>{title}</span>
    </Space>
);

const items: PromptsProps['items'] = [
    {
        key: '1',
        label: renderTitle(<FireOutlined style={{ color: '#FF4D4F' }} />, '热门话题'),
        description: '热门话题是否感兴趣?',
        children: [
            {
                key: '1-1',
                description: `What's new in X?`,
            },
            {
                key: '1-2',
                description: `What's AGI?`,
            },
            {
                key: '1-3',
                description: `Where is the doc?`,
            },
        ],
    },
    {
        key: '2',
        label: renderTitle(<ReadOutlined style={{ color: '#1890FF' }} />, 'Design Guide'),
        description: 'How to design a good product?',
        children: [
            {
                key: '2-1',
                icon: <HeartOutlined />,
                description: `Know the well`,
            },
            {
                key: '2-2',
                icon: <SmileOutlined />,
                description: `Set the AI role`,
            },
            {
                key: '2-3',
                icon: <CommentOutlined />,
                description: `Express the feeling`,
            },
        ],
    }
];

export default function InitalPage() {
    // const { message } = App.useApp();

    return (
        <>
            <Welcome
                variant="borderless"
                className="w-9/12"
                icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
                title="我是 Koto, 很高兴见到你!"
                description="我可以帮你理解作品、查看资料、写作各种创意内容，请把你的任务交给我吧~"
            />
            
            <Card
                style={{ borderRadius: 0, border: 0 }}
                className="w-8/12"
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
                        alert(`You clicked a prompt: ${info.data.key}`);
                    }}
                />
            </Card>
        </>
    )
}
