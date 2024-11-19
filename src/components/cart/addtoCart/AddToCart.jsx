import { api } from '@/config/api';
import styles from './atc.module.css';
import Popup from '@/components/popup/popup';
import { useState } from 'react';


const AddToCart = ({token,productId}) => {
    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });

    const handleAddToCart=async()=>{
        // console.log({token,productId});
        await fetch(`${api}/cart/add`,{
            method:'POST',
            headers:{
                authorization:token,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({productId})
        }).then(res=>res.json())
        .then((res) => {
           if (res.success === true) {
               location.href='/cart';
               setPopupmsg({message:res.message,trigger:true,type:true});
           } else {
               setPopupmsg({message:res.message,trigger:true,type:false});
               console.error("400 error:", res.message);
            //    location.reload();
           }
       })
       .catch((error) => {
           console.error("Fetch error:", error);
           setPopupmsg({message:error.message,trigger:true,type:false});
       });
        setTimeout(() => setPopupmsg({trigger:false}), 3000);
    };


    return <>
    <button onClick={handleAddToCart} className={styles.actBtn}>Add To Cart</button>
    <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>

    </>;
};

export default AddToCart;