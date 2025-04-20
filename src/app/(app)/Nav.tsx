'use client'
import React from 'react'
import styles from './Big.module.css'
import { usePathname } from 'next/navigation'

export default function Nav({ Sider,onClickItem }: { Sider: any,onClickItem: any }) {

    const pathname = usePathname()

    const onGit = (item:any) => {
        onClickItem(item)
    }

    return (
        <div>
            <div className={styles.sidder}>
                <div className={styles.sidder_name}>Koto</div>
                {
                    Sider.map((item: any) => {
                        const IconComponent = item.icon
                        return (
                            <div className={pathname == item.path ? `${styles.sidder_nav}` : `${styles.sidder_bac}`} onClick={()=>{onGit(item.path)}} key={item._id}>
                                {/* <AutoAwesomeMosaicOutlinedIcon style={{ width: '15px', height: '15px' }} /> */}
                                <IconComponent style={{ width: '15px', height: '15px' }} />
                                {/* <p>{item.icon}</p> */}
                                <span>{item.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
