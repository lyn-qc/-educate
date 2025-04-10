import React from 'react'
import styles from './Fire.module.css'
import {EyeOutlined} from '@ant-design/icons';
import DiamondIcon from '@mui/icons-material/Diamond';
import FlutterDashTwoToneIcon from '@mui/icons-material/FlutterDashTwoTone';

export default function Fire() {
    return (
        <div>
            <div className={styles.fire}>
                <span style={{marginBottom:'20px'}}>热门课程</span>
                <div className={styles.fire_div}>
                    <div className={styles.fire_div_one}>
                        <div className={styles.fire_div_oness}>
                            <div className={styles.fire_div_one_qi}>
                                <FlutterDashTwoToneIcon/>
                            </div>
                            <div className={styles.fire_div_one_font}>
                                <span>如何使用PS制作文字标注效果</span>
                                <span>1个月前</span>
                            </div>
                        </div>
                        <span style={{fontSize:'14px',color:'#e0e0e1'}}><EyeOutlined />&emsp;2042</span>
                    </div>
                    <div className={styles.fire_div_one}>
                        <div className={styles.fire_div_oness}>
                            <div className={styles.fire_div_one_p}>
                                p
                            </div>
                            <div className={styles.fire_div_one_font}>
                                <span>如何使用PS制作文字标注效果</span>
                                <span>1个月前</span>
                            </div>
                        </div>
                        <span style={{fontSize:'14px',color:'#e0e0e1'}}><EyeOutlined />&emsp;2042</span>
                    </div>
                    <div className={styles.fire_div_one}>
                        <div className={styles.fire_div_oness}>
                            <div className={styles.fire_div_one_zuan}>
                                <DiamondIcon style={{color:'#fec96f'}} />
                            </div>
                            <div className={styles.fire_div_one_font}>
                                <span>如何使用PS制作文字标注效果</span>
                                <span>1个月前</span>
                            </div>
                        </div>
                        <span style={{fontSize:'14px',color:'#e0e0e1'}}><EyeOutlined />&emsp;2042</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
