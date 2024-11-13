'use client'
import Link from 'next/link';
import './oTopic.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCardAlt, faEarthAsia, faRotateLeft, faShoppingCart, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Counter = ({ end, text }) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let start = 0;
      const duration = 2000; // duration in milliseconds
      const increment = end / (duration / 50);
  
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.ceil(start));
        }
      }, 50);
  
      return () => clearInterval(counter);
    }, [end]);
  
    return (
      <div className="counter-item">
        <h2>{count}+</h2>
        <p>{text}</p>
      </div>
    );
  };


const OTopic = () => {


    return (
        <section className='topics'>
            <div className="overview">
                <div className="ovDesc">
                    <h1>Lorem ipsum dolor consectetur</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus sequi fugiat fugit eos veritatis modi natus animi asperiores laboriosam explicabo dolorum tenetur ab aperiam laudantium molestias neque nihil in dolores hic, id voluptas laborum consectetur! At libero fuga ipsam porro corrupti similique necessitatibus unde veniam. Reiciendis, quas repellat deleniti velit dolores quia delectus quis, earum est temporibus cupiditate. Ab enim dolorum qui odio iusto repudiandae quidem fuga minus tempora deleniti, esse ipsum? Dolores praesentium at laborum maiores alias cupiditate numquam temporibus ratione! Labore in nobis molestiae delectus quod perspiciatis quasi et perferendis quaerat, alias nemo, vero tenetur quam quo tempora incidunt unde, impedit vitae deleniti Ab enim dolorum qui odio iusto repudiandae quidem fuga minus tempora deleniti, esse ipsum? Dolores praesentium at laborum maiores alias cupiditate numquam temporibus ratione! Labore in.</p>
                </div>
                <div className="ovPic">
                    <img src="https://i.postimg.cc/6qqmxjgK/nBanner.png" alt="overviewImg" />
                </div>
            </div>

            <div className="serv">
                <div className="servimg">
                    <img src="https://i.postimg.cc/mgMFBKcS/services.png" alt="servImg" />
                </div>
                <div className="servDesc">
                    <h1>We Deal with various quality Products.!</h1>
                    <div className="servList">
                        <ul>
                            <li>Fast Delivary</li>
                            <li>Quality Product</li>
                            <li>Ipsum dolor sit.</li>
                            <li>Lorem ipsum dolor.</li>
                            <li>Sit praesen lorem</li>
                        </ul>
                        <ul>
                            <li>Dolor Lorem ipsum</li>
                            <li>Lorem ipsum dolor.</li>
                            <li>Dolores praesen laboru</li>
                            <li>Dolor dolores sit.</li>
                            <li>Laboru Lorem ipsum</li>
                        </ul>
                    </div>
                    <div className="servLink">
                        <Link href={'/shop'}><button><FontAwesomeIcon icon={faShoppingCart}/> Start Shopping</button></Link>
                    </div>
                </div>
            </div>
            
            <div className="offerImg">
                <img src="https://i.postimg.cc/q7PmVF96/offer.png" alt="offerImage" />
            </div>

            <div className="footer-top">
                <div className="footer-icon-section">
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faEarthAsia}/>
                        <h4>Worldwide Delivery</h4>
                        <p>200 countries and regions worldwide</p>
                    </div>
                    <div className="icon-item">
                         <FontAwesomeIcon icon={faCreditCardAlt}/>
                        <h4>Secure Payment</h4>
                        <p>Pay with popular and secure payment methods</p>
                    </div>
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faRotateLeft}/>
                        <h4>60-day Return Policy</h4>
                        <p>Merchandise must be returned within 60 days</p>
                    </div>
                    <div className="icon-item">
                        <FontAwesomeIcon icon={faUserGear}/>
                        <h4>24/7 Help Center</h4>
                        <p>{'We’ll'} respond to you within 24 hours</p>
                    </div>
                </div>
            </div>

            <div className="statistics">
                <h1>Numbers Speak For Themselves!</h1>
                <div className="counters">
                    <Counter end={4888} text="Curated Products" />
                    <Counter end={351} text="Curated Products" />
                    <Counter end={17} text="Product Categories" />
                    <Counter end={5000} text="Vendors" />
                </div>
            </div>

        </section>
    );
};

export default OTopic;