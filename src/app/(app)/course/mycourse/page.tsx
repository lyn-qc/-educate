'use client'
import React from 'react'
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
      title:"Figma创意复古Q版人物宫格插画",
      count:2440,
      time:'2天前',
      img:"https://th.bing.com/th/id/OIP.g5M-iZUiocFCi9YAzojtRAAAAA?w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    },
      
    {
      title:"如何使用PS制作文字标注效果?",
      count:1947,
      time:"一个月以前",
      img:"https://th.bing.com/th/id/OIP.BhKGCpwlZTq61xneDb7f4AHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    {
      title:'Sketch 101 -UI 设计教程',
      count:1731,
      time:"2个月以前",
      img:'https://th.bing.com/th/id/OIP.OSFH3hIukHqh-qrOvIfUWgAAAA?w=224&h=278&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    },
    
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
              <div className=' mt-[1rem] ml-[6.5rem]'>
                <div className='mb-[1rem]'>课程状态</div>
                <table>
                  <tr className='bg-[#F7F7F7]'>
                    <td>课程名称</td>
                    <td>浏览次数</td>
                    <td>价格</td>
                    <td>总销量(单)</td>
                    <td>总收入</td>
                  </tr>
                  {
                    list.map((item, index) => {
                      return (
                        <tr key={index} >
                          <td className='w-[15rem] flex mr-[2rem] mt-[3rem]'><img src={item.img} className='w-[3rem] h-[3rem] rounded-[1rem] mr-[2rem]' />{item.title}</td>
                          <td className='w-[7rem] mt-[3rem]'>{item.count}</td>
                          <td className='w-[7rem] mt-[3rem]'>{item.price}</td>
                          <td className='w-[7rem] mt-[3rem]'>{item.sum}</td>
                          <td className='w-[7rem] mt-[3rem]'>{item.sum_money}</td>
                        </tr>
                      )
                    })
                  }
                </table>
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
              <div>
               <div className='mt-[2rem]'>热门课程</div>
               <div>
                  {
                    course.map((item,index)=>{
                      return(
                        <div key={index}>
                          <div className='flex'> 
                            <div className=' mr-[1rem] mt-[2rem]'><img src={item.img} alt="" className='rounded-[5rem] w-[3rem] h-[3rem]' /></div>
                            <div className='mr-[1rem] mt-[1rem]'>{item.title}</div>
                            <div className=' mr-[1rem] mt-[1rem]'>{item.count}</div>
                          </div>
                        </div>
                      )
                    })
                  }
               </div>
            </div>
            <div className='mt-[2rem]'>
              <div>热门学生位置</div>
              <div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            </div>
            
          </div>
          
        </div>

      </div>

    </div>
  )
}
