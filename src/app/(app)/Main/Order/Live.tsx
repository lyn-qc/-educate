'use client'
import React, { useState } from 'react'
import styles from './Live.module.css'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Live() {

    const [progress, setProgress] = useState<number>(13)

    return (
        <div className={styles.live}>
            <div className={styles.live_top}>
                <div className={styles.live_top_div}>
                    <span>你的活跃度</span>
                    <Progress value={progress} className="w-[60%] [&>div]:bg-green-200" style={{ backgroundColor: 'white', width: '100%', height: '15px' }} />
                </div>
                <div className={styles.live_top_bai}>
                    <div className={styles.bai_left}>
                        <span style={{fontSize:'18px',color:`var(--color-4)`}}>70.5%</span>
                        <span style={{fontSize:'14px'}}>升级为高级账户</span>
                    </div>
                    <Button variant="destructive" style={{ backgroundColor: '#fdcb9e', color: 'black' }}>获取专业版</Button>       
                </div>
            </div>
            <div className={styles.live_cen}>

            </div>
            <div className={styles.live_bottom}>
                <span>设置</span>
                <div className={styles.live_bottom_div}>
                    <div className={styles.live_bottom_div_left}>
                        <MarkEmailUnreadIcon style={{color:'#99c183'}} />
                    </div>
                    <div className={styles.live_bottom_div_right}>
                        <div className={styles.left}>
                            <span style={{fontSize:'14px'}}>我的消息</span>
                            <span style={{fontSize:'12px',color:'#9d9d9f'}}>支付方式</span>
                        </div>
                        <ArrowForwardIosIcon  style={{fontSize:'16px',color:'#9d9d9f'}}/>
                    </div>
                </div>
                <div className={styles.live_bottom_div}>
                    <div className={styles.live_bottom_div_left}>
                        <AccountBalanceWalletIcon style={{color:'#99c183'}} />
                    </div>
                    <div className={styles.live_bottom_div_right}>
                        <div className={styles.left}>
                            <span style={{fontSize:'14px'}}>我的消息</span>
                            <span style={{fontSize:'12px',color:'#9d9d9f'}}>支付方式</span>
                        </div>
                        <ArrowForwardIosIcon  style={{fontSize:'16px',color:'#9d9d9f'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
