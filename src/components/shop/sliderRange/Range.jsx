// Slider.js
'use client'
import { useState } from 'react';
import styles from './range.module.css';


const SRange = ({ sendData }) => {
    const minRange=0;
    const maxRange=50000;
    const [range, setRange] = useState([10, 10000]);


    const handleSliderChange = (index, value) => {
      if (index === 0) {
        setRange([Math.min(value, range[1] - 1), range[1]]);
      } else {
        setRange([range[0], Math.max(value, range[0] + 1)]);
      }
      sendData(range)
    };
    // console.log(range[0],range[1]);
  
    return (
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <div
            className={styles.tooltip}
            style={{
              left: `${((range[0] - minRange) / (maxRange - minRange)) * 100}%`,
            }}
          >
            {range[0]}
          </div>
          <input
            type="range"
            min={minRange}
            max={maxRange}
            value={range[0]}
            onChange={(e) => handleSliderChange(0, Number(e.target.value))}
            className={`${styles.thumb} ${styles.thumbLeft}`}
          />
          <div
            className={styles.tooltip}
            style={{
              left: `${((range[1] - minRange) / (maxRange - minRange)) * 100}%`,
            }}
          >
            {range[1]}
          </div>
          <input
            type="range"
            min={minRange}
            max={maxRange}
            value={range[1]}
            onChange={(e) => handleSliderChange(1, Number(e.target.value))}
            className={`${styles.thumb} ${styles.thumbRight}`}
          />
          <div className={styles.sliderTrack} />
          <div
            className={styles.sliderRange}
            style={{
              left: `${((range[0] - minRange) / (maxRange - minRange)) * 100}%`,
              right: `${100 - ((range[1] - minRange) / (maxRange - minRange)) * 100}%`,
            }}
          />
        </div>
      </div>
    );
};

export default SRange;
