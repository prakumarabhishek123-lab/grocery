import React, { useState, useMemo, useCallback } from 'react';
import styles from './ShopEssentials.module.css';
import { essentialsCategories, essentialsData } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Heart } from 'lucide-react';

/* ══════════════════════════════════════════════════
   Star Rating
══════════════════════════════════════════════════ */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(i => (
        <span
          key={i}
          className={
            i <= full ? styles.starFull
            : i === full + 1 && half ? styles.starHalf
            : styles.starEmpty
          }
        >★</span>
      ))}
      <span className={styles.ratingNum}>{rating} ({rating >= 4.5 ? 'Top Rated' : 'Good'})</span>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Essential Product Card — Blinkit / Zepto Style
══════════════════════════════════════════════════ */
const EssentialCard = ({ product, onViewDetails }) => {
  const [qty, setQty] = useState(0);
  const [imgErr, setImgErr] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = useCallback((e) => {
    e.stopPropagation();
    setQty(1);
    addToCart({ ...product, price: product.price, weight: product.qty }, 1, product.qty);
  }, [product, addToCart]);

  const handleIncrease = useCallback((e) => {
    e.stopPropagation();
    setQty(q => q + 1);
    addToCart({ ...product, price: product.price, weight: product.qty }, 1, product.qty);
  }, [product, addToCart]);

  const handleDecrease = useCallback((e) => {
    e.stopPropagation();
    setQty(q => Math.max(0, q - 1));
  }, []);

  const showFallback = !product.image || imgErr;

  return (
    <div className={styles.card} onClick={() => onViewDetails && onViewDetails(product)}>

      {/* ── Image Area ───────────────── */}
      <div className={styles.imageWrap}>
        {/* Wishlist Button — top-right */}
        <button 
          className={styles.wishlistBtn} 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={isFav ? "#ff4f4f" : "none"} stroke={isFav ? "#ff4f4f" : "#999"} />
        </button>

        {/* Bestseller / badge — top left */}
        {product.badge && (
          <span className={styles.categoryBadge}>{product.badge}</span>
        )}

        {showFallback ? (
          <div className={styles.fallbackBox}>
            <span className={styles.fallbackEmoji}>{product.emoji}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImg}
            onError={() => setImgErr(true)}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {/* ── Info Area ────────────────── */}
      <div className={styles.infoArea}>
        {/* Category label */}
        <p className={styles.catLabel}>
          {essentialsCategories.find(c => c.key === product.categoryKey)?.label}
        </p>

        {/* Product name */}
        <h4 className={styles.productName}>{product.title}</h4>

        {/* Qty pill */}
        <span className={styles.qtyPill}>{product.qty}</span>

        {/* Star rating */}
        <StarRating rating={product.rating} />

        {/* Price row */}
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>₹{product.originalPrice}</span>
          )}
          {discount && (
            <span className={styles.discountText}>{discount}% OFF</span>
          )}
        </div>

        {/* Add / Qty stepper */}
        <div className={styles.cartRow} onClick={e => e.stopPropagation()}>
          {qty === 0 ? (
            <button className={styles.addBtn} onClick={handleAdd}>
              <span className={styles.addPlus}>+</span>
              <span>Add</span>
            </button>
          ) : (
            <div className={styles.qtyControl}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>−</button>
              <span className={styles.qtyNum}>{qty}</span>
              <button className={styles.qtyBtn} onClick={handleIncrease}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   Main ShopEssentials Section
══════════════════════════════════════════════════ */
const ShopEssentials = ({ onProductSelect }) => {
  const revealRef = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCategory === 'all'
      ? essentialsData
      : essentialsData.filter(p => p.categoryKey === activeCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-asc':  return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating':     return [...list].sort((a, b) => b.rating - a.rating);
      case 'popularity': return [...list].sort((a, b) => b.reviewCount - a.reviewCount);
      default:           return list;
    }
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="essentials" className={styles.section} ref={revealRef}>
      <div className="container">

        {/* Section Header */}
        <div className={`${styles.sectionHeader} reveal-up`}>
          <span className={styles.headerChip}>🛒 Daily Essentials</span>
          <h2 className={styles.sectionTitle}>Shop Essentials</h2>
          <p className={styles.sectionSub}>
            Everything you need for daily life — delivered fresh from your local store.
          </p>
        </div>

        {/* Category Pills */}
        <div className={`${styles.categoryScroll} reveal-up delay-100`}>
          {essentialsCategories.map(cat => (
            <button
              key={cat.key}
              className={`${styles.catPill} ${activeCategory === cat.key ? styles.catActive : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              <span className={styles.catIcon}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search + Sort Bar */}
        <div className={`${styles.filterBar} reveal-up delay-200`}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search essentials…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">✦ Relevance</option>
            <option value="price-asc">↑ Price: Low to High</option>
            <option value="price-desc">↓ Price: High to Low</option>
            <option value="rating">★ Top Rated</option>
            <option value="popularity">🔥 Most Popular</option>
          </select>
        </div>

        {/* Result count */}
        <p className={styles.resultCount}>
          <strong>{filtered.length}</strong> item{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'all' && <> in <em>{essentialsCategories.find(c => c.key === activeCategory)?.label}</em></>}
          {searchQuery && <> matching "<em>{searchQuery}</em>"</>}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((product, idx) => (
              <div key={product.id} className={`reveal-up delay-${Math.min((idx % 5 + 1) * 100, 500)}`}>
                <EssentialCard product={product} onViewDetails={onProductSelect} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noResults}>
            <span className={styles.noResultsIcon}>🔍</span>
            <p className={styles.noResultsTitle}>No products found</p>
            <p className={styles.noResultsSub}>Try a different search term or category</p>
            <button
              className={styles.resetBtn}
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default ShopEssentials;
