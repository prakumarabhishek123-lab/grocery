import React, { useState } from 'react';
import styles from './CheckoutModal.module.css';
import { useCart } from '../../context/CartContext';

// ── Store Details ──────────────────────────────────────────────────────────────
const STORE_UPI_ID  = '9792472837@ybl';
const STORE_NAME    = 'Yaduvanshi General Store';
const WHATSAPP_NUM  = '919792472837';

// ── Real QR Code via qrserver API (truly scannable) ───────────────────────────
const RealQRCode = ({ amount, name }) => {
  const upiString = `upi://pay?pa=${STORE_UPI_ID}&pn=${encodeURIComponent(STORE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Order by ' + name)}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&color=1a2a1a&bgcolor=ffffff&data=${encodeURIComponent(upiString)}`;
  return (
    <div className={styles.qrContainer}>
      <img src={qrUrl} alt="UPI QR Code" className={styles.qrImage} />
      <div className={styles.qrOverlayBadge}>
        <span className={styles.qrBadgeIcon}>🇮🇳</span>
        <span className={styles.qrBadgeText}>UPI</span>
      </div>
    </div>
  );
};

// ── UPI App Definitions with real logos + correct deep links ──────────────────
const getUpiApps = (upiId, amount, name) => {
  const upiParams = `pa=${upiId}&pn=${encodeURIComponent(STORE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent('Order by ' + name)}`;
  const upiIntent = `upi://pay?${upiParams}`;
  return [
    {
      name: 'GPay',
      logo: (
        <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" fill="#EA4335"/>
          <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" fill="#4285F4"/>
          <path d="M10.53 28.59c-.48-1.37-.76-2.83-.76-4.34 0-1.51.28-2.97.76-4.34L2.56 13.7C.94 16.99 0 20.62 0 24.25c0 3.63.94 7.26 2.56 10.55l7.97-6.21z" fill="#FBBC05"/>
          <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" fill="#34A853"/>
        </svg>
      ),
      color: '#4285F4',
      url: upiIntent,
      webUrl: `https://gpay.app.goo.gl/pay`,
    },
    {
      name: 'PhonePe',
      logo: (
        <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#5f259f"/>
          <path d="M33.5 18.2c0-5.4-4.4-9.7-9.8-9.7h-9.2v23.1l5.4-3.1v-6.2h3.8c5.4 0 9.8-1.7 9.8-4.1z" fill="white"/>
          <path d="M20.5 19v8.9l9.4 9.4c1-1.1 1.6-2.6 1.6-4.2v-.3L20.5 19z" fill="white"/>
        </svg>
      ),
      color: '#5f259f',
      url: upiIntent,
      webUrl: `https://phon.pe/ru_UPI`,
    },
    {
      name: 'Paytm',
      logo: (
        <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="10" fill="#00BAF2"/>
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="bold" fill="white" fontFamily="Arial">Paytm</text>
        </svg>
      ),
      color: '#00BAF2',
      url: upiIntent,
      webUrl: `https://paytm.com/`,
    },
    {
      name: 'BHIM',
      logo: (
        <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="24" fill="#ff6600"/>
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="white" fontFamily="Arial">BHIM</text>
        </svg>
      ),
      color: '#ff6600',
      url: upiIntent,
      webUrl: `https://www.bhimupi.org.in/get-bhim-app`,
    },
  ];
};

// ── Main Component ─────────────────────────────────────────────────────────────
const CheckoutModal = ({ isOpen, onClose }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [step, setStep]     = useState('form');
  const [form, setForm]     = useState({ name: '', phone: '', address: '', note: '', paymentMethod: 'cash' });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const total       = getCartTotal();
  const deliveryFee = total >= 200 ? 0 : 30;
  const grandTotal  = total + deliveryFee;

  /* validation */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone   = 'Enter a valid 10-digit mobile number';
    if (!form.address.trim()) e.address = 'Delivery address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  /* submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.paymentMethod === 'upi') {
      setStep('upi-pay');
    } else {
      clearCart();
      setStep('success');
    }
  };

  /* open UPI app — works on mobile via upi:// intent, falls back to web on desktop */
  const openUpiApp = (app) => {
    // On mobile: upi:// deep link opens any installed UPI app
    // On desktop: open the app's web page as fallback
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = app.url;
      // If no app handles the intent after 1.2s, open web fallback
      setTimeout(() => {
        if (document.visibilityState !== 'hidden') {
          window.open(app.webUrl, '_blank');
        }
      }, 1200);
    } else {
      // Desktop — open web version directly
      window.open(app.webUrl, '_blank');
    }
  };

  /* copy UPI ID */
  const copyUpiId = () => {
    navigator.clipboard.writeText(STORE_UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  /* confirm payment done */
  const handlePaymentDone = () => {
    clearCart();
    setStep('success');
  };

  /* WhatsApp order */
  const handleWhatsApp = () => {
    const lines = cartItems
      .map(i => `• ${i.title} (${i.weight || i.qty}) ×${i.quantity} = Rs.${(i.price * i.quantity).toFixed(0)}`)
      .join('%0A');
    const msg =
      `*New Order – ${STORE_NAME}* 🛒%0A%0A` +
      `*Name:* ${form.name}%0A*Phone:* ${form.phone}%0A*Address:* ${form.address}%0A` +
      `${form.note ? `*Note:* ${form.note}%0A` : ''}%0A` +
      `*Items:*%0A${lines}%0A%0A` +
      `*Delivery:* Rs.${deliveryFee}%0A*Grand Total:* Rs.${grandTotal.toFixed(0)}%0A` +
      `*Payment:* ${form.paymentMethod === 'cash' ? 'Cash on Delivery' : 'UPI – ' + STORE_UPI_ID}`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank');
  };

  /* close/reset */
  const handleClose = () => {
    setStep('form');
    setForm({ name: '', phone: '', address: '', note: '', paymentMethod: 'cash' });
    setErrors({});
    setCopied(false);
    onClose();
  };

  if (!isOpen) return null;

  const upiApps = getUpiApps(STORE_UPI_ID, grandTotal.toFixed(2), form.name || 'Customer');

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            {step === 'success'   ? '🎉 Order Placed!'
             : step === 'upi-pay' ? '📱 Pay via UPI'
             : '🛒 Checkout'}
          </div>
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">✕</button>
        </div>

        {/* ═══════════ STEP 1 – Order form ═══════════ */}
        {step === 'form' && (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Summary */}
            <div className={styles.summaryBox}>
              <p className={styles.summaryTitle}>Order Summary</p>
              <ul className={styles.summaryList}>
                {cartItems.map((item, idx) => (
                  <li key={idx} className={styles.summaryItem}>
                    <span className={styles.summaryItemName}>
                      {item.title}<span className={styles.summaryQty}> ×{item.quantity}</span>
                    </span>
                    <span className={styles.summaryItemPrice}>Rs. {(item.price * item.quantity).toFixed(0)}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.summaryDivider} />
              <div className={styles.summaryRow}><span>Subtotal</span><span>Rs. {total.toFixed(0)}</span></div>
              <div className={styles.summaryRow}>
                <span>Delivery {deliveryFee === 0 && <span className={styles.freeTag}>FREE</span>}</span>
                <span>{deliveryFee === 0 ? 'Free' : `Rs. ${deliveryFee}`}</span>
              </div>
              {total < 200 && <p className={styles.freeDeliveryHint}>Add Rs. {(200 - total).toFixed(0)} more for free delivery!</p>}
              <div className={styles.summaryTotal}><span>Total</span><span>Rs. {grandTotal.toFixed(0)}</span></div>
            </div>

            {/* Delivery details */}
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Delivery Details</p>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Full Name *</label>
                <input className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Mobile Number *</label>
                <input className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  type="tel" name="phone" placeholder="10-digit mobile number"
                  value={form.phone} onChange={handleChange} maxLength={10} />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Delivery Address *</label>
                <textarea className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
                  name="address" rows={3} placeholder="House no., street, locality, city..."
                  value={form.address} onChange={handleChange} />
                {errors.address && <span className={styles.error}>{errors.address}</span>}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Special Instructions (optional)</label>
                <input className={styles.input} type="text" name="note"
                  placeholder="Any special requests..." value={form.note} onChange={handleChange} />
              </div>
            </div>

            {/* Payment method */}
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Payment Method</p>
              <div className={styles.paymentOptions}>
                <label className={`${styles.paymentOption} ${form.paymentMethod === 'cash' ? styles.paymentActive : ''}`}>
                  <input type="radio" name="paymentMethod" value="cash"
                    checked={form.paymentMethod === 'cash'} onChange={handleChange} />
                  <span className={styles.paymentIcon}>💵</span>
                  <span>Cash on Delivery</span>
                </label>
                <label className={`${styles.paymentOption} ${form.paymentMethod === 'upi' ? styles.paymentActive : ''}`}>
                  <input type="radio" name="paymentMethod" value="upi"
                    checked={form.paymentMethod === 'upi'} onChange={handleChange} />
                  <span className={styles.paymentIcon}>📱</span>
                  <div>
                    <div>UPI / Online</div>
                    <div className={styles.paymentSubtext}>GPay · PhonePe · Paytm</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.actions}>
              <button type="submit" className={styles.placeOrderBtn}>
                {form.paymentMethod === 'upi'
                  ? `Pay ₹${grandTotal.toFixed(0)} via UPI →`
                  : `Place Order — Rs. ${grandTotal.toFixed(0)}`}
              </button>
              <button type="button" className={styles.whatsappBtn}
                onClick={() => { if (validate()) handleWhatsApp(); }}>
                <span>📲</span> Order via WhatsApp
              </button>
            </div>
          </form>
        )}

        {/* ═══════════ STEP 2 – UPI Payment ═══════════ */}
        {step === 'upi-pay' && (
          <div className={styles.upiScreen}>

            <p className={styles.upiAmount}>₹{grandTotal.toFixed(0)}</p>
            <p className={styles.upiAmountLabel}>{STORE_NAME}</p>

            {/* Real scannable QR */}
            <div className={styles.qrWrapper}>
              <RealQRCode amount={grandTotal.toFixed(2)} name={form.name} />
              <p className={styles.qrHint}>📷 Scan with any UPI app to pay</p>
            </div>

            {/* UPI ID copy */}
            <div className={styles.upiIdRow}>
              <span className={styles.upiIdLabel}>UPI ID:</span>
              <span className={styles.upiId}>{STORE_UPI_ID}</span>
              <button className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`} onClick={copyUpiId}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>

            {/* App buttons */}
            <p className={styles.orDivider}>— or tap to open payment app —</p>
            <div className={styles.upiApps}>
              {upiApps.map(app => (
                <button
                  key={app.name}
                  className={styles.upiAppBtn}
                  style={{ '--app-color': app.color }}
                  onClick={() => openUpiApp(app)}
                  title={`Pay with ${app.name}`}
                >
                  <span className={styles.upiAppLogo}>{app.logo}</span>
                  <span className={styles.upiAppName}>{app.name}</span>
                </button>
              ))}
            </div>

            <div className={styles.upiActions}>
              <button className={styles.placeOrderBtn} onClick={handlePaymentDone}>
                ✓ I've Completed the Payment
              </button>
              <button className={styles.backBtn} onClick={() => setStep('form')}>
                ← Change Payment Method
              </button>
            </div>
          </div>
        )}

        {/* ═══════════ STEP 3 – Success ═══════════ */}
        {step === 'success' && (
          <div className={styles.successScreen}>
            <div className={styles.successAnim}>🎉</div>
            <h2 className={styles.successTitle}>Order Confirmed!</h2>
            <p className={styles.successMsg}>
              Thank you, <strong>{form.name}</strong>! Your order of{' '}
              <strong>Rs. {grandTotal.toFixed(0)}</strong> has been placed.
            </p>
            <div className={styles.successDetails}>
              <p>📞 We'll call on <strong>{form.phone}</strong> to confirm.</p>
              <p>📍 Deliver to: <strong>{form.address}</strong></p>
              <p>💳 Payment: <strong>
                {form.paymentMethod === 'upi' ? `UPI (${STORE_UPI_ID})` : 'Cash on Delivery'}
              </strong></p>
            </div>
            <button className={styles.placeOrderBtn} onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModal;
