import React from 'react';
import styles from './StoreLocation.module.css';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const StoreLocation = () => {
    const revealRef = useScrollReveal();

    return (
        <section className={styles.locationSection} id="contact" ref={revealRef}>
            <div className={`container ${styles.locationContainer}`}>

                <div className={`${styles.infoSide} reveal-up`}>
                    <p className={styles.eyebrow}>Visit Us</p>
                    <h2 className={styles.title}>Your Local General Store</h2>

                    <div className={styles.detailBlock}>
                        <h4>Store Address</h4>
                        <p>Yaduvanshi General Store</p>
                        <p>Main Road Padhari Nath</p>
                        <p>Balrampur (U.P) - 271604</p>
                    </div>

                    <div className={styles.detailBlock}>
                        <h4>Opening Hours</h4>
                        <p>Monday - Sunday</p>
                        <p className={styles.highlightText}>07:00 AM - 09:30 PM</p>
                    </div>

                    <div className={`${styles.contactBlock} reveal-up delay-200`}>
                        <h4>Got Questions?</h4>
                        <a href="tel:+919792472837" className={styles.contactLink}>📞 +91 9792472837</a>
                        <a href="https://wa.me/919792472837" target="_blank" rel="noreferrer" className={styles.contactLink}>💬 WhatsApp Us</a>
                    </div>
                </div>

                {/* Real Google Maps Embed */}
                <div className={`${styles.mapSide} reveal-left delay-150`}>
                    <div className={styles.mapWrapper}>
                        <iframe
                            title="Padhari Nath, Balrampur"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.0!2d82.1800!3d27.4200!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a07e83f9d9c8f%3A0x4f22e57aa7c7a3de!2sPadhari%20Nath%2C%20Balrampur%2C%20Uttar%20Pradesh%20271604!5e0!3m2!1sen!2sin!4v1710000000000"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        <a
                            href="https://www.google.com/maps/search/?api=1&query=Padhari+Nath+Balrampur+Uttar+Pradesh"
                            target="_blank"
                            rel="noreferrer"
                            className={styles.directionsBtn}
                        >
                            📍 Get Directions
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StoreLocation;
