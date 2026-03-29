import React from 'react';
import styles from './StoreValues.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const stats = [
  { value: '30+', label: 'Years of Service', icon: '🏪' },
  { value: '5000+', label: 'Happy Families', icon: '👨‍👩‍👧‍👦' },
  { value: '500+', label: 'Products', icon: '🛒' },
  { value: '100%', label: 'Quality Promise', icon: '⭐' },
];

const highlights = [
  { icon: '🤝', text: 'Trusted by Utraula locals for generations' },
  { icon: '🚚', text: 'Fast delivery within 5 km radius' },
  { icon: '💰', text: 'Best prices, no compromise on quality' },
];

const StoreValues = () => {
    const revealRef = useScrollReveal();

    return (
        <section className={styles.valuesSection} id="about" ref={revealRef}>
            <div className={`container ${styles.valuesContainer}`}>

                <div className={`${styles.textContent} reveal-up`}>
                    <p className={styles.eyebrow}>Our Heritage</p>
                    <h2 className={styles.title}>Rooted in Balrampur since 1995</h2>
                    <p className={styles.description}>
                        What started as a small corner shop in Chhata has grown into your trusted neighborhood
                        market. We offer a wide assortment of daily groceries, fresh produce,
                        and premium specialty items that cater to your family's everyday needs.
                    </p>

                    <div className={styles.features}>
                        <div className={`${styles.featureItem} reveal-up delay-150`}>
                            <div className={styles.iconCircle}>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                            </div>
                            <div className={styles.featureText}>
                                <h4>Guaranteed Quality</h4>
                                <p>Curated selection of top brands</p>
                            </div>
                        </div>

                        <div className={`${styles.featureItem} reveal-up delay-300`}>
                            <div className={styles.iconCircle}>
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                            </div>
                            <div className={styles.featureText}>
                                <h4>Fast Local Delivery</h4>
                                <p>Within a 5km radius</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Community card */}
                <div className={`${styles.communityCard} reveal-left delay-200`}>
                    <div className={styles.communityHeader}>
                        <span className={styles.communityBadge}>🌿 Community First</span>
                        <h3 className={styles.communityTitle}>Serving the Community</h3>
                        <p className={styles.communitySubtitle}>
                            More than a store — a neighbour you can count on every day.
                        </p>
                    </div>

                    {/* Stats grid */}
                    <div className={styles.statsGrid}>
                        {stats.map((s, i) => (
                            <div key={i} className={styles.statItem}>
                                <span className={styles.statIcon}>{s.icon}</span>
                                <span className={styles.statValue}>{s.value}</span>
                                <span className={styles.statLabel}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Highlights */}
                    <div className={styles.highlights}>
                        {highlights.map((h, i) => (
                            <div key={i} className={styles.highlightRow}>
                                <span className={styles.highlightIcon}>{h.icon}</span>
                                <span className={styles.highlightText}>{h.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.decorativeDots}>
                        {[...Array(6)].map((_, i) => <span key={i} className={styles.dot} />)}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StoreValues;
