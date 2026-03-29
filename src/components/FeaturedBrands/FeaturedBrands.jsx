import React from 'react';
import styles from './FeaturedBrands.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Mock list of typical top-tier Indian general store brands
const brandList = [
    "Parle", "Britannia", "Amul", "Surf Excel", "Tata Salt",
    "Aashirvaad", "Haldiram's", "Nestlé", "Coca-Cola", "ITC"
];

const FeaturedBrands = () => {
    const revealRef = useScrollReveal();

    return (
        <section className={styles.brandsSection} ref={revealRef}>
            <div className={`container ${styles.brandsContainer}`}>

                <div className={styles.header}>
                    <p className={`${styles.label} reveal-up delay-100`}>Trusted Partners</p>
                    <h2 className={`${styles.title} reveal-up delay-150`}>Top Quality Brands We Carry</h2>
                </div>

                {/* Marquee or Grid layout for brands */}
                <div className={`${styles.brandGrid} reveal-up delay-300`}>
                    {brandList.map((brand, idx) => (
                        <div key={idx} className={styles.brandBadge}>
                            {brand}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeaturedBrands;
