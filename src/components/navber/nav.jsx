'use client';
import Image from 'next/image';
import './nav.css';
import img from '@/gallary/logo.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGear, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import {useState } from 'react';
import {useCart } from '../cart/cartContext';
const Navbar = () => {

    const [vissible,setVissible]=useState(true);
    const {cart,token}=useCart();
    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      };
    
      const handleDeleteCookie = () => {
        deleteCookie('token');
        alert('Cookie deleted!');
        location.reload();
      };
    // console.log(token);
    return (
        <>
            <nav className='navber'>
                <div className="hamburger4" >
                    <input type="checkbox" id="hamburger4-input" />
                    <label htmlFor="hamburger4-input">
                        <div className="hamburger4-lines" onClick={()=>setVissible(!vissible)} >
                            <span></span>
                            <span></span>
                        </div>
                    </label>
                </div>

                {
                    vissible===true&&
                    <section className="navSec">
                    <div className="logo">
                        <Link href={'/'}>
                            <Image src={img} height={50} width={200} style={{borderRadius:'1rem',margin:'1rem'}} alt='pimartLogo'/>
                        </Link>
                    </div>

                    <div className="userItem">
                        <ul className='dropdown'>
                            <li><Link href={'/'}>Home</Link></li>
                            <li><Link href={'/product/best-seller'}>Best Seller</Link> </li>
                            <li><Link href={'/product/new-product'}>New Product</Link> </li>
                            <li><Link href={'/product/shop'}>Shop</Link> </li>
                            <li> 
                            <Link href="/#" className="dropdown-link" style={{color:'white'}}>Catagory
                                <span className="arrow-down"> </span>
                            </Link>
                            <ul className="dropdown-links">
                                <li>
                                    <Link href="/product/catagory/mens">Mens Fashion</Link>
                                </li>
                                <li>
                                    <Link href="/product/catagory/women">Women Fashion</Link>
                                </li>
                                <li>
                                    <Link href="/product/catagory/kids">Kids</Link>
                                </li>
                                <li>
                                    <Link href="/product/catagory/headphone">Headphone</Link>
                                </li>
                                <li>
                                    <Link href="/product/catagory/laptop">Laptop</Link>
                                </li>
                                <li>
                                    <Link href="/product/catagory/phone">Phone</Link>
                                </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </div>

                    <div className="siteItem">
                        <ul className='dropdown2'>
                            <li>
                                <Link href={'/cart'} className='cartLink'>
                                    <FontAwesomeIcon icon={faCartShopping}/>
                                    <span>{cart.length}</span>
                                </Link>
                            </li>
                            <li>
                            <Link href="/#" className="dropdown2-link" style={{color:'white'}}>
                                <FontAwesomeIcon icon={faGear}/>
                            </Link>
                                <ul className="dropdown2-links">
                                <li>
                                    <Link href="/#"><FontAwesomeIcon icon={faUserAlt}/></Link>
                                </li>
                                <li>
                                    <Link href="/#">Become A Seller</Link>
                                </li>
                                <li>
                                    <Link href="/#">Create Product</Link>
                                </li>
                                <li>
                                    <Link href="/#">Setting</Link>
                                </li>
                                <li>
                                    <Link href="/#">Terms</Link>
                                </li>
                                <li>
                                    <Link href="/#">About US</Link>
                                </li>
                                <li>
                                    <Link href="/#">Contact US</Link>
                                </li>
                                    {
                                    token&& <li><button style={{cursor:'pointer'}} onClick={handleDeleteCookie}>LogOut</button></li> 
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                    </section>
                }
            </nav>
        </>
    );
};

export default Navbar;