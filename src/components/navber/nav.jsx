'use client';
import Image from 'next/image';
import './nav.css';
import img from '@/gallary/logo.png';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faGear, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const Navbar = () => {

    const [vissible,setVissible]=useState(true);

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
                            <li>Home</li>
                            <li> 
                            <Link href="/#" className="dropdown-link" style={{color:'white'}}>Catagory
                                <span className="arrow-down"> </span>
                            </Link>
                            <ul className="dropdown-links">
                                <li>
                                    <Link href="/#">Mens Fashion</Link>
                                </li>
                                <li>
                                    <Link href="/#">Women Fashion</Link>
                                </li>
                                <li>
                                    <Link href="/#">Kids</Link>
                                </li>
                                <li>
                                    <Link href="/#">Phone</Link>
                                </li>
                                <li>
                                    <Link href="/#">Laptop</Link>
                                </li>
                                <li>
                                    <Link href="/#">Phone</Link>
                                </li>
                                </ul>
                            </li>
                            <li>Best Seller</li>
                            <li>New Product</li>
                        </ul>
                    </div>

                    <div className="siteItem">
                        <ul className='dropdown2'>
                            <li><FontAwesomeIcon icon={faCartShopping}/></li>
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
                                <li>
                                    <Link href="/#">LogOut</Link>
                                </li>
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