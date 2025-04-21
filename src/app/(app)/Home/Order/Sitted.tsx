'use client'
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TitleComponentOption,
    TooltipComponent,
    TooltipComponentOption,
    GridComponent,
    GridComponentOption,
    LegendComponent,
    LegendComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import styles from './Sitted.module.css'

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer
]);

type EChartsOption = echarts.ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | LegendComponentOption
    | BarSeriesOption
>;

export default function Sitted() {

    const charRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chartDom = charRef.current;
        if (chartDom) {
            const myChart = echarts.init(chartDom)
            const option:EChartsOption = {
                title: {
                    text: '热门学生位置'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '15%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 20,
                    axisLabel: {
                        formatter: '{value}%'
                    }
                },
                yAxis: {
                    type: 'category',
                    data: ['北京', '上海', '深圳']
                },
                series: [
                    {
                        type: 'bar',
                        color: '#ceebbe',
                        data: [10, 30, 50]
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
            <div ref={charRef} style={{width:'350px',height:'260px'}} className={styles.sitted}>

            </div>
        </div>
    )
}
