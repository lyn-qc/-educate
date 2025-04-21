'use client'
import React, { useEffect, useState } from 'react'
import styles from './Mess_top.module.css'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import styless from './Mess_bottom...module.css'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
    console.log('beforeUpload', file);

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function Mess({ Bool, Update,Updates, Data,UpdateImgs }: { Bool: any, Update: any,Updates:any, Data: any,UpdateImgs:any }) {

    interface User {
        _id: string;
        imgs:string;
        name: string;
        username: string;
        email: string;
        phone: string;
        job: string;
        password: string;
        sex: string;
    }

    interface Message {
        _id: string;
        local: string;
        city: string;
        address: string;
        code: string;
        nation: string;
        time: string;
        about: string;
    }

    const [users, setusers] = useState<User>({
        _id: '',
        imgs:'',
        name: '',
        username: '',
        email: '',
        phone: '',
        job: '',
        sex: '',
        password: '',
    })

    const [message, setmessage] = useState<Message>({
        _id: '',
        local: '',
        city: '',
        address: '',
        code: '',
        nation: '',
        time: '',
        about: ''
    })

    useEffect(() => {
        setmessage((pre) => ({
            _id: Data[0]._id,
            local: Data[0].local,
            city: Data[0].city,
            address: Data[0].address,
            code: Data[0].code,
            nation: Data[0].nation,
            time: Data[0].time,
            about: Data[0].about
        }))
        setusers((pre) => ({
            _id: Data[0].uid._id,
            imgs:Data[0].uid.imgs,
            name: Data[0].uid.name,
            username: Data[0].uid.username,
            email: Data[0].uid.email,
            phone: Data[0].uid.phone,
            job: Data[0].uid.job,
            password: Data[0].uid.password,
            sex: Data[0].uid.sex
        }))
        // console.log(Data, 'messdata')
    }, [Data])


const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info) => {
        
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
                console.log('服务器返回的图片URL:', info.file.response.url);
                UpdateImgs(users._id,info.file.response.url)
            });
        }
    };

    const uploadButton = (
        <Button 
            style={{ backgroundColor: '#fdcb9e', color: 'black' }}
        >
            修改头像
        </Button>
    )



    return (
        <div style={{ height: '100%', width: '100%' }} className={styles.bigg} key={users._id}>
            <div className={styles.mess} >
                <div className={styles.mess_top}>
                    <span>基本信息</span>
                    {
                        Bool ? <Button variant="destructive" style={{ backgroundColor: '#fdcb9e', color: 'black' }} onClick={() => { Update() }}>修改信息</Button>
                            : <Button variant="destructive" style={{ backgroundColor: '#fdcb9e', color: 'black' }} onClick={() => { Updates(users,message) }}>保存信息</Button>
                    }
                </div>
                <div className={styles.mess_div}>
                    <div className={styles.mess_left}>
                        <Image src={users.imgs} alt="1" width={100} height={100} style={{ borderRadius: '10px' }} />
                        <Upload
                            name="avatar"
                            showUploadList={false}
                            action="/api/upimgs"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            disabled={loading || !Bool}
                        >
                            {uploadButton}
                        </Upload>
                    </div>
                    <div className={styles.mess_right}>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.name} onChange={(e) => setusers({ ...users, name: e.target.value })} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>昵称</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.username} onChange={(e) => setusers({ ...users, username: e.target.value })} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>Email</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.email} onChange={(e) => setusers({ ...users, email: e.target.value })} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>手机号</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.phone} onChange={(e) => setusers({ ...users, phone: e.target.value })} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>专业知识</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.job} onChange={(e) => { setusers({ ...users, job: e.target.value }) }} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>性别</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.sex} onChange={(e) => { setusers({ ...users, sex: e.target.value }) }} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>密码</span>
                            <Input type="email" placeholder="Email" disabled={Bool} value={users.password} onChange={(e) => setusers({ ...users, password: e.target.value })} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>确认密码</span>
                            <Input type="email" placeholder="Email" disabled={Bool} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styless.mess}>
                <span>其他信息</span>
                <div className={styless.mess_bottom}>
                    <div className={styless.mess_div}>
                        <span>地址</span>
                        <Input type="email" placeholder="Email" value={message.local} disabled={Bool} onChange={(e) => setmessage({ ...message, local: e.target.value })} />
                    </div>
                    <div className={styless.mess_div}>
                        <span>城市</span>
                        <Input type="email" placeholder="Email" value={message.city} disabled={Bool} onChange={(e) => setmessage({ ...message, city: e.target.value })} />
                    </div>
                    <div className={styless.mess_div}>
                        <span>省份</span>
                        <Input type="email" placeholder="Email" value={message.address} disabled={Bool} onChange={(e) => setmessage({ ...message, address: e.target.value })} />
                    </div>
                    <div className={styless.mess_div}>
                        <span>邮政编码</span>
                        <Input type="email" placeholder="Email" value={message.code} disabled={Bool} onChange={(e) => setmessage({ ...message, code: e.target.value })} />
                    </div>
                    <div className={styless.mess_div}>
                        <span>国家</span>
                        <Select onValueChange={(value) => {
                            console.log("选中国家:", value);
                              setmessage({...message, nation: value});
                        }}>
                            <SelectTrigger className="w-[100%]" disabled={Bool}>
                                <SelectValue placeholder={message.nation || "Select a timezone"} defaultValue={message.nation} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="中国">中国</SelectItem>
                                    <SelectItem value="美国">美国</SelectItem>
                                    <SelectItem value="韩国">韩国</SelectItem>
                                    <SelectItem value="英国">英国</SelectItem>
                                    <SelectItem value="泰国">泰国</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={styless.mess_div}>
                        <span>时区</span>
                        <Select onValueChange={(value) => {
                            console.log("选中国家:", value);
                              setmessage({...message, time: value});
                        }}>
                            <SelectTrigger className="w-[100%]" disabled={Bool}>
                                <SelectValue placeholder={message.time || "Select a timezone"} defaultValue={message.time} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="北京">北京</SelectItem>
                                    <SelectItem value="洛杉矶">洛杉矶</SelectItem>
                                    <SelectItem value="旧金山">旧金山</SelectItem>
                                    <SelectItem value="韩国思密达">韩国思密达</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className={styless.mess_main}>
                    <span>关于我</span>
                    <Textarea placeholder="Type your message here." value={message.about} disabled={Bool} />
                </div>
            </div>
        </div>
    )
}
