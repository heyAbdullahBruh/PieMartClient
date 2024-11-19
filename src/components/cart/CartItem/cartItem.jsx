'use client';

import  { useEffect, useState } from 'react';
import { useCart } from '../cartContext';
import { api } from '@/config/api';
// import styles from './cart.module.css';
import CartPItem from '../prodItem/cartProdItem';
import Popup from '@/components/popup/popup';

const CartItem = () => {
    const {setCart, token}=useCart();

    // const [cartItems,setCartItems]=useState([]);
    const [popupMsg,setPopupmsg]=useState({
        type:true,
        message:'',
        trigger:false,
     });

    const [cartProd,setCartProd]=useState([]);

    const [cartPid,setCartpId]=useState('');
   

    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');

    useEffect(()=>{
        fetch(`${api}/cart/usercart`,{
            method:'GET',
            headers:{
                authorization:token,
            },
        })
        .then(res=>res.json())
        .then((res)=>{
            if (res.success==true) {
                // setCartItems(res.cart);
                setCart(res.cart);
                setLoading(false);
                setError('');
            } else {
                setLoading(false);
                setError(res.message);
            };
        }).catch(err=>setError(err.message));
    },[]);



    useEffect(()=>{
        fetch(`${api}/cart/cartproduct`,{
            method:'GET',
            headers:{
                authorization:token,
            },
        })
        .then(res=>res.json())
        .then((res)=>{
            if (res.success==true) {
                setCartProd(res?.cart);
                setLoading(false);
               setError('');
            } else {
                setLoading(false);
               setError(res.message);
            };
        }).catch(err=>{setError(err.message)
        });

    },[]);

    // console.log(cartProd);

    const getCartPId=(id)=>{
        setCartpId(id);
        
    };

    useEffect(()=>{
        if (cartPid) {
            fetch(`${api}/cart/remove/${cartPid}`,{
                method:'DELETE',
                headers:{
                    authorization:token,
                },
                // body:JSON.stringify({productId:cartPid})
            })
            .then(res=>res.json())
            .then((res)=>{
                if (res.success==true) {
                     const removeProduct=cartProd.filter((p)=>p.productId!==cartPid);
                    // console.log(removeProduct);
                    setCartProd(removeProduct);
                    setCart(res.cart);
                    setError('');
                    setPopupmsg({message:res.message,trigger:true,type:true});
    
                } else {
                    // setLoading(false);
                    setError(res.message);               
                    setPopupmsg({message:res.message,trigger:true,type:false});
    
                };
            }).catch(err=>{
                setError(err.message);           
                setPopupmsg({message:err.message,trigger:true,type:false});
    
            });
            setTimeout(() => setPopupmsg({trigger:false}), 3000);
        } 
        // const removeProduct=cartProd.filter((p)=>p.productId===cartPid);
        // console.log(removeProduct);
    },[cartPid]);
// console.log(cartProd);
    return (
        <>
            {
            loading ? <p>Loading...</p>: error ? <h3 style={{color:'red'}}>{error}</h3>:
            <> 
            
                <CartPItem cartProd={cartProd} token={token} getCartPId={getCartPId}/>
                <Popup trigger={popupMsg.trigger} message={popupMsg.message} type={popupMsg.type}/>
            </>
            } 
        </>   
    );
};

export default CartItem;