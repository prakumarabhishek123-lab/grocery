import React from 'react';
import styles from './AboutStore.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const AboutStore = () => {
  const revealRef = useScrollReveal();

  return (
    <section id="about" className={`section ${styles.aboutSection}`} ref={revealRef}>
      <div className={`container ${styles.aboutContainer}`}>

        <div className={`${styles.imageWrapper} reveal-up`}>
          <img
            src="/about_store_image.png"
            alt="Fresh products at Yaduvanshi General Store"
            className={styles.aboutImage}
            loading="lazy"
          />
          <div className={styles.imageOverlay}></div>
        </div>

        <div className={`${styles.textContent} reveal-up delay-150`}>
          <p className={styles.subtitle}>Welcome to</p>
          <h2 className={styles.title}>Yaduvanshi General Store</h2>

          <p className={styles.description}>
            We are your one-stop shop for premium groceries, fresh produce, and high-quality household essentials. Located in the heart of Padhari Nath, Balrampur, our mission is to provide you with the freshest ingredients and top-tier products for your daily needs.
          </p>

          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <div>
                <h4>Premium Quality Guaranteed</h4>
                <p>We source only the best products for your family.</p>
              </div>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <div>
                <h4>Fresh Daily Produce</h4>
                <p>Hand-picked organic fruits and vegetables arriving every morning.</p>
              </div>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.checkIcon}>✓</span>
              <div>
                <h4>Friendly Community Service</h4>
                <p>A neighborhood market where every customer is treated like family.</p>
              </div>
            </li>
          </ul>

          <button className={styles.learnMoreBtn}>Read Our Story</button>
        </div>

      </div>
    </section>
  );
};

export default AboutStore;
