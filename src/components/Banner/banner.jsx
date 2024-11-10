// components/ImageSlider.js
'use client';
import { useState, useEffect } from 'react';
import styles from './banner.module.css';
import Link from 'next/link';

const slides = [
  {
    image: 'https://i.postimg.cc/kXcmmz2r/perfumebanner.png',
    title: 'Arabia agore wood perfume',
    description: 'Autem ab temporibus minus eligendi sit! Provident ipsa, blanditiis ipsum quidem officia ut magni, culpa deleniti voluptatibus tempore quod impedit.',
    discount:'30%',
  },
  {
    image: 'https://i.postimg.cc/bvGc1v38/laptopbanner.png',
    title: 'Mackbook air pro 15inch',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quod est voluptas tempore recusandae assumenda. Pariatur, vel. Esse optio libero.',
    discount:'40%',
  },
  {
    image: 'https://i.postimg.cc/FHCXfSbD/Black-White-Bold-Fashion-Product-Promotion-Landscape-Banner.png',
    title: 'Digital apple touch watch',
    description: 'Autem ab temporibus minus eligendi sit! Provident ipsa, blanditiis ipsum quidem officia ut magni, culpa deleniti voluptatibus tempore quod impedit.',
    discount:'20%',
  },
  {
    image: 'https://i.postimg.cc/yxHMqyBY/headphonebanner.png',
    title: 'Oppo digital smart stylish headphone',
    description: 'blanditiis ipsum quidem officia ut tempore quod impedit. Nesciunt quod est voluptas tempore recusandae assumenda. Pariatur, vel. Esse optio libero,',
    discount:'25%',
  },
  // Add more slides as needed
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(goToNext, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  
    return (
        <section className={styles.banner}>
            {/* banner section  */}
            
            <div className={styles.bannerImg}>
                <Link href={'#'}><button>Go to shop</button></Link>
            </div>

            {/*product Image Slider*/}
            <div className={styles.slider}>
                    <div
                    className={styles.slideContainer}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                    {slides.map((slide, index) => (
                        <div
                        key={index}
                        className={styles.slide}
                        style={{ backgroundImage: `url(${slide.image})` }}
                        >
                        <div className={styles.overlay}>
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <h1>  {slide.discount} discount in this type product.!</h1>
                            <Link href={'#'}>
                                <button>Go to shop</button>
                            </Link>
                        </div>
                        </div>
                    ))}
                </div>
                <button className={styles.prevButton} onClick={goToPrevious}>
                &#10094;
                </button>
                <button className={styles.nextButton} onClick={goToNext}>
                &#10095;
                </button>
            </div>

        </section>
    );
};

export default Banner;