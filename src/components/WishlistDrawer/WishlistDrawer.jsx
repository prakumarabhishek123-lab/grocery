import React from 'react';
import styles from './WishlistDrawer.module.css';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const WishlistDrawer = () => {
  const { wishlistItems, wishlistOpen, setWishlistOpen, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    // Add default weight (first one) or existing selected logic
    const defaultWeight = product.weights?.[0] || '1 unit';
    const price = product.prices?.[defaultWeight] || product.price || 0;
    addToCart({ ...product, price }, 1, defaultWeight);
    removeFromWishlist(product.id);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${wishlistOpen ? styles.overlayVisible : ''}`}
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${wishlistOpen ? styles.drawerOpen : ''}`}>
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitle}>
            <span>❤️</span>
            <h3>Your Wishlist</h3>
            {wishlistItems.length > 0 && (
              <span className={styles.itemCount}>
                {wishlistItems.length} items
              </span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={() => setWishlistOpen(false)} aria-label="Close wishlist">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className={styles.drawerBody}>
          {wishlistItems.length === 0 ? (
            <div className={styles.emptyDrawer}>
              <span className={styles.emptyIcon}>❤️</span>
              <p className={styles.emptyTitle}>Your wishlist is empty</p>
              <p className={styles.emptySubtitle}>Save items you like here</p>
              <button className={styles.shopNowBtn} onClick={() => setWishlistOpen(false)}>
                Explore Products
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {wishlistItems.map((item, idx) => (
                <li key={`${item.id}-${idx}`} className={styles.wishlistItem}>
                  {/* Image */}
                  <div
                    className={styles.itemImage}
                    style={{ background: item.bgColor || '#f4ede2' }}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.title} className={styles.itemProductImg} />
                    ) : (
                      <span className={styles.itemEmoji}>{item.emoji || '📦'}</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.title}</p>
                    <p className={styles.itemPrice}>
                      {/* Estimate default price since no weight is technically selected here */}
                      Rs. {item.prices?.[item.weights?.[0]] || item.price || 0}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className={styles.itemControls}>
                    <button
                      className={styles.addToCartBtn}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default WishlistDrawer;
