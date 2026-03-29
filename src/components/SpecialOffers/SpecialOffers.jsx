import React from 'react';
import styles from './SpecialOffers.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { productsData } from '../../data/mockData';
import ProductCard from '../ProductCard/ProductCard';

const SpecialOffers = ({ setSelectedCategoryId }) => {
    const revealRef = useScrollReveal();

    // Just grabbing the first two products to showcase as hot deals for now
    const specialDeals = productsData.slice(0, 2);

    return (
        <section className={`section ${styles.offersSection}`} ref={revealRef}>
            <div className={`container ${styles.offersContainer}`}>

                {/* Banner area */}
                <div
                    className={`${styles.banner} reveal-left delay-100`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        if (setSelectedCategoryId) {
                            setSelectedCategoryId(1); // Category 1 is Biscuits
                            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <div className={styles.bannerContent}>
                        <span className={styles.badge}>Weekend Special</span>
                        <h2 className={styles.headline}>Buy 1 Get 1 Free on all Biscuits</h2>
                        <p className={styles.subheadline}>Stock up for your evening chai with our premium range of Parle, Britannia, and local favorites.</p>
                        <button className={styles.claimBtn}>Shop Now</button>
                    </div>
                    {/* Decorative graphic matching the brand's aesthetic */}
                    <div className={styles.graphicOverlay}></div>
                </div>

                {/* Highlighted Deals Grid */}
                <div className={`${styles.dealsGrid} reveal-right delay-200`}>
                    {specialDeals.map((product) => (
                        <div key={product.id} className={styles.dealCard}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SpecialOffers;
