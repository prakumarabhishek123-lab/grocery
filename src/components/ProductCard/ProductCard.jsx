import React, { useState, useCallback } from 'react';
import styles from './ProductCard.module.css';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart } from 'lucide-react';

/* ── Emoji fallback per category ──────────────────────── */
const CATEGORY_EMOJI = {
  1: '🍪', 2: '🚬', 3: '🧺', 4: '🍫',
  5: '🥤', 6: '🍿', 7: '🥔', 8: '🌾', 9: '🧹',
};

/* ── Discount calculation helper ──────────────────────── */
const getDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

const ProductCard = ({ product }) => {
  const [selectedWeight, setSelectedWeight] = useState(product.weights[0]);
  const [qty, setQty] = useState(0); // 0 = "Add" button shown, >0 = qty stepper shown
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(product.id);

  const currentPrice = product.prices[selectedWeight] ?? 0;
  // Try to estimate an original price for discount badge (20–30% above if badge exists)
  const originalPrice = product.badge && !['18+', 'ESSENTIAL'].includes(product.badge)
    ? Math.round(currentPrice * 1.2)
    : null;
  const discount = getDiscount(currentPrice, originalPrice);

  const showFallback = !product.image || imgError;
  const fallbackEmoji = CATEGORY_EMOJI[product.categoryId] || '🛍️';

  const handleWeightChange = useCallback((w) => {
    setSelectedWeight(w);
    setQty(0); // reset qty on weight change
  }, []);

  const handleAdd = useCallback(() => {
    setQty(1);
    addToCart({ ...product, price: product.prices[selectedWeight] }, 1, selectedWeight);
  }, [product, selectedWeight, addToCart]);

  const handleIncrease = useCallback(() => {
    setQty(q => q + 1);
    addToCart({ ...product, price: product.prices[selectedWeight] }, 1, selectedWeight);
  }, [product, selectedWeight, addToCart]);

  const handleDecrease = useCallback(() => {
    setQty(q => Math.max(0, q - 1));
  }, []);

  return (
    <div className={styles.card}>

      {/* ── Image Area ──────────────── */}
      <div className={styles.imageWrap}>

        {/* Wishlist Button — top-right */}
        <button 
          className={styles.wishlistBtn} 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={isFav ? "#ff4f4f" : "none"} stroke={isFav ? "#ff4f4f" : "#999"} />
        </button>

        {/* Category badge pill — top-left */}
        {product.badge && (
          <span
            className={styles.categoryBadge}
            style={{ backgroundColor: product.badgeColor || '#3a5332' }}
          >
            {product.badge}
          </span>
        )}

        {showFallback ? (
          <div className={styles.fallbackBox}>
            <span className={styles.fallbackEmoji}>{fallbackEmoji}</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
            onError={() => setImgError(true)}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      {/* ── Info Area ────────────────── */}
      <div className={styles.infoArea}>

        {/* Product Name */}
        <h3 className={styles.productName}>{product.title}</h3>

        {/* Weight Pill Selector */}
        {product.weights.length > 1 ? (
          <div className={styles.weightPills}>
            {product.weights.map((w) => (
              <button
                key={w}
                className={`${styles.weightPill} ${selectedWeight === w ? styles.weightActive : ''}`}
                onClick={() => handleWeightChange(w)}
              >
                {w}
              </button>
            ))}
          </div>
        ) : (
          <span className={styles.singleWeight}>{product.weights[0]}</span>
        )}

        {/* Price Row */}
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{currentPrice}</span>
          {originalPrice && (
            <>
              <span className={styles.originalPrice}>₹{originalPrice}</span>
              <span className={styles.discountText}>{discount}% OFF</span>
            </>
          )}
        </div>

        {/* Add to Cart / Qty Stepper */}
        <div className={styles.cartRow}>
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

export default ProductCard;
