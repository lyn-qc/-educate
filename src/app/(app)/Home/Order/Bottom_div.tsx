'use client'
import React, { useEffect, useRef } from 'react'
import { Divider, Flex, Tag } from 'antd';
import styles from './Bottom.module.css'
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

echarts.use([
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | LegendComponentOption
    | PieSeriesOption
>;

export default function Bottom_div() {

    const charRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chartDom = charRef.current;
        if (chartDom) {
            const myChart = echarts.init(chartDom)
            const option = {
                title: {
                    text: '课程统计',
                    left: 'left',
                    top: '50'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    bottom: 40,
                    left: 'center'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['20%', '40%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        color: ['#cceabb', '#fdcb9e'],
                        data: [
                            { value: 30, name: '课程已售' },
                            { value: 70, name: '课程观看率' }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);

            return () => {
                myChart.dispose();
            }
        }
    }, [])

    return (
        <div>
            <div className={styles.bottom}>
                <div className={styles.bottom_left} style={{ width: '270px', height: '270px' }} ref={charRef} />
                <div className={styles.bottom_right}>
                    <span>每周销售统计</span>
                        <div className={styles.right_title}>
                            <span className={styles.right_title_span1}>课程</span>
                            <span className={styles.right_title_span2}>已售</span>
                            <span className={styles.right_title_span3}>收入</span>
                        </div>
                        <div className={styles.right_context}>
                            <div className={styles.right_context_p}>P</div>
                            <div className={styles.right_context_font}>
                                总是被说画面没质感？只需2招教你解决！
                            </div>
                            <div className={styles.right_context_count}>
                                10
                            </div>
                            <div className={styles.right_context_money}>
                                <Tag bordered={false} color="green">￥850</Tag>
                            </div>
                        </div>
                        <div className={styles.right_context}>
                            <div className={styles.right_context_quan}><AutoStoriesIcon style={{color:'#2a6017'}} /></div>
                            <div className={styles.right_context_font}>
                                总是被说画面没质感？只需2招教你解决！
                            </div>
                            <div className={styles.right_context_count}>
                                10
                            </div>
                            <div className={styles.right_context_money}>
                                <Tag bordered={false} color="green">￥850</Tag>
                            </div>
                        </div>
                        <div className={styles.right_context}>
                            <div className={styles.right_context_A}><FormatColorTextIcon style={{color:'#ab6b09'}} /></div>
                            <div className={styles.right_context_font}>
                                总是被说画面没质感？只需2招教你解决！
                            </div>
                            <div className={styles.right_context_count}>
                                10
                            </div>
                            <div className={styles.right_context_money}>
                                <Tag bordered={false} color="green">￥850</Tag>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}