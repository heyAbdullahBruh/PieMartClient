'use client';
import styles from './bsProds.module.css';
import { api } from "@/config/api";
import { useEffect, useState } from "react";
import Link from 'next/link';
import ProductTemp from '@/components/product/ProductTemp/ProductTemp';


const BSProduct = ({endP,showP}) => {

    const [product,setProduct]=useState([]);

    const [errorM,setErrorM]=useState('');

    useEffect(()=>{
        fetch(`${api}/products`,{cache:'no-store'})
        .then(res=>res.json())
        .then((res)=>{
            if (res.success) {
                setProduct(res.products);
            } else {
                setErrorM(res.message);
            };
        })

    },[]);
    console.log(errorM);
    // console.log(product);
    return (
        <section className={styles.bSProductSec}>

            <div className={styles.bsHeader}>
                <h1>Best Selling Products</h1>
            </div>

            <div className={styles.bsProds}>
                {product?.slice(0,endP).map(p => (
                    <ProductTemp key={p._id} product={p} />
                ))}
            </div>
            {
             showP&&
             <div className={styles.showMoreBtn}>
                 <Link href={'/product/best-seller'}><button>Show More Products</button></Link>
             </div>
            }
            
        </section>
    );
};

export default BSProduct;