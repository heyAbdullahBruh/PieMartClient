// components/Product.js
'use client';
import Image from 'next/image';
import styles from './productTemp.module.css';
import Link from 'next/link';
// import {  useEffect, useState } from 'react';
// import {useCart } from '../cart/cartContext';
const ProductTemp = ({ product }) => {

  // const {setCartCount}=useCart();
  // const cartItem={
  //   id:product._id,
  //   quantity:1
  // }

  

  return (
    <article className={styles.card}>
        <div className={styles.imageWrapper}>
            <Image src={product?.pImgs[0].photo} alt={product.pName} width={200} height={200} className={styles.image} />
        </div>
        <h3 className={styles.title}>{product.pName}</h3>
        <h4 className={styles.brnad}>Brand : {product.brand} </h4>
        <p className={styles.rating}>Rating : {product.averageRat}/5</p>
        <p className={styles.price}>${product.price}</p>
        {/* { */}
          {/* cart.find(p=>p.id===product._id)? */}
          {/* // <button className={styles.button} onClick={()=>location.href='/cart'}>Go to Cart</button>: */}
        <Link href={`/product/details/${product._id}`} style={{textDecoration:'none'}}>
            <button className={styles.button} >Details...</button>
        </Link>
      {/* } */}
    </article>
  );
};

export default ProductTemp;
