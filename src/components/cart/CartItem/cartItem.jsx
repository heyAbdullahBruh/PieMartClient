'use client';

import  { useEffect, useState } from 'react';
import { useCart } from '../cartContext';
import { api } from '@/config/api';
import styles from './cart.module.css';
import CartPItem from '../prodItem/cartProdItem';

const CartItem = () => {
    const {setCart, token}=useCart();

    const [cartItems,setCartItems]=useState([]);


    const [cartProd,setCartProd]=useState([]);

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
                setCartItems(res.cart);
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
                setCartProd(res.cart);
                setLoading(false);
                setError('');
            } else {
                setLoading(false);
                setError(res.message);
            };
        }).catch(err=>setError(err.message));
    },[]);

    // console.log(cartProd);
        

    return (
        <>
            {
            loading ? <p>Loading...</p>: error ? <h3 style={{color:'red'}}>{error}</h3>:
            <> 
            
                <CartPItem cartProd={cartProd}/>

            </>
            } 
        </>   
    );
};

export default CartItem;