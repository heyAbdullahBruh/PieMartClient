'use client';
import styles from './cata.module.css';
import { api } from "@/config/api";
import { useEffect, useState } from "react";
import ProductTemp from "../ProductTemp/ProductTemp";
// import Link from "next/link";

const CataProduct = ({catagory,endP}) => {

    const [product,setProduct]=useState([]);

    const [errorM,setErrorM]=useState('');

    useEffect(()=>{
        fetch(`${api}/product/catagory/${catagory}`,{cache:'no-store'})
        .then(res=>res.json())
        .then((res)=>{
            if (res.success) {
                setProduct(res.products);
            } else {
                setErrorM(res.message);
            };
        })

    },[catagory]);
    console.log(errorM);

    return (
        <section className={styles.cataProductSec}>

            {
                product?.length >0 ? 
                <>
                    <div className={styles.cataHeader}>
                        <h1>{catagory?.toUpperCase()} Catagory's Products</h1>
                    </div>

                    <div className={styles.cataProds}>
                        {product?.slice(0,endP).map(p => (
                            <ProductTemp key={p._id} product={p} />
                        ))}
                    </div>
                </>: <h1 style={{color:'red',height:'20vh'}}>{errorM}</h1>
            }

        </section>
    );
};

export default CataProduct;