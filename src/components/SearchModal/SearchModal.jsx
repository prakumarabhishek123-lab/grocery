import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './SearchModal.module.css';
import { productsData, essentialsData } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

// Combine all products into one searchable list
const ALL_PRODUCTS = [
  ...essentialsData.map(p => ({ ...p, _source: 'essentials' })),
  ...productsData.map(p => ({
    ...p,
    _source: 'products',
    qty: Object.keys(p.prices)[0],
    price: Object.values(p.prices)[0],
    description: p.title,
    categoryKey: String(p.categoryId),
    originalPrice: null,
    rating: 4.2,
    reviewCount: 100,
  })),
];

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery]     = useState('');
  const [added, setAdded]     = useState(null);
  const inputRef              = useRef(null);
  const { addToCart }         = useCart();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query]);

  const handleAdd = (e, product) => {
    e.stopPropagation();
    addToCart({ ...product, weight: product.qty }, 1, product.qty);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1800);
  };

  const discount = (p) =>
    p.originalPrice
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null;

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* Search Input */}
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            placeholder="Search for products, brands, categories…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery('')}>✕</button>
          )}
          <button className={styles.closeBtn} onClick={onClose}>Close</button>
        </div>

        {/* Results */}
        <div className={styles.results}>
          {query.trim() === '' && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🛍️</span>
              <p>Start typing to search across all products…</p>
              <div className={styles.popular}>
                {['Maggi', 'Amul', 'Oreo', 'Bisleri', 'Chips'].map(t => (
                  <button key={t} className={styles.tag} onClick={() => setQuery(t)}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {query.trim() !== '' && results.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>😕</span>
              <p>No products found for "<strong>{query}</strong>"</p>
              <p className={styles.emptySub}>Try a different keyword</p>
            </div>
          )}

          {results.length > 0 && (
            <>
              <p className={styles.resultsCount}>
                {results.length} result{results.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
              </p>
              <div className={styles.grid}>
                {results.map(product => {
                  const off = discount(product);
                  const isAdded = added === product.id;
                  return (
                    <div key={product.id} className={styles.card}>
                      {/* Image / Emoji */}
                      <div
                        className={styles.cardImg}
                        style={{ background: product.bgColor || '#f4ede2' }}
                      >
                        {off && <span className={styles.offTag}>{off}% OFF</span>}
                        {product.badge && <span className={styles.badgeTag}>{product.badge}</span>}
                        {product.image ? (
                          <img src={product.image} alt={product.title} />
                        ) : (
                          <span className={styles.emoji}>{product.emoji || '🛍️'}</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className={styles.cardInfo}>
                        <p className={styles.cardTitle}>{product.title}</p>
                        <div className={styles.priceRow}>
                          <span className={styles.price}>Rs. {product.price}</span>
                          {product.originalPrice && (
                            <span className={styles.original}>Rs. {product.originalPrice}</span>
                          )}
                        </div>
                        {product.qty && <span className={styles.qty}>{product.qty}</span>}
                      </div>

                      {/* Add button */}
                      <button
                        className={`${styles.addBtn} ${isAdded ? styles.addedBtn : ''}`}
                        onClick={e => handleAdd(e, product)}
                      >
                        {isAdded ? '✓ Added!' : '+ Add'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchModal;
