'use client';
import Image from 'next/image';
import styles from './profile.module.css';
import { useEffect, useState } from 'react';
import { api } from '@/config/api';
import Link from 'next/link';


const Profile = ({user,token}) => {
    // console.log(user);
    const {name,mail,profile,isAdmin}=user;
    const [userOrderPrduct,secUserOrderProduct]=useState([]);
    const [order,setOrder]=useState({});

    useEffect(()=>{
        fetch(`${api}/order/userorder`,{headers:{authorization:token}}).then((res)=>res.json())
        .then((res)=>{
            if (res.success===true) {
                secUserOrderProduct(res?.order.items);
                setOrder(res?.order);
            }
        }).catch((err)=>console.log(err.message));
    },[]);
    // console.log(userOrderPrduct.flatMap);



    return (
        <section className={styles.userProfile}>
            <div className={styles.userInfo}>
                <div className={styles.userInfoSec}>
                    <Image src={profile?profile:'https://i.postimg.cc/T3kNzYSD/user.jpg'} alt={name} width={150} height={150} />
                    <p>{name}</p>
                    <strong>{mail}</strong>
                </div>
            </div>
            <div className={styles.userData}>
                <div className={styles.uDact}>
                    <button>Order Product</button>
                    {isAdmin&&<button>Customer Product</button>}
                </div>
                <div className={styles.userDatasec}>
                   {
                    order.deliveryStatus==='delivered'? <p>Don't have any orderd product please go to shop <Link href={'/product/shop'} style={{color:"yellow"}}> Shop</Link> </p>:
                       <div className={styles.oderPsec}>
                        {userOrderPrduct?.flat().map((c,index) => (
                            <div className={styles.orderItem} key={`product${index}`}>
                                <img src={c?.imageUrl[0].photo} alt={c.name} className={styles.image} />
                                <div className={styles.details}>
                                    <h3 className={styles.name}>{c.name}</h3>
                                    <p className={styles.price}>${c.price}</p>
                                </div>
                                <div className={styles.anotherDetail}>
                                    <p>{c.quantity}pieces</p>
                                    <p>${c.totalPrice}</p>
                                </div>
                            </div>
                        ))}
                       </div>
                   }
                </div>
            </div>
        </section>
    );
};

export default Profile;