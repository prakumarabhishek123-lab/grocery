import React, { useState } from 'react';
import styles from './ProductModal.module.css';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { Heart } from 'lucide-react';
import { essentialsData, essentialsCategories } from '../../data/mockData';

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= full ? styles.starFull : (i === full + 1 && half ? styles.starHalf : styles.starEmpty)}>★</span>
      ))}
    </div>
  );
};

const ProductModal = ({ product, onClose }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart, setCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isFav = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const categoryLabel = essentialsCategories.find(c => c.key === product.categoryKey)?.label || product.categoryKey;
  const related = essentialsData.filter(p => p.categoryKey === product.categoryKey && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart({ ...product, weight: product.qty }, qty, product.qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      setCartOpen(true);
    }, 1000);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        <div className={styles.modalBody}>
          {/* Image panel */}
          <div className={styles.imagePanel} style={{ background: product.bgColor || '#f4ede2' }}>
            <button 
              className={styles.wishlistBtn} 
              onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
              aria-label="Toggle wishlist"
            >
              <Heart size={22} fill={isFav ? "#ff4f4f" : "none"} stroke={isFav ? "#ff4f4f" : "#999"} />
            </button>
            {product.badge && (
              <span className={styles.badge}>{product.badge}</span>
            )}
            <span className={styles.productEmoji}>{product.emoji}</span>
            <span className={styles.qtyLabel}>{product.qty}</span>
          </div>

          {/* Info panel */}
          <div className={styles.infoPanel}>
            <p className={styles.categoryTag}>{categoryLabel}</p>
            <h2 className={styles.productTitle}>{product.title}</h2>

            <div className={styles.ratingRow}>
              <StarRating rating={product.rating} />
              <span className={styles.ratingValue}>{product.rating}</span>
              <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>Rs. {product.price}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>Rs. {product.originalPrice}</span>
                  <span className={styles.discount}>{discount}% OFF</span>
                </>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            <div className={styles.qtyRow}>
              <span className={styles.qtyRowLabel}>Quantity</span>
              <div className={styles.qtyControl}>
                <button className={styles.qtyBtn} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className={styles.qtyVal}>{qty}</span>
                <button className={styles.qtyBtn} onClick={() => setQty(q => q + 1)}>+</button>
              </div>
            </div>

            <div className={styles.ctaRow}>
              <button
                className={`${styles.addBtn} ${added ? styles.addedBtn : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
              </button>
            </div>

            <div className={styles.badges}>
              <span className={styles.infoBadge}>🚚 Fast Delivery</span>
              <span className={styles.infoBadge}>✅ Genuine Product</span>
              <span className={styles.infoBadge}>↩️ Easy Returns</span>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className={styles.related}>
            <h4 className={styles.relatedTitle}>More from {categoryLabel}</h4>
            <div className={styles.relatedGrid}>
              {related.map(rel => (
                <div key={rel.id} className={styles.relatedCard} onClick={() => {/* handled by parent */}}>
                  <div className={styles.relatedImg} style={{ background: rel.bgColor }}>
                    <span className={styles.relatedEmoji}>{rel.emoji}</span>
                  </div>
                  <p className={styles.relatedName}>{rel.title}</p>
                  <p className={styles.relatedPrice}>Rs. {rel.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
