import React, { useState, useMemo, useCallback } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.css';
import { productsData, categoriesData } from '../../data/mockData';

/* ── Sort helpers ─────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: 'default',    label: '✦ Relevance' },
  { value: 'price-asc',  label: '↑ Price: Low to High' },
  { value: 'price-desc', label: '↓ Price: High to Low' },
  { value: 'popular',    label: '★ Popular' },
];

const POPULAR_BADGES = ['BESTSELLER!', 'POPULAR', 'BESTSELLER'];

const getMinPrice = (product) => Math.min(...Object.values(product.prices));

const sortProducts = (products, sort) => {
  const arr = [...products];
  if (sort === 'price-asc')  return arr.sort((a, b) => getMinPrice(a) - getMinPrice(b));
  if (sort === 'price-desc') return arr.sort((a, b) => getMinPrice(b) - getMinPrice(a));
  if (sort === 'popular')    return arr.sort((a, b) => {
    const aP = POPULAR_BADGES.includes(a.badge) ? -1 : 0;
    const bP = POPULAR_BADGES.includes(b.badge) ? -1 : 0;
    return aP - bP;
  });
  return arr;
};

/* ── Component ────────────────────────────────────────── */
const ProductGrid = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const [search, setSearch]   = useState('');
  const [sort,   setSort]     = useState('default');

  const handleCategoryClick = useCallback((id) => {
    setSelectedCategoryId(id);
    setSearch('');
  }, [setSelectedCategoryId]);

  /* Derived product list — filter + search + sort */
  const displayedProducts = useMemo(() => {
    let list = selectedCategoryId
      ? productsData.filter(p => p.categoryId === selectedCategoryId)
      : productsData;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q));
    }

    return sortProducts(list, sort);
  }, [selectedCategoryId, search, sort]);

  /* Active category name */
  const activeCatName = selectedCategoryId
    ? categoriesData.find(c => c.id === selectedCategoryId)?.name
    : 'All Products';

  return (
    <section id="products" className={styles.section}>
      <div className="container">

        {/* ── Section heading ───────────────────────── */}
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.chip}>Our Collection</span>
            <h2 className={styles.title}>Store Products</h2>
          </div>
        </div>

        {/* ── Toolbar: search + sort ─────────────────── */}
        <div className={styles.toolbar}>
          {/* Search */}
          <div className={styles.searchBox}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch('')} aria-label="Clear search">✕</button>
            )}
          </div>

          {/* Sort */}
          <div className={styles.sortWrapper}>
            <select
              className={styles.sortSelect}
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Layout: sidebar + grid ─────────────────── */}
        <div className={styles.layout}>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Categories</h3>
            <ul className={styles.catList}>
              <li>
                <button
                  className={`${styles.catBtn} ${!selectedCategoryId ? styles.catActive : ''}`}
                  onClick={() => handleCategoryClick(null)}
                >
                  <span className={styles.catEmoji}>🛒</span>
                  All Products
                  <span className={styles.catCount}>{productsData.length}</span>
                </button>
              </li>
              {categoriesData.map(cat => {
                const count = productsData.filter(p => p.categoryId === cat.id).length;
                return (
                  <li key={cat.id}>
                    <button
                      className={`${styles.catBtn} ${selectedCategoryId === cat.id ? styles.catActive : ''}`}
                      onClick={() => handleCategoryClick(cat.id)}
                    >
                      <span className={styles.catEmoji}>{cat.emoji}</span>
                      {cat.name}
                      <span className={styles.catCount}>{count}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Main grid area */}
          <div className={styles.gridArea}>

            {/* Result meta bar */}
            <div className={styles.metaBar}>
              <span className={styles.metaText}>
                <strong>{displayedProducts.length}</strong> {displayedProducts.length === 1 ? 'item' : 'items'}
                {activeCatName && <> in <em>{activeCatName}</em></>}
                {search && <> matching "<em>{search}</em>"</>}
              </span>
              {(selectedCategoryId || search) && (
                <button
                  className={styles.clearFilter}
                  onClick={() => { handleCategoryClick(null); setSearch(''); }}
                >
                  ✕ Clear filters
                </button>
              )}
            </div>

            {/* Grid */}
            {displayedProducts.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyEmoji}>🔍</span>
                <p>No products found.</p>
                <button className={styles.emptyBtn} onClick={() => { handleCategoryClick(null); setSearch(''); }}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {displayedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductGrid;
