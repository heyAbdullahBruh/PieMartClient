'use client';
import styles from './bsProds.module.css';
import { api } from "@/config/api";
import { useEffect, useState } from "react";
import ProductTemp from "../ProductTemp/ProductTemp";
import Link from 'next/link';


const BSProduct = () => {

    const [product,setProduct]=useState([]);

    const [errorM,setErrorM]=useState('');

    useEffect(()=>{
        fetch(`${api}/products`)
        .then(res=>res.json())
        .then((res)=>{
            if (res.success) {
                setProduct(res.products);
            } else {
                setErrorM(res.message);
            };
        })

    },[])
    console.log(errorM);
    console.log(product);
    return (
        <section className={styles.bSProductSec}>

            <div className={styles.bsHeader}>
                <h1>Best Selling Products</h1>
            </div>

            <div className={styles.bsProds}>
                {product?.map(p => (
                    <ProductTemp key={p._id} product={p} />
                ))}
            </div>

            <div className={styles.showMoreBtn}>
                <Link href={'#'}><button>Show More Products</button></Link>
            </div>
        </section>
    );
};

export default BSProduct;