import React from 'react'
import styles from './Money.module.css'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Button } from "@/components/ui/button"

export default function Money() {
  return (
    <div>
        <div className={styles.money}>
            <div className={styles.money_top}>
                <span>你的收入</span>
                <TrendingUpIcon style={{ fontWeight: 'bold' }} />
            </div>
            <div className={styles.money_bottom}>
                <div className={styles.money_bottom_div}>
                    <span style={{fontSize:'12px'}}>今日收益</span>
                    <span style={{fontSize:'20px'}}>￥1212</span>
                </div>
                <div className={styles.money_bottom_div}>
                    <span style={{fontSize:'12px'}}>待支付</span>
                    <span style={{fontSize:'20px',color:`var(--color-2)`}}>￥399</span>
                </div>
                <div className={styles.money_bottom_div}>
                    <span style={{fontSize:'12px'}}>审核中</span>
                    <span style={{fontSize:'20px'}}>￥555</span>
                </div>
            </div>
        </div>
        <div className={styles.buy}>
            <div className={styles.buy_left}>
                <span style={{color:'#c2c2c3',fontSize:'12px'}}>可获得</span>
                <span style={{color:`var(--color-1)`,fontSize:'19px'}}>￥955</span>
            </div>
            <Button variant="destructive" style={{backgroundColor:'#fdcb9e',color:'black',width:'130px'}}>立即提现</Button>
        </div>
    </div>
  )
}
