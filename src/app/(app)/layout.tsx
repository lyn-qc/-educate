'use client'
import React, { useState } from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    // SidebarGroupLabel,
    SidebarMenu,
    // SidebarMenuButton,
    // SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from './Big.module.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextsmsIcon from '@mui/icons-material/Textsms';
import SchoolIcon from '@mui/icons-material/School';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Person4Icon from '@mui/icons-material/Person4';
import { usePathname, useRouter } from 'next/navigation'
// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

import Nav from './Nav'
import Image from 'next/image'
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import NotificationsPausedOutlinedIcon from '@mui/icons-material/NotificationsPausedOutlined';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Provider } from "jotai";


// Menu items.
// const items = [
//     {
//         title: "Home",
//         url: "#",
//         icon: Home,
//     },
//     {
//         title: "Inbox",
//         url: "#",
//         icon: Inbox,
//     },
//     {
//         title: "Calendar",
//         url: "#",
//         icon: Calendar,
//     },
//     {
//         title: "Search",
//         url: "#",
//         icon: Search,
//     },
//     {
//         title: "Settings",
//         url: "#",
//         icon: Settings,
//     },
// ]

export default function BigLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // const pathname = usePathname()
    const router = useRouter()
    const [bool,setbool] = useState(false)

    const sider = [
        { path: '/Home', name: '仪表盘',icon:AutoAwesomeMosaicOutlinedIcon },
        { path: '/Time', name: '日程表',icon:CalendarMonthIcon },
        { path: '/Mess', name: '消息',icon:TextsmsIcon },
        { path: '/Class', name: '我的课程',icon:SchoolIcon },
        { path: '/Data', name: '我的数据',icon:QueryStatsIcon },
        { path: '/AI', name: 'AI',icon:SettingsInputAntennaIcon },
        { path: '/Tate', name: '评价',icon:BookmarkAddedIcon },
        { path: '/Main', name: '我的账户',icon:Person4Icon }
    ]

    const onClickRouters = (item:string) => {
        // console.log(item);

        router.push(item)
    }

    return (
        <div className='h-[100vh]'>
            <SidebarProvider>
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {/* //侧边栏 */}
                                    <Nav Sider={sider} onClickItem={onClickRouters} />
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <main className='w-[94%]'>
                    <div className={styles.main}>
                        <div className={styles.main_top}>
                            <div className={styles.main_top_left}>
                                <span><SidebarTrigger />早上好，Koto</span>
                                {/* <button>创建新课程</button> */}
                                    <Button variant="destructive" style={{ backgroundColor: '#fdcb9e', color: 'black' }}><LiveTvIcon fontSize='small' />创建新课程</Button>
                                
                                
                            </div>
                            <div className={styles.main_top_right}>
                                <div className={styles.right_img}>
                                    <Image src='/1.png' alt='img' width={50} height={50} style={{ borderRadius: '50%' }} />
                                    <div className={styles.right_center}>
                                        <span>Koto</span>
                                        <span style={{ fontSize: '12px' }}>设计讲师</span>
                                    </div>
                                </div>
                                <div className={styles.right_control}>
                                    <AddCommentOutlinedIcon style={{ width: '18px', height: '18px' }} />
                                    <NotificationsPausedOutlinedIcon style={{ width: '18px', height: '18px' }} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.main_bottom}>
                            <Provider>
                                {children}
                            </Provider>
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}
