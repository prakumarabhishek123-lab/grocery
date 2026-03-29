import React from 'react';
import styles from './FeaturesBanner.module.css';
import { bannerMarqueeItems } from '../../data/mockData';

const FeaturesBanner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.marquee}>
        {/* Duplicate the items to create a seamless infinite scroll effect */}
        {[...bannerMarqueeItems, ...bannerMarqueeItems].map((item, index) => (
          <span key={index} className={styles.marqueeItem}>
            {item}
            {index % 2 === 0 ? <button className={styles.shopBtn}>Shop Now</button> : null}
            {/* Adding a small decorative dot or icon separating items if desired */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FeaturesBanner;
