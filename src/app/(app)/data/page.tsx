'use client'
import React from 'react'
import ReactEcharts from "echarts-for-react";
import { Progress } from 'antd';
import * as echarts from 'echarts';
// import {echarts} from 'echarts/core'
import { useEffect, useState } from 'react'
import Image from '../../../../../node_modules/next/image'
import { UserButton } from '@/features/auth/components/user-button'
import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser'
import { VideoCameraOutlined, StockOutlined, AuditOutlined, EyeOutlined, PayCircleOutlined } from '@ant-design/icons'
export default function page() {
  const { data, isLoading } = useCurrentUser()
  console.log(data?.name);
  const [list, setList] = useState([
    {
      title: "总是被说画画没质感?只需要2招帮你解决!",
      img: "https://ts1.tc.mm.bing.net/th/id/OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 299,
      count: 11122,
      sum: 62,
      sum_money: 9.980,
    },
    {
      title: "训练营公开课!酷炫的机能风动态CD封面",
      img: "https://ts2.tc.mm.bing.net/th/id/OIP-C.YYA9-gpLx9sz8p9DJn4IawHaEK?w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 500,
      count: 64142,
      sum: 29,
      sum_money: 8155,
    }
    ,
    {
      title: "AI教程来了!重复拖尾字体效果怎么做？",
      img: "https://ts4.tc.mm.bing.net/th/id/OIP-C.CzOKfA9PY2-j4hIc5vJIJAHaEK?w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 500,
      count: 64142,
      sum: 29,
      sum_money: 8155,
    }
    ,
    {
      title: "ps教程!三步营造夜晚氛围感场景",
      img: "https://ts2.tc.mm.bing.net/th/id/OIP-C.JBDfIBkxpSvVVvE-t02giwHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 500,
      count: 64142,
      sum: 29,
      sum_money: 8155,
    }
    ,
    {
      title: "小恐龙IP形象角色设计03展UV与材质渲染",
      img: "https://ts1.tc.mm.bing.net/th/id/OIP-C.fL0nojDf77J85ED5HhRmkQHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 500,
      count: 64142,
      sum: 29,
      sum_money: 8155,
    }
    ,
    {
      title: "插画思路？清晰可爱的卡通饮品插画如何绘制？",
      img: "https://ts3.tc.mm.bing.net/th/id/OIP-C.BhKGCpwlZTq61xneDb7f4AHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      price: 500,
      count: 64142,
      sum: 29,
      sum_money: 8155,
    }
  ])
  const [course, setCourse] = useState([
    {
      title: "Figma创意复古Q版人物宫格插画",
      count: 2440,
      time: '2天前',
      img: "https://th.bing.com/th/id/OIP.g5M-iZUiocFCi9YAzojtRAAAAA?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    },

    {
      title: "如何使用PS制作文字标注效果?",
      count: 1947,
      time: "一个月以前",
      img: "https://th.bing.com/th/id/OIP.BhKGCpwlZTq61xneDb7f4AHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    {
      title: 'Sketch 101 -UI 设计教程',
      count: 1731,
      time: "2个月以前",
      img: 'https://th.bing.com/th/id/OIP.OSFH3hIukHqh-qrOvIfUWgAAAA?w=224&h=278&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    },

  ])
  const option = {
    xAxis: {
      axisLine: {
        show: false // 隐藏X轴的轴线
      }, axisTick: {
        show: false // 隐藏X轴的刻度线
      },
      splitLine: {
        show: false// 隐藏网格线
      },
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false // 显示Y轴线
      },
      axisTick: {
        show: false // 显示Y轴刻度
      },
      splitLine: {
        show: false // 隐藏Y轴的网格线
      }
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 200, 300, 400, 500, 600],

        type: 'bar',
        itemStyle: {
          color: '#CCEABB'
        },

        barWidth: 10 // 设置柱子宽度，单位是像素
      }
    ]
  };
  const option1 = {
    dataset: {
      source: [
        ['score', 'amount', 'product'],
        [50, 69, 'UI/UX 设计师'],
        [87, 87, '设计技巧'],
        [71, 71, '产品设计'],
      ]
    },
    grid: { containLabel: true },
    xAxis: {
      name: 'amount',
      axisLine: {
        show: false // 隐藏X轴的轴线
      }, axisTick: {
        show: false // 隐藏X轴的刻度线
      },
      splitLine: {
        show: false// 隐藏网格线
      },

    },
    yAxis: {
      type: 'category',
      axisLine: {
        show: false // 显示Y轴线
      },
      axisTick: {
        show: false // 显示Y轴刻度
      },
      splitLine: {
        show: false // 隐藏Y轴的网格线
      }
    },
    visualMap: {
      // orient: 'horizontal',
      left: 'center',
      min: 10,
      max: 100,
      // text: ['High Score', 'Low Score'],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ['#65B581']
      }
    },
    series: [
      {
        type: 'bar',
        encode: {
          // Map the "amount" column to X axis.
          x: 'amount',
          // Map the "product" column to Y axis
          y: 'product'
        },
        barWidth: 10 // 设置柱子宽度，单位是像素
      }
    ]
  };
  const  option2 = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '系列1',
        type: 'bar',
        stack: '总量',
        data: [12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        itemStyle: {
          color: '#CCEABB'  // 设置颜色为浅绿色
        }
        ,
        barWidth: 10
      },
      
    ]
  };
  const [data1, setData] = useState([
    {
      img:"https://th.bing.com/th/id/OIP.LO6625C8g41ovz21idvhOgAAAA?w=220&h=220&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      title:"总是被说画面没质感?只需要2招叫你解决!",
      price:850.5
    },
    {
      img:'https://th.bing.com/th/id/OIP.9CUoHhJn7Ao9FEWbuxa6nQAAAA?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      title:"训练营公开课!炫酷的机能风动态CD封面",
      price:985
    },{
      img:"https://th.bing.com/th/id/OIP.GmKWQRdP3NTjjlyzPv2xLAAAAA?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      title:"AI教程!重复拖尾字体效果怎么做?",
      price:809
    }
  ]);
  const  option3 = {
    title: {
      left: 'left',
      top: '0',
      textStyle: {
        fontSize: 10
      }
    },
  
    xAxis: {
      type: 'value',
      show: false  // 不显示横轴
    },
    yAxis: {
      type: 'category',
      data: ['北京', '上海', '深圳'],
      inverse: true,  // 倒序显示
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: '#333',
        fontSize: 10
      }
    },
    series: [
      {
        type: 'bar',
        data: [350, 290, 212],
        barWidth: 20,
        itemStyle: {
          borderRadius: 10,
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            { offset: 0, color: '#c0f3cd' },
            { offset: 1, color: '#eafbf1' }
          ])
        },
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            const percentList = [25, 20, 15];
            const people = params.value.toLocaleString();
            return `👥 ${people}    ${percentList[params.dataIndex]}%`;
          },
          color: '#555',
          fontSize: 10
        }
      }
    ]
  };
  
  return (
    <div>
      <div>
        <div className='flex mt-[2rem] ml-[4rem]'>
          <div className='mr-[30rem]'>你好,{data?.name}</div>
          <div className='bg-[#FDCB9E] w-[8rem] h-[2rem] leading-[2rem] text-center rounded-[0.2rem]'>
            <VideoCameraOutlined className='mr-[0.5rem]' />
            <button>创建新课程</button>
          </div>
          <div className='flex ml-[3rem]'>
            <div className='ml-[2rem]'><UserButton /></div>
            <div className='mt-[0.5rem]'>{data?.name}</div>
          </div>
        </div>
        <div>
          <div className='flex'>
            <div>
              <div className='flex'>
                <div className='border-[1px] border-solid border-[#E5E5E5] mt-[2rem] ml-[7rem] w-[9rem] h-[9rem] rounded-[1rem]'>
                  <div className='flex mt-[2rem]'>
                    <div><AuditOutlined className='text-[1rem] ml-[1.8rem]' /></div>
                    <div className='text-[#A5CC8F] text-[1rem] ml-[1rem]'>151</div>
                  </div>
                  <div className='flex mt-[1rem]'>
                    <div className='text-[0.6rem] ml-[1.5rem] mt-[0.5rem]'>
                      新订单
                    </div>
                    <div className='text-[#A5CC8F] ml-[1rem]'>
                      <StockOutlined />
                    </div>
                  </div>
                </div>
                <div className='border-[1px] border-solid border-[#E5E5E5] mt-[2rem] ml-[7rem] w-[9rem] h-[9rem]  rounded-[1rem]'>
                  <div className='flex mt-[2rem]'>
                    <div><PayCircleOutlined className='text-[1rem] ml-[1.8rem]' /></div>
                    <div className='text-[#FDCB9E] text-[1rem] ml-[1rem]'>12,741</div>
                  </div>
                  <div className='flex mt-[1rem]'>
                    <div className='text-[0.6rem] ml-[1.5rem] mt-[0.5rem]'>
                      总收入
                    </div>
                    <div className='text-[#FDCB9E] ml-[1rem]'>
                      <StockOutlined />
                    </div>
                  </div>
                </div>
                <div className='border-[1px] border-solid border-[#E5E5E5] mt-[2rem] ml-[7rem] w-[9rem] h-[9rem]  rounded-[1rem] '>
                  <div className='flex mt-[2rem]'>
                    <div><EyeOutlined className='text-[1rem] ml-[1.8rem]' /></div>
                    <div className='text-[#A5CC8F] text-[1rem] ml-[1rem]'>75%</div>
                  </div>
                  <div className='flex mt-[1rem]'>
                    <div className='text-[0.6rem] ml-[1.5rem] mt-[0.5rem]'>
                      新访客
                    </div>
                    <div className='text-[#A5CC8F] ml-[1rem]'>
                      <StockOutlined />
                    </div>
                  </div>
                </div>
              </div>
              <div className=' mt-[1rem] ml-[5rem]'>
                <div>访客数据</div>
                <div>
                  <ReactEcharts
                    option={option}
                    style={{ width: '45rem' }}
                  />
                </div>
              </div>
              <div className='flex'>
                <div className='ml-[0.5rem] mr-[6rem]'>
                  <div className='ml-[3rem] mb-[1rem]'>每周统计</div>
                  <div
                    style={{
                      width: 200,
                      marginLeft: 70,
                    }}
                  >
                     UI/UX设计师<Progress percent={59} size="small"  strokeColor="#A5CC8F" />
                     设计技巧<Progress percent={87} size="small"  strokeColor="#A5CC8F" /> 
                     {/* <Progress percent={71} size="small" s tatus="exception"  status="active" /> */}
                      产品设计<Progress percent={71} size="small"  strokeColor="#A5CC8F" />
                  </div>
                </div>
                <div>
                  <div>收入记录</div>
                  <div className='mt-[1rem]'>
                  {
                     data1?.map((item,index) => {
                       return(
                           <div key={index} className='flex mt-[1rem]'>
                              <div><img src={item.img} alt=""  className='w-[3rem] h-[3rem] rounded-[0.5rem] ml-[1rem]'/></div>
                              <div className='w-[13rem] ml-[1rem]'>{item.title}</div>
                              <div className='w-[5rem] h-[2rem] bg-[#F2FAEE] text-[#A5C183] rounded-[0.5rem] text-center leading-[2rem]'>￥{item.price}</div>
                           </div>
                       )
                     })
                  }
                </div>
                </div>
                
              </div>
            </div>
            <div className='w-[20rem] h-[10rem] bg-[#F7F7F7]  rounded-[1rem] mt-[2rem] ml-[2rem]'>
              <div className='flex  mt-[1rem] ml-[1rem]'>
                <div className='mr-[12rem] '>你的收入</div>
                <div className='text-[#79797C]'><StockOutlined /></div>
              </div>
              <div className='mt-[1rem] flex ml-[2rem]'>
                <div className='w-[6rem] h-[4rem] bg-[#F7F7F7] '>
                  <div>今日收益</div>
                  <div className='mt-[0.5rem]'>￥12.010</div>
                </div>
                <div className='w-[6rem] h-[4rem] bg-[#F7F7F7] '>
                  <div>待支付</div>
                  <div className='mt-[0.5rem]'>￥399</div>
                </div>
                <div className='w-[6rem] h-[4rem] bg-[#F7F7F7] '>
                  <div>审核中</div>
                  <div className='mt-[0.5rem]'>￥555</div>
                </div>
              </div>
              <div className='w-[20rem] h-[4rem] bg-[black] rounded-bl-[1rem] rounded-br-[1rem] flex'>
                <div className='ml-[2rem] mt-[0.5rem] '>
                  <div className='text-[white] text-[0.6rem]'>可获得</div>
                  <div className='text-[#CCDF91]'>￥955</div>
                </div>
                <div className='w-[6rem] h-[2rem] bg-[#FDCB9E] text-center leading-[2rem] rounded-[0.3rem] mt-[1rem] ml-[8rem]'>立即体现</div>
              </div>
              <div className='mt-[2rem] h-[10rem]'>
                <div>提现</div>
                <div>
                <ReactEcharts
                    option={option2}
                    style={{ width: '25rem' }}
                  />
                </div>
              </div>
              <div className='h-[12rem] mt-[8rem]'>
                 <div>热门学生位置</div>
                 <ReactEcharts
                  option={option3}
                  style={{ width: '26rem',height: '17rem',position:'relative',bottom:'3rem',right:'1.3em'}}
                 />
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
