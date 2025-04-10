'use client'
import React, { useState } from 'react'
import styles from './Main.module.css'
import Mess_top from './Order/Mess_top'
import Live from './Order/Live'

export default function page() {

    const [bool,setbool] = useState(true)

    const update = () => {
        setbool(!bool)
    }

    return (
        <div className={styles.main}>
            <div className={styles.main_left}>
                <Mess_top Bool={bool} Update={update} />
            </div>
            <div className={styles.main_right}>
                <Live/>
            </div>
        </div>
    )
}
