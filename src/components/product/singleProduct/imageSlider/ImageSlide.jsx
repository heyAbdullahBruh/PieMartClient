// components/ImageSlider.js
import { useState } from 'react';
import styles from './ims.module.css';


export default function ImageSlider({images}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.sliderContainer}>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((i,index) => (
          <div
            key={i.imgId}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          >
            <img src={i.photo} alt={i.imgId} />
          </div>
        ))}
      </div>
      <button className={styles.prevButton} onClick={handlePrev}>
      &#10094;
      </button>
      <button className={styles.nextButton} onClick={handleNext}>
      &#10095;
      </button>
    </div>
  );
};
