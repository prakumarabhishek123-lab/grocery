import React, { useState, useEffect } from 'react';
import styles from './AdPopup.module.css';

const AD_DURATION = 8; // seconds

const AdPopup = () => {
  const [visible,   setVisible]   = useState(true);
  const [countdown, setCountdown] = useState(AD_DURATION);
  const [exiting,   setExiting]   = useState(false);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => setVisible(false), 500);
  };

  useEffect(() => {
    if (!visible) return;
    if (countdown <= 0) { dismiss(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, visible]);

  if (!visible) return null;

  const progress = ((AD_DURATION - countdown) / AD_DURATION) * 100;

  return (
    <div className={`${styles.overlay} ${exiting ? styles.exit : ''}`} onClick={dismiss}>
      <div
        className={`${styles.popup} ${exiting ? styles.popupExit : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bar at top */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {/* Close + countdown */}
        <div className={styles.topBar}>
          <span className={styles.adLabel}>📢 Advertisement</span>
          <button className={styles.closeBtn} onClick={dismiss}>
            {countdown > 0 ? `Skip in ${countdown}s ✕` : '✕ Close'}
          </button>
        </div>

        {/* Store badge */}
        <div className={styles.badge}>🌿 Limited Time Offer</div>

        {/* Main headline */}
        <div className={styles.hero}>
          <h1 className={styles.storeName}>YADUVANSHI</h1>
          <p className={styles.storeSubtitle}>GENERAL STORE · UTRAULA, BALRAMPUR</p>
        </div>

        {/* Offer cards */}
        <div className={styles.offers}>
          <div className={styles.offerCard}>
            <span className={styles.offerIcon}>🛒</span>
            <p className={styles.offerTitle}>Buy 1 Get 1 Free</p>
            <p className={styles.offerDesc}>On all Biscuits this weekend</p>
          </div>
          <div className={styles.offerCard + ' ' + styles.offerCardAccent}>
            <span className={styles.offerIcon}>🥛</span>
            <p className={styles.offerTitle}>Fresh Daily</p>
            <p className={styles.offerDesc}>Milk, bread & essentials every morning</p>
          </div>
          <div className={styles.offerCard}>
            <span className={styles.offerIcon}>🚚</span>
            <p className={styles.offerTitle}>Free Delivery</p>
            <p className={styles.offerDesc}>On orders above Rs. 200 within 5 km</p>
          </div>
        </div>

        {/* CTA row */}
        <div className={styles.ctaRow}>
          <button className={styles.ctaBtn} onClick={dismiss}>
            🛒 Shop Now
          </button>
          <a
            href="https://wa.me/919792472837"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
            onClick={dismiss}
          >
            💬 Order on WhatsApp
          </a>
        </div>

        {/* Footer line */}
        <p className={styles.footerLine}>
          📍 Main Road Utraula, Balrampur (U.P.) &nbsp;|&nbsp; Open 7 AM – 9:30 PM Daily
        </p>
      </div>
    </div>
  );
};

export default AdPopup;
