'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.css';
import { faBank, faCreditCardAlt, faEarthAsia, faRotateLeft, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { faCcMastercard, faCcPaypal, faCcVisa, faFacebookSquare, faInstagramSquare, faTwitter, faWhatsappSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {

    const year =new Date();

    return (
       
        <footer>
            <hr />
            <div className="footer-middle">
                <div className="footer-column">
                    <h5>Get to Know Us</h5>
                    <ul>
                        <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">News & Blog</Link></li>
                        <li><Link href="#">Careers</Link></li>
                        <li><Link href="#">Investors</Link></li>
                        <li><Link href="#">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h5>Customer Service</h5>
                    <ul>
                        <li><Link href="#">Help Center</Link></li>
                        <li><Link href="#">FAQ's</Link></li>
                        <li><Link href="#">Accessibility</Link></li>
                        <li><Link href="#">Feedback</Link></li>
                        <li><Link href="#">Size Guide</Link></li>
                        <li><Link href="#">Payment Method</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h5>Orders & Returns</h5>
                    <ul>
                        <li><Link href="#">Track Order</Link></li>
                        <li><Link href="#">Shipping & Delivery</Link></li>
                        <li><Link href="#">Return & Exchange</Link></li>
                        <li><Link href="#">Price Match Guarantee</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h5>Legal</h5>
                    <ul>
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Terms of Use</Link></li>
                        <li><Link href="#">Legal</Link></li>
                        <li><Link href="#">Site Map</Link></li>
                    </ul>
                </div>
                <div className="newsletter">
                    <h5>Let's keep in touch</h5>
                    <p>Subscribe for newsletter</p>
                    <input type="email" placeholder="Enter your email address" />
                    <button>Subscribe</button>
                </div>
                
            </div>
            <div className="footer-bottom">
                <p><span style={{fontSize:'2rem'}}>&copy;</span>{year.getFullYear()} PieMart, All rights reserved.</p>
                <div className="social-media">
                    <div className="social-icons">
                        <Link href="#"><FontAwesomeIcon className='Sicon' icon={faTwitter}/></Link>
                        <Link href="#"><FontAwesomeIcon className='Sicon' icon={faFacebookSquare}/></Link>
                        <Link href="#"><FontAwesomeIcon className='Sicon' icon={faYoutubeSquare}/></Link>
                        <Link href="#"><FontAwesomeIcon className='Sicon' icon={faInstagramSquare}/></Link>
                        <Link href="#"><FontAwesomeIcon className='Sicon' icon={faWhatsappSquare}/></Link>
                    </div>
                </div>
                <div className="payment-icons">
                    <FontAwesomeIcon className='Picon' icon={faBank}/>
                    <FontAwesomeIcon className='Picon' icon={faCcVisa}/>
                    <FontAwesomeIcon className='Picon' icon={faCcMastercard}/>
                    <FontAwesomeIcon className='Picon' icon={faCcPaypal}/>
                </div>
            </div>
        </footer>
       
    );
};

export default Footer;
