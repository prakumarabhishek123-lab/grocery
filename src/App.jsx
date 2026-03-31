import React, { useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import AboutStore from './components/AboutStore/AboutStore'
import Categories from './components/Categories/Categories'
import ProductGrid from './components/ProductGrid/ProductGrid'
import Footer from './components/Footer/Footer'
import SpecialOffers from './components/SpecialOffers/SpecialOffers'
import FeaturedBrands from './components/FeaturedBrands/FeaturedBrands'
import StoreValues from './components/StoreValues/StoreValues'
import StoreLocation from './components/StoreLocation/StoreLocation'
import ShopEssentials from './components/ShopEssentials/ShopEssentials'
import CartDrawer from './components/CartDrawer/CartDrawer'
import ProductModal from './components/ProductModal/ProductModal'
import { CartProvider } from './context/CartContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { WishlistProvider } from './context/WishlistContext'
import AdPopup from './components/AdPopup/AdPopup'
import AuthModal from './components/AuthModal/AuthModal'
import WishlistDrawer from './components/WishlistDrawer/WishlistDrawer'

function GlobalAuthModal() {
  const { authModalOpen } = useAuth();
  if (!authModalOpen) return null;
  return <AuthModal />;
}

function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <AdPopup />
          <Header setSelectedCategoryId={setSelectedCategoryId} />
      <Hero />
      <SpecialOffers setSelectedCategoryId={setSelectedCategoryId} />
      <StoreValues />
      <ShopEssentials onProductSelect={setSelectedProduct} />
      <Categories setSelectedCategoryId={setSelectedCategoryId} />
      <ProductGrid
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <FeaturedBrands />
      <StoreLocation />
      <Footer />

      {/* Global overlays */}
      <CartDrawer />
      <WishlistDrawer />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <GlobalAuthModal />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  )
}

export default App
