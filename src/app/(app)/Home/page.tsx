import React from 'react'
import styles from './Order/Home.module.css'
import EchartsChart from './Order/Echarts_top'
import Center_div from './Order/Center_div'
import Bottom_div from './Order/Bottom_div'
import Money from './Order/Money'
import Fire from './Order/Fire'
import Sitted from './Order/Sitted'

export default function page() {
    return (
        <div className={styles.home}>
                <div className={styles.home_left}>
                    <div className={styles.home_left_top}>
                        <EchartsChart/>
                    </div>
                    <Center_div/>
                    <Bottom_div/>
                </div>
                <div className={styles.home_right}>
                    <Money/>
                    <Fire/>
                    <Sitted/>
                </div>
        </div>
    )
}
