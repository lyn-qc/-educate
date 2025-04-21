'use client'
import React, { useEffect, useState } from 'react'
import styles from './Main.module.css'
import Mess_top from './Order/Mess_top'
import Live from './Order/Live'

export default function page() {

    const [bool,setbool] = useState<any>(true)
    const [data,setdata] = useState<any>([])

    // const update = (users:any,message:any) => {
    //     console.log(users,message);
        

        
    //     setbool(!bool)
    // }

    const update = async () => {
        setbool(!bool)
        // console.log(users,message)
        
        // const response = await fetch('/api/main', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         users: users,
        //         message: message
        //     }),
        // });
    }

    const updates = async (users: any, message: any) => {
        setbool(!bool)
        console.log(users,message)
        
        const response = await fetch('/api/main', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                users: users,
                message: message
            }),
        });
    }

    const updateImgs = async(_id:any,imgs:any) => {
        console.log(_id,imgs,'3213213');
        const response = await fetch('/api/upimgs',{
            method:'PuT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                _id:_id,
                imgs:imgs
            })
        })
        get()
    }


    async function get ()  {
        try{
            const response = await fetch('/api/main')
            const result = await response.json()
            console.log('GET响应',result.data);
            setdata(result.data)
        }catch(error){
            console.log('GET请求失败',error)
        }
    }

    useEffect(() => {
        get()
    },[])

    useEffect(() => {
        console.log(data,'datadatadata');
        
    },[data])

    return (
        <div className={styles.main}>
            <div className={styles.main_left}>
            {data && data.length > 0 ? (
                <Mess_top Bool={bool} Update={update} Data={data} Updates={updates} UpdateImgs={updateImgs} />
            ) : null}
            </div>
            <div className={styles.main_right}>
                <Live/>
            </div>
        </div>
    )
}
