import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { navigationLinks, categoriesData } from '../../data/mockData';
import { Package, Search, User, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchModal from '../SearchModal/SearchModal';

const Header = ({ setSelectedCategoryId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getCartCount, setCartOpen } = useCart();
  const { isAuthenticated, user, logout, setAuthModalOpen } = useAuth();
  const cartCount = getCartCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleCartClick = () => setCartOpen(true);

  const handleCategorySelect = (id) => {
    setIsDropdownOpen(false);
    setMenuOpen(false);
    if (setSelectedCategoryId) setSelectedCategoryId(id);
  };

  return (
    <>
      {/* Welcome Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.marqueeTrack}>
          <span>🙏 &nbsp; Welcome to YADUVANDSHI GENERAL STORE &nbsp;•&nbsp; Your Trusted General Store &nbsp;•&nbsp; 🛒 Shop Fresh, Shop Happy &nbsp;•&nbsp; 🎁 Special Offers Available &nbsp;•&nbsp; ✨ Quality You Can Trust &nbsp;•&nbsp; 🙏 &nbsp; Welcome to YADUVANDSHI GENERAL STORE &nbsp;•&nbsp; Your Trusted General Store &nbsp;•&nbsp; 🛒 Shop Fresh, Shop Happy &nbsp;•&nbsp; 🎁 Special Offers Available &nbsp;•&nbsp; ✨ Quality You Can Trust &nbsp;</span>
        </div>
      </div>
      {/* Mobile overlay */}
      <div
        className={`${styles.menuOverlay} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <nav className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {navigationLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Main Header */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.headerContainer}`}>

          {/* Logo */}
          <a href="#home" className={styles.logo}><img src="/store_logo.png" alt="Logo" className={styles.logoImg} /><span className={styles.logoText}><span className={styles.logoMain}>YADUVANSHI</span><span className={styles.logoSub}>General Store</span></span></a>

          {/* Desktop Navigation */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navigationLinks.map((link, idx) => (
                <li key={idx} className={styles.navItem}>
                  {link.hasDropdown ? (
                    <div className={styles.dropdownContainer}>
                      <button
                        className={styles.navLinkBtn}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      >
                        {link.label}
                        {isDropdownOpen
                          ? <ChevronUp size={13} className={styles.chevron} />
                          : <ChevronDown size={13} className={styles.chevron} />}
                      </button>
                      {isDropdownOpen && (
                        <div className={styles.dropdownMenu}>
                          {categoriesData.map(category => (
                            <a
                              href="#products"
                              key={category.id}
                              className={styles.dropdownItem}
                              onClick={() => handleCategorySelect(category.id)}
                            >
                              {category.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a href={link.href} className={styles.navLink}>{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Icon Area */}
          <div className={styles.iconsArea}>
            <button
              aria-label="Products"
              className={styles.iconBtn}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Package size={20} strokeWidth={1.5} />
            </button>
            <button aria-label="Search" className={styles.iconBtn} onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            {isAuthenticated ? (
              <div 
                className={`${styles.profileContainer} ${isProfileOpen ? styles.profileOpen : ''}`}
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className={styles.profileTrigger}>
                  <User size={20} strokeWidth={1.5} fill="currentColor" />
                  {user?.name && <span className={styles.profileName}>{user.name.split(' ')[0]}</span>}
                  <ChevronDown size={14} style={{ marginLeft: '-2px' }} />
                </div>
                <div className={styles.profileDropdown}>
                  <div className={styles.profileDropdownHeader}>
                    <div className={styles.profileGreeting}>Hello,</div>
                    <div className={styles.profileFullName}>{user?.name || 'User'}</div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <a href="#profile" className={styles.profileDropdownItem}>My Profile</a>
                  <a href="#orders" className={styles.profileDropdownItem}>Orders</a>
                  <a href="#addresses" className={styles.profileDropdownItem}>Saved Addresses</a>
                  <a href="#wishlist" className={styles.profileDropdownItem}>Wishlist</a>
                  <div className={styles.dropdownDivider} />
                  <button 
                    onClick={() => { logout(); window.location.reload(); }} 
                    className={`${styles.profileDropdownItem} ${styles.profileDropdownLogout}`}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '4px', marginRight: '4px' }}>
                <button 
                  onClick={() => setAuthModalOpen(true)} 
                  style={{ fontSize: '18px', fontWeight: '800', background: 'transparent', border: 'none', cursor: 'pointer', color: 'green' ,paddingRight:'10px' }}
                >
                  Log in
                </button>
                <button 
                  onClick={() => setAuthModalOpen(true)} 
                  className={styles.hiddenMobile}
                  style={{ fontSize: '13px', fontWeight: '500', background: '#22c55e', color: 'white', border: 'none', cursor: 'pointer', padding: '6px 12px', borderRadius: '20px' }}
                >
                  Sign up
                </button>
              </div>
            )}

            <button aria-label="Cart" className={styles.iconBtn} onClick={handleCartClick}>
              <div className={styles.cartIconWrapper}>
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className={styles.cartCountBadge}>{cartCount}</span>
                )}
              </div>
            </button>

            {/* Hamburger (mobile) */}
            <button
              aria-label="Menu"
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>

        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Header;

