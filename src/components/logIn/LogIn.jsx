'use client';
import style from './login.module.css';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { api } from '@/config/api';
import Popup from '../popup/popup';

const LogIn = ({token}) => {
    const router=useRouter();
    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });
    if (token) {
        return router.push('/product/shop');
    } else {
            const setCookie = (name, value, days) => {
                const expires = new Date();
                expires.setDate(expires.getDate() + days);
                document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
            };
            const [data,setData]=useState({
                mail:'',
                password:'',
            });
            const {mail,password}=data;

            const handleChange = (e) => {
                setData({
                    ...data,
                    [e.target.name]:e.target.value
                });
            };
            const handleSubmit =async(e)=>{
                e.preventDefault();
                    await fetch(`${api}/auth/logIn`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            mail,
                            password
                        }),
                    })
                    .then((res)=>res.json())
                    .then((res) => {
                        if (res.success === true) {
                            setCookie('token',res.token,10);
                            router.replace('/product/shop');
                            setPopupmsg({message:res.message,trigger:true,type:true});
                        } else {
                            setPopupmsg({message:res.message,trigger:true,type:false});
                            // location.reload();
                        }
                    })
                    .catch((error) => {
                        console.error("Fetch error:", error);
                        setPopupmsg({message:error.message,trigger:true,type:false});
                    });
                    setTimeout(() => setPopupmsg({trigger:false}), 3000);
            };



            return (
                <section>
                
                    <div className={style.logIn}>
                        <h1 style={{fontSize:'2.5rem',margin:'2rem'}}>LogIn</h1>
                        <form onSubmit={handleSubmit}>
                            <input placeholder='Write your Eamil' value={mail} type="email" onChange={handleChange} required name="mail" />
                            <input placeholder='Write your Password' value={password} type="password" onChange={handleChange} required name="password" />
                            <button type='submit'>LogIn</button>
                        </form>
                    </div> 
                    <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>
                </section>
            );

    };


};

export default LogIn;