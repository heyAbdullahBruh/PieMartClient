'use client';
import Link from 'next/link';
import styles from './seller.module.css';
import { useState } from 'react';
import { api } from '@/config/api';
import Popup from '@/components/popup/popup';
import { useCart } from '@/components/cart/cartContext';
import { useOrder } from '@/components/order/orderContext';
import { useRouter } from 'next/navigation';

const TobeSeller = () => {
    const router =useRouter();

    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setDate(expires.getDate() + days);
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
    };

    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });
     const {token}=useCart();
     const {user}=useOrder();

     if (user.isAdmin) {
        router.replace('/');
     } else {
        const [pass,setPass]=useState('');

        const handleSubmit =async(e)=>{
            e.preventDefault();
                await fetch(`${api}/user/switchAdmin`, {
                    method: 'PATCH',
                    headers: {
                        authorization:token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        password:pass
                    }),
                })
                .then((res)=>res.json())
                .then((res) => {
                    if (res.success === true) {
                        setCookie('token',res.token,10);
                        setPopupmsg({message:res.message,trigger:true,type:true});
                        location.reload();
                        router.replace('/');
                    } else {
                        setPopupmsg({message:res.message,trigger:true,type:false});
                    }
                })
                .catch((error) => {
                    console.error("Fetch error:", error);
                    setPopupmsg({message:error.message,trigger:true,type:false});
                });
                setTimeout(() => setPopupmsg({trigger:false}), 3000);
        };

        return (
            <section className={styles.sellerSec}>
                <h1>Are You want to be a seller?</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder='Enter your Mail' className={styles.mailpass} type="email" name="mail"  />
                    <input required placeholder='Enter your password' className={styles.mailpass} type="password" name="password" onChange={(e)=>setPass(e.target.value)}/>
                    <div>
                        <input required type="checkbox" style={{transform:'scale(1.5',cursor:'pointer'}}/>
                        <label htmlFor="terms">Are you confirm in seller <Link href={'/#'}>Terms</Link></label>
                    </div>
                    <button type="submit">Become A Seller</button>
                </form>
                <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>
            </section>
        );
     }
    
};

export default TobeSeller;