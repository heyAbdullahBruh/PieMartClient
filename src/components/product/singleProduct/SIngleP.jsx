'use client';
import { api } from '@/config/api';
import { useEffect, useState } from 'react';
import ImageSlider from './imageSlider/ImageSlide';
import styles from './sprod.module.css';
import Link from 'next/link';
import ProductTemp from '@/components/product/ProductTemp/ProductTemp';

const SIngleP = ({productId}) => {

    const [product,setProduct]=useState({});
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');

    useEffect(()=>{
        fetch(`${api}/product/${productId}`)
        .then(res=>res.json())
        .then((res)=>{
            if (res.success==true) {
                setProduct(res.product);
                setLoading(false);
                setError('');
            } else {
                setLoading(false);
                setError(req.message);
            };
        }).catch(err=>setError(err.message));
    },[productId]);

    const {pName,pDesc,brand,catagory,price,averageRat,pImgs}= product;

    const [brandP,setBrandP]=useState([]);
        useEffect(()=>{
            fetch(`${api}/product/brand/${brand}`)
            .then(res=>res.json())
            .then((res)=>{
                if (res.success==true) {
                    setBrandP(res.products);
                    setLoading(false);
                    setError('');
                } else {
                    setLoading(false);
                    setError(req.message);
                };
            }).catch(err=>setError(err.message));
        },[brand]);

    return (
        <>
            {
                loading ? <p>Loading...</p>: error ? <h3 style={{color:'red'}}>{error}</h3>:
                 <>
                    <section className={styles.sProd}>
                
                        <div className={styles.sProdSec}>
                            <div className={styles.spGallary}>
                                <ImageSlider images={pImgs?pImgs:[]}/>
                            </div>
                            
                            <div className={styles.spDetail}>
                                <h3>{pName}</h3>
                                <p style={{fontSize:'.8rem',textAlign:'justify',color:'#aaaaaa'}}>{pDesc} </p>
                                <h4 style={{fontSize:'.7rem',color:'#00f84a'}}>Brnad : {brand} </h4>
                                <h5 style={{color:'#00f7ffd5' }}>Rating : {averageRat}/5</h5>
                                <p style={{fontSize:'.7rem',color:'#aaaaaa'}}>Catagory : <Link href={`/product/catagory/${catagory}`}>{catagory}</Link> </p>
                                <h4>Price : ${price} </h4>
                            </div>
                        </div>
                        <button className={styles.atcBtn}>Add To Cart</button>
                    </section><hr />
                    <section className={styles.smbProd}>

                        <div className={styles.smbHeader}>
                            <p>Similer brand Products</p>
                        </div>

                        <div className={styles.smbProds}>
                            {brandP?.filter(p=>p._id!==productId).slice(0,4).map(p => (
                                <ProductTemp key={p._id} product={p} />
                            ))}
                        </div>
                        
                        <div className={styles.showMoreBtn}>
                            <Link href={`/product/brandP/${brand}`}><button>Show More Products</button></Link>
                        </div>

                    </section>
                 </>
            }
        </>
    );
};

export default SIngleP;