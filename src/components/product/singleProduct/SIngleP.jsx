'use client';
import { api } from '@/config/api';
import { useEffect, useState } from 'react';
import ImageSlider from './imageSlider/ImageSlide';
import styles from './sprod.module.css';
import Link from 'next/link';
import ProductTemp from '@/components/product/ProductTemp/ProductTemp';
import AddToCart from '@/components/cart/addtoCart/AddToCart';
import { useCart } from '@/components/cart/cartContext';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '@/components/order/orderContext';
import DeleteProduct from '../deleteProduct/DeleteProduct';

const SIngleP = ({productId}) => {
    const router =useRouter();

    const [product,setProduct]=useState({});
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState('');

    const {cart,token}=useCart();
    const {user}=useOrder();

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
                setError(res.message);
            };
        }).catch(err=>setError(err.message));
    },[productId]);

    const {pName,pDesc,brand,catagory,price,averageRat,pImgs,_id,adminId}= product;

    const [brandP,setBrandP]=useState([]);
        useEffect(()=>{
            if (brand) {
                fetch(`${api}/product/brand/${brand}`)
                .then(res=>res.json())
                .then((res)=>{
                    if (res.success==true) {
                        setBrandP(res.products);
                        setLoading(false);
                        setError('');
                    } else {
                        setLoading(false);
                    };
                }).catch(err=>setError(err.message));
            }
        },[brand]);

    return (
        <>
            {
                loading ? <p>Loading...</p>: error ? <h3 style={{color:'red'}}>{error}</h3>:
                 <>
                    <section className={styles.sProd}>

                        {
                            user._id===adminId && 
                            <div className={styles.prodAction}>
                                <Link href={`/product/update/${_id}`}><button> <FontAwesomeIcon icon={faPencil}/> Edit </button></Link>
                                <DeleteProduct id={_id} token={token}/>
                            </div>
                        }

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
                        {
                            token?
                            <>
                                {
                                    cart.find((c)=>c.product===productId)?<button className={styles.gtcBtn} onClick={()=>router.replace('/cart')} >Go To Cart</button>
                                    :<AddToCart token={token} productId={product._id}/>
                                }
                            </>:<p style={{color:'yellow'}}>Plesae first login . Then products add in your cart.</p>
                        }
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