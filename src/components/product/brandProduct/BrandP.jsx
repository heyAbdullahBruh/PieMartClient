'use client';
import styles from './bprods.module.css';
import { api } from "@/config/api";
import { useEffect, useState } from "react";
import ProductTemp from '@/components/product/ProductTemp/ProductTemp';
// import Link from 'next/link';


const BrandProduct = ({endP,brand}) => {

    const [product,setProduct]=useState([]);

    const [errorM,setErrorM]=useState('');

    useEffect(()=>{
        fetch(`${api}/product/brand/${brand}`)
        .then(res=>res.json())
        .then((res)=>{
            if (res.success) {
                setProduct(res.products);
            } else {
                setErrorM(res.message);
            };
        })

    },[brand])
    console.log(errorM);
    // console.log(product);
    return (
        <section className={styles.bProductSec}>

            <div className={styles.bpHeader}>
                <h1>{brand.toLocaleUpperCase()} Brand Products</h1>
            </div>

            <div className={styles.bProds}>
                {product?.slice(0,endP).map(p => (
                    <ProductTemp key={p._id} product={p} />
                ))}
            </div>

            {/* {
             showP&&
             <div className={styles.showMoreBtn}>
                 <Link href={'/product/new-product'}><button>Show More Products</button></Link>
             </div>
            } */}
        </section>
    );
};

export default BrandProduct;