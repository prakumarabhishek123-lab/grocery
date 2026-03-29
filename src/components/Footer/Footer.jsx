import React from 'react';
import styles from './Footer.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const Footer = () => {
  const revealRef = useScrollReveal();

  return (
    <footer id="contact" className={styles.footer} ref={revealRef}>
      <div className={`container`}>
        <div className={`${styles.footerGrid} reveal-up`}>

          {/* Brand column */}
          <div className={styles.brandCol}>
            <h2 className={styles.brandName}>YADUVANSHI</h2>
            <p className={styles.brandTagline}>
              Your trusted neighbourhood general store since 1995. Fresh groceries, 
              daily essentials, and premium goods — always at honest prices.
            </p>
            <span className={styles.rewardsBadge}>
              Yaduvanshi Rewards | Upto 100% Off →
            </span>
          </div>

          {/* Contact column */}
          <div>
            <p className={styles.footerColTitle}>Contact Us</p>
            <div className={styles.footerLinks}>
              <a href="tel:+919792472837" className={styles.footerLink}>
                📞 +91 9792472837
              </a>
              <a
                href="https://wa.me/919792472837"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                💬 WhatsApp: +91 9792472837
              </a>
              <span className={styles.footerText}>
                📍 Main Road Padhari Nath, Balrampur (U.P) — 271604
              </span>
            </div>
          </div>

          {/* Hours column */}
          <div>
            <p className={styles.footerColTitle}>Store Hours</p>
            <div className={styles.footerLinks}>
              <span className={styles.footerText}>Monday – Sunday</span>
              <span className={styles.footerText}>07:00 AM – 09:30 PM</span>
              <a href="#home" className={styles.footerLink} style={{ marginTop: 12 }}>
                ↑ Back to Top
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © 2025 Yaduvanshi General Store. All rights reserved.
          </p>
          <div className={styles.footerBottomLinks}>
            <a href="#about" className={styles.footerBottomLink}>About</a>
            <a href="#products" className={styles.footerBottomLink}>Products</a>
            <a href="#contact" className={styles.footerBottomLink}>Contact</a>
          </div>
        </div>
      </div>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/919792472837"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
