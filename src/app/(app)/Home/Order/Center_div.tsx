import React from 'react'
import styles from './Center.module.css'
import PaidIcon from '@mui/icons-material/Paid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';

export default function Center_div() {
    return (
        <div>
            <div className={styles.home_left_center}>
                <div className={styles.center_div}>
                    <div className={styles.center_div_top}>
                        <div className={styles.top_money}>
                            <PaidIcon />
                            <span style={{ fontWeight: 'bold', color: `var(--color-1)` }}>￥8686.2</span>
                        </div>
                        <div className={styles.top_fen}>
                            <span style={{ fontSize: '14px' }}>总收入</span>
                            <TrendingUpIcon style={{ fontWeight: 'bold', color: `var(--color-1)` }} />
                        </div>
                    </div>
                    <div className={styles.center_div_bottom}>

                    </div>
                </div>
                <div className={styles.center_div}>
                    <div className={styles.center_div_top}>
                        <div className={styles.top_money}>
                            <StackedLineChartIcon />
                            <span style={{ fontWeight: 'bold', color: `var(--color-1)` }}>5465</span>
                        </div>
                        <div className={styles.top_fen}>
                            <span style={{ fontSize: '14px' }}>平均评分</span>
                            <TrendingUpIcon style={{ fontWeight: 'bold', color: `var(--color-1)` }} />
                        </div>
                    </div>
                    <div className={styles.center_div_bottom}>

                    </div>
                </div>
                <div className={styles.center_div}>
                    <div className={styles.center_div_top}>
                        <div className={styles.top_money}>
                            <PeopleOutlineIcon />
                            <span style={{ fontWeight: 'bold', color: `var(--color-1)` }}>5622</span>
                        </div>
                        <div className={styles.top_fen}>
                            <span style={{ fontSize: '14px' }}>学生总数</span>
                            <TrendingUpIcon style={{ fontWeight: 'bold', color: `var(--color-1)` }} />
                        </div>
                    </div>
                    <div className={styles.center_div_bottom}>

                    </div>
                </div>
            </div>

        </div>
    )
}
