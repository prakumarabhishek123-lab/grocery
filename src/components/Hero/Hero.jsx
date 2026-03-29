import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { heroData } from '../../data/mockData';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/* ── Floating grocery items ─────────────────────────────────────────────────── */
const FLOATERS = [
  { emoji: '🛒', size: 2.8, delay: 0,    dur: 7,   x: 8,  y: 20 },
  { emoji: '🥛', size: 2.2, delay: 1.2,  dur: 9,   x: 82, y: 15 },
  { emoji: '🍞', size: 2.0, delay: 0.5,  dur: 8,   x: 18, y: 65 },
  { emoji: '🥚', size: 1.8, delay: 2.1,  dur: 10,  x: 88, y: 55 },
  { emoji: '🧴', size: 1.9, delay: 3.0,  dur: 7.5, x: 5,  y: 78 },
  { emoji: '🍎', size: 2.1, delay: 1.7,  dur: 9.5, x: 75, y: 80 },
  { emoji: '🧂', size: 1.7, delay: 0.8,  dur: 8.5, x: 55, y: 10 },
  { emoji: '🫙', size: 2.0, delay: 2.5,  dur: 11,  x: 92, y: 35 },
  { emoji: '🌾', size: 2.3, delay: 1.4,  dur: 8,   x: 42, y: 88 },
  { emoji: '🧹', size: 1.8, delay: 3.5,  dur: 9,   x: 28, y: 8  },
  { emoji: '🍫', size: 1.6, delay: 2.8,  dur: 10,  x: 65, y: 72 },
  { emoji: '🥤', size: 2.0, delay: 0.3,  dur: 7.5, x: 35, y: 45 },
];

/* ── Trust chips ─────────────────────────────────────────────────────────────── */
const CHIPS = [
  { icon: '✅', text: 'Fresh Daily' },
  { icon: '🚚', text: 'Home Delivery' },
  { icon: '💯', text: '100% Genuine' },
  { icon: '⚡', text: 'Fast Service' },
];

/* ── Grocery background video (local file in /public) ───────────────────────── */
const VIDEO_SRC = '/grocery_hero.mp4';

const Hero = () => {
  const revealRef = useScrollReveal();
  const videoRef  = useRef(null);

  /* Ensure autoplay works across browsers / policies */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    const promise = vid.play();
    if (promise !== undefined) {
      promise.catch(() => {
        const resume = () => { vid.play(); };
        document.addEventListener('click', resume, { once: true });
      });
    }
  }, []);

  return (
    <section id="home" className={styles.hero}>

      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        autoPlay
        muted
        loop
        playsInline
        poster={heroData.backgroundImage}
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img src={heroData.backgroundImage} alt="" />
      </video>

      {/* ── Dark gradient overlay ── */}
      <div className={styles.gradientOverlay} />

      {/* ── Floating grocery emojis ── */}
      <div className={styles.floatersLayer} aria-hidden="true">
        {FLOATERS.map((f, i) => (
          <div
            key={i}
            className={styles.floater}
            style={{
              left: `${f.x}%`,
              top:  `${f.y}%`,
              fontSize: `${f.size}rem`,
              animationDelay:    `${f.delay}s`,
              animationDuration: `${f.dur}s`,
            }}
          >
            {f.emoji}
          </div>
        ))}
      </div>

      {/* ── Bokeh orbs ── */}
      <div className={styles.orbs} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      {/* ── Main content ── */}
      <div className={`container ${styles.heroContent}`} ref={revealRef}>

        <p className={`${styles.eyebrow} reveal-fade`}>
          Utraula · Balrampur, U.P.
        </p>

        <div className={styles.textContent}>
          <h1 className={`${styles.headline} reveal-up delay-100`}>
            <span className={styles.shimmerSpan}>YADUVANSHI</span>
            <br />
            <span className={styles.subSpan}>GENERAL STORE</span>
            <br />
            <span className={styles.locationSpan}>
              MAIN ROAD UTRAULA, BALRAMPUR (U.P)
            </span>
          </h1>

          <p className={`${styles.subheadline} reveal-up delay-200`}>
            {heroData.subheadline} — fresh groceries, daily essentials, and more, right at your doorstep.
          </p>
        </div>

        <div className={`${styles.chipRow} reveal-up delay-300`}>
          {CHIPS.map((c, i) => (
            <div key={i} className={styles.chip} style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
              <span>{c.icon}</span>
              <span>{c.text}</span>
            </div>
          ))}
        </div>

        <div className={`${styles.ctaRow} reveal-up delay-400`}>
          <a href={heroData.ctaLink} className={styles.ctaButton}>
            <span className={styles.cartPulse}>🛒</span>
            {heroData.ctaText}
            <span className={styles.ctaArrow}>→</span>
          </a>
          <a href="#about" className={styles.ctaSecondary}>Our Story</a>
        </div>

        <div className={`${styles.openBadge} reveal-fade delay-500`}>
          <span className={styles.greenDot} />
          Open Now · 6 AM – 10 PM
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>

      <div className={styles.bottomFade} />
    </section>
  );
};

export default Hero;
