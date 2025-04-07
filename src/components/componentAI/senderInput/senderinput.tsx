'use client'
import React, { useRef, useEffect, useState } from 'react'
import { UserOutlined, CloudUploadOutlined, LinkOutlined } from '@ant-design/icons';
import { Sender, Bubble, XStream, useXAgent, useXChat, Attachments, AttachmentsProps } from '@ant-design/x';
import { Flex, type GetProp, Button, type GetRef, Divider, Switch, theme } from 'antd';
// import InitalPage from '../initalPage/initalPage';


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

const contentChunks = [
    'He',
    'llo',
    ', w',
    'or',
    'ld!',
    ' Ant',
    ' Design',
    ' X',
    ' is',
    ' the',
    ' best',
    '!',
];

function mockReadableStream() {
    const sseChunks: string[] = [];

    for (let i = 0; i < contentChunks.length; i++) {
        const sseEventPart = `event: message\ndata: {"id":"${i}","content":"${contentChunks[i]}"}\n\n`;
        sseChunks.push(sseEventPart);
    }

    return new ReadableStream({
        async start(controller) {
            for (const chunk of sseChunks) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                controller.enqueue(new TextEncoder().encode(chunk));
            }
            controller.close();
        },
    });
}

export default function Senderinput() {
    const { token } = theme.useToken();

    const [content, setContent] = useState('');

    const abortRef = useRef(() => { });
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<GetProp<AttachmentsProps, 'items'>>([]);


    const senderRef = React.useRef<GetRef<typeof Sender>>(null);

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
        request: async (_, { onSuccess, onUpdate }) => {
            const stream = XStream({
                readableStream: mockReadableStream(),
            });
            
            const reader = stream.getReader();
            abortRef.current = () => {
                reader?.cancel();
            };

            fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({
                    content: _.message
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async(data) => {
                const responseData = await data.json();
                console.log('Response from server:', responseData);
            }).catch((e) => {
                throw Error(e)
            })
            

            let current = '';
            while (reader) {
                const { value, done } = await reader.read();
                if (done) {
                    onSuccess(current);
                    setLoading(false);
                    break;
                }
                if (!value) continue;
                const data = JSON.parse(value.data);
                current += data.content || '';
                onUpdate(current);
            }
        },
    });

    // Chat messages
    const { onRequest, messages } = useXChat({
        agent,
    });

    return (
        <Flex vertical gap="middle" className="w-full h-full">
            <Bubble.List
                roles={roles}
                className="h-140 px-40"
                items={messages.map(({ id, message, status }) => ({
                    key: id,
                    role: status === 'local' ? 'local' : 'ai',
                    content: message,
                }))}
            />
            {/* <div className='flex justify-center h-140 pt-20 flex-wrap'>
                <InitalPage />
            </div> */}
            <Sender
                ref={senderRef}
                header={senderHeader}
                actions={false}
                className="max-w-9/12 mx-auto"
                placeholder="Press Enter to send message"
                // prefix={
                //     <Badge dot={items.length > 0 && !open}>
                //         <Button onClick={() => setOpen(!open)} icon={<LinkOutlined />} />
                //     </Badge>
                // }
                loading={agent.isRequesting()}
                value={content}
                onChange={setContent}
                onSubmit={(nextContent) => {
                    onRequest(nextContent);
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
                                <Switch size="small" />
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
