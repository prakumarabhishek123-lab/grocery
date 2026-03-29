import React, { useState } from 'react';
import styles from './CartDrawer.module.css';
import { useCart } from '../../context/CartContext';
import CheckoutModal from '../CheckoutModal/CheckoutModal';

const CartDrawer = () => {
  const { cartItems, cartOpen, setCartOpen, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${cartOpen ? styles.overlayVisible : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <aside className={`${styles.drawer} ${cartOpen ? styles.drawerOpen : ''}`}>
        {/* Header */}
        <div className={styles.drawerHeader}>
          <div className={styles.drawerTitle}>
            <span>🛒</span>
            <h3>Your Cart</h3>
            {cartItems.length > 0 && (
              <span className={styles.itemCount}>
                {cartItems.reduce((t, i) => t + i.quantity, 0)} items
              </span>
            )}
          </div>
          <button className={styles.closeBtn} onClick={() => setCartOpen(false)} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Items */}
        <div className={styles.drawerBody}>
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <span className={styles.emptyIcon}>🛒</span>
              <p className={styles.emptyTitle}>Your cart is empty</p>
              <p className={styles.emptySubtitle}>Add items to get started</p>
              <button className={styles.shopNowBtn} onClick={() => setCartOpen(false)}>
                Shop Now
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cartItems.map((item, idx) => (
                <li key={`${item.id}-${item.weight}-${idx}`} className={styles.cartItem}>
                  {/* Image / emoji */}
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
                    {item.weight && (
                      <p className={styles.itemWeight}>{item.weight}</p>
                    )}
                    <p className={styles.itemPrice}>
                      Rs. {(item.price * item.quantity).toFixed(0)}
                      <span className={styles.itemUnitPrice}> (Rs. {item.price}/ea)</span>
                    </p>
                  </div>

                  {/* Controls */}
                  <div className={styles.itemControls}>
                    <div className={styles.qtyRow}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.weight, item.quantity - 1)}
                      >−</button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                      >+</button>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id, item.weight)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className={styles.drawerFooter}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalAmount}>Rs. {getCartTotal().toFixed(0)}</span>
            </div>
            <p className={styles.taxNote}>Taxes and delivery calculated at checkout</p>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
            <button className={styles.continueShopping} onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        )}
      </aside>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
};

export default CartDrawer;
