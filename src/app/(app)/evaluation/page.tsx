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
import { Rate } from 'antd';
import { VideoCameraOutlined, StockOutlined, AuditOutlined, StarOutlined ,ProfileOutlined,EyeOutlined, PayCircleOutlined ,UserAddOutlined} from '@ant-design/icons'
export default function page() {
  const { data, isLoading } = useCurrentUser()
  console.log(data?.name);
  const [data1, setData1] = useState<any>([
    {
        img:'https://th.bing.com/th/id/OIP.ho1iUTl-FfeS58jswSjKUAHaLH?w=131&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        title:'总是被说画面没质感?只需要2招叫你解决!',
        name:'张宇航',
        addres:'北京',
        text:'在这个示例中,玻璃块叠加部分的内容模糊掉，从而增强了毛玻璃质感效果。',
        ev:2.5
    },
    {
        img:'https://th.bing.com/th/id/OIP.m5iW5EirBv6JFk4f79bEGwHaEo?w=264&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        title:"训练营公开课!酷炫的机能风动态CD封面",
        name:"李心怡",
        addres:'深圳',
        text:"在这个示例中,玻璃块叠加部分的内容模糊掉，从而增强了毛玻璃质感效果。",
        ev:3.5
    },
    {
        img:"https://th.bing.com/th/id/OIP.A5AUdWgDvgwrdgJIWvciIgEsDh?w=258&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        title:'AI教程!用AI生成图片,让AI帮你做设计',
        name:"koto",
        addres:'北京',
        text:"在这个示例中,玻璃块叠加部分的内容模糊掉，从而增强了毛玻璃质感效果。",
        ev:4.5
    },
    {
        img:"https://th.bing.com/th/id/OIP.I9E3NywN6414d-eNHE-wVQHaHZ?w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
        title:"插画思路?清新可爱的卡通饮品插画如何绘制?",
        name:"郑雅婷",
        addres:'上海',
        text:"在这个示例中,玻璃块叠加部分的内容模糊掉，从而增强了毛玻璃质感效果。",
        ev:2.5
    }
  ])
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
                    <div><UserAddOutlined className='text-[1rem] ml-[1.8rem]' /></div>
                    <div className='text-[#FDCB9E] text-[1rem] ml-[1rem]'>4.5/5</div>
                  </div>
                  <div className='flex mt-[1rem]'>
                    <div className='text-[0.6rem] ml-[1.5rem] mt-[0.5rem]'>
                      平均评分
                    </div>
                    <div className='text-[#FDCB9E] ml-[1rem]'>
                      <StockOutlined />
                    </div>
                  </div>
                </div>
                <div className='border-[1px] border-solid border-[#E5E5E5] mt-[2rem] ml-[7rem] w-[9rem] h-[9rem]  rounded-[1rem]'>
                  <div className='flex mt-[2rem]'>
                    <div><ProfileOutlined className='text-[1rem] ml-[1.8rem]' /></div>
                    <div className='text-[#A5CC8F] text-[1rem] ml-[1rem]'>1,831</div>
                  </div>
                  <div className='flex mt-[1rem]'>
                    <div className='text-[0.6rem] ml-[1.5rem] mt-[0.5rem]'>
                      总评论
                    </div>
                    <div className='text-[#A5CC8F] ml-[1rem]'>
                      <StockOutlined />
                    </div>
                  </div>
                </div>
                <div className='border-[1px] border-solid border-[#E5E5E5] mt-[2rem] ml-[7rem] w-[9rem] h-[9rem]  rounded-[1rem] '>
                  <div className='flex mt-[2rem]'>
                    <div><StarOutlined className='text-[1rem] ml-[1.8rem]' /></div>
                    <div className='text-[#A5CC8F] text-[1rem] ml-[1rem]'>0.5%</div>
                  </div>
                  <div className='flex mt-[1rem]'>
                    <div className='text-[0.6rem] ml-[1.5rem] mt-[0.5rem]'>
                        评分变更
                    </div>
                    <div className='text-[#A5CC8F] ml-[1rem]'>
                      <StockOutlined />
                    </div>
                  </div>
                </div>
               
              </div>
              <div className='ml-[6rem] mt-[2rem]'>
                    <div>课程评论</div>
                    <div>
                        <table>
                            <tr className='bg-[#F5F5F5]'>
                                <td >课程名称</td>
                                <td>学员</td>
                                <td>
                                    评价
                                </td>
                            </tr>
                            {
                                data1.map((item:any,index:any)=>{
                                    return(
                                       <tr key={index}>
                                           <td className='w-[15rem]'>
                                             <div className='flex mt-[1rem]'>
                                             <div><img src={item.img} alt=""  className='w-[4rem] h-[4rem] rounded-[0.5rem]'/></div>
                                             <div className='ml-[1rem]'>{item.title}</div>
                                             </div>
                                           </td>
                                       </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </div>
            </div>
            <div className='w-[20rem] h-[10rem] bg-[#F7F7F7]  rounded-[1rem] mt-[2rem] ml-[4rem]'>
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
              <div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
