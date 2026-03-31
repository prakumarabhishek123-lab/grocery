import React, { useRef } from 'react';
import styles from './Categories.module.css';
import { categoriesData } from '../../data/mockData';

const Categories = ({ setSelectedCategoryId }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="container">
      <section className={styles.categoriesSection}>
      {/* Top blue Flipkart-style banner */}
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <h2 className={styles.bannerTitle}>Shop by Category</h2>
          <span className={styles.bannerSub}>Top picks across all sections</span>
        </div>
        <a
          className={styles.viewAll}
          href="#products"
          onClick={() => setSelectedCategoryId && setSelectedCategoryId(null)}
        >
          View All &rarr;
        </a>
      </div>

      {/* Scrollable category row */}
      <div className={styles.scrollWrapper}>
        <button
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className={styles.categoryList} ref={scrollRef}>
          {categoriesData.map((cat) => (
            <button
              key={cat.id}
              className={styles.categoryCard}
              onClick={() => {
                if (setSelectedCategoryId) {
                  setSelectedCategoryId(cat.id);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {/* Image circle */}
              <div className={styles.imageWrap} style={{ backgroundColor: cat.color }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  className={styles.catImg}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.' + styles.fallbackEmoji).style.display = 'flex';
                  }}
                />
                <span className={styles.fallbackEmoji} role="img" aria-label={cat.name}>
                  {cat.emoji}
                </span>
              </div>

              {/* Category name */}
              <p className={styles.catName}>{cat.name}</p>

              {/* Offer pill — Flipkart style */}
              <span className={styles.offerPill} style={{ color: cat.textColor }}>
                {cat.offer}
              </span>
            </button>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => scroll(1)}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      {/* Bottom separator like Flipkart */}
      <div className={styles.divider} />
    </section>
    </div>
  );
};

export default Categories;
