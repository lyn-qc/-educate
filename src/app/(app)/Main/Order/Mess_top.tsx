import React from 'react'
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

export default function Mess({ Bool, Update }: { Bool: any, Update: any }) {
    return (
        <div style={{height:'100%',width:'100%'}} className={styles.bigg}>
            <div className={styles.mess}>
                <div className={styles.mess_top}>
                    <span>基本信息</span>
                    {
                        Bool ? <Button variant="destructive" style={{ backgroundColor: '#fdcb9e', color: 'black' }} onClick={() => { Update() }}>修改信息</Button>
                            : <Button variant="destructive" style={{ backgroundColor: '#fdcb9e', color: 'black' }} onClick={() => { Update() }}>保存信息</Button>
                    }
                </div>
                <div className={styles.mess_div}>
                    <div className={styles.mess_left}>
                        <Image src={'/2.png'} alt="1" width={100} height={100} style={{ borderRadius: '10px' }} />
                    </div>
                    <div className={styles.mess_right}>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" disabled={Bool} />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                        <div className={styles.mess_right_div}>
                            <span style={{ fontSize: '14px' }}>名字</span>
                            <Input type="email" placeholder="Email" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styless.mess}>
            <span>其他信息</span>
            <div className={styless.mess_bottom}>
                <div className={styless.mess_div}>
                    <span>地址</span>
                    <Input type="email" placeholder="Email" />
                </div>
                <div className={styless.mess_div}>
                    <span>地址</span>
                    <Input type="email" placeholder="Email" />
                </div>
                <div className={styless.mess_div}>
                    <span>地址</span>
                    <Input type="email" placeholder="Email" />
                </div>
                <div className={styless.mess_div}>
                    <span>地址</span>
                    <Input type="email" placeholder="Email" />
                </div>
                <div className={styless.mess_div}>
                    <span>地址</span>
                    <Select>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className={styless.mess_div}>
                    <span>地址</span>
                    <Select>
                        <SelectTrigger className="w-[100%]">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className={styless.mess_main}>
                <span>关于我</span>
                <Textarea placeholder="Type your message here." />
            </div>
        </div>
        </div>

    )
}
