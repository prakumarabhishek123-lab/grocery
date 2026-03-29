// Mock data simulating backend API responses


export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "All Products", href: "#products", hasDropdown: true },
  { label: "Our Story", href: "#about" },
  { label: "Blog", href: "#contact" },
  { label: "Contact", href: "#contact" },
  { label: "Track Order", href: "#contact" }
];

export const heroData = {
  headline: "YADUVANSHI GENERAL STORE,MAIN ROAD UTRAULA,BALRAMPUR(U.P)",
  subheadline: "Premium Quality Every Day",
  ctaText: "Shop Groceries",
  ctaLink: "#products",
  // A dark moody hero image fitting the prompt
  backgroundImage: "/general_store_hero.png"
};

export const bannerMarqueeItems = [
  "Fresh Groceries Daily",
  "Premium Household Goods",
  "100% Quality Guaranteed",
  "Fresh Groceries Daily",
  "Your Trusted Local Market"
];

export const categoriesData = [
  { id: 1, name: "Biscuits",             color: "#fff3e0", textColor: "#bf6c00", image: "/product_biscuits.png",     emoji: "🍪", offer: "Min. 10% Off" },
  { id: 2, name: "Cigarettes",           color: "#e8f5e9", textColor: "#2e7d32", image: "/product_cigarettes.png",  emoji: "🚬", offer: "18+ Only" },
  { id: 3, name: "Detergents",           color: "#e3f2fd", textColor: "#1565c0", image: "/product_surf.png",        emoji: "🧺", offer: "Upto ₹50 Off" },
  { id: 4, name: "Chocolates",           color: "#fce4ec", textColor: "#ad1457", image: "/dairy_milk.png",          emoji: "🍫", offer: "Min. 20% Off" },
  { id: 5, name: "Cold Drinks",          color: "#ffebee", textColor: "#c62828", image: "/product_cocacola.png",    emoji: "🥤", offer: "Flat 15% Off" },
  { id: 6, name: "Namkeen",              color: "#fff8e1", textColor: "#f57f17", image: "/product_namkeen.png",     emoji: "🍿", offer: "Min. 5% Off" },
  { id: 7, name: "Snacks",              color: "#fffde7", textColor: "#f9a825", image: "/product_snacks.png",       emoji: "🥔", offer: "Best Deals" },
  { id: 8, name: "Daily Staples",       color: "#e8f5e9", textColor: "#2e7d32", image: "/aashirvaad_atta.png",      emoji: "🌾", offer: "Save Big" },
  { id: 9, name: "Household Items",     color: "#f3e5f5", textColor: "#6a1b9a", image: "/premium_cleaning.png",    emoji: "🧹", offer: "Upto 30% Off" },
];

export const productsData = [
  // Biscuits (1)
  { id: 101, categoryId: 1, title: "Britannia Good Day", prices: { "50 Gms": 20, "100 Gms": 35 }, weights: ["50 Gms", "100 Gms"], image: "/good_day_biscuit.png", badge: "BESTSELLER!", badgeColor: "var(--color-badge-bestseller)" },
  { id: 102, categoryId: 1, title: "Parle-G Gold", prices: { "100 Gms": 10, "250 Gms": 22 }, weights: ["100 Gms", "250 Gms"], image: "/product_biscuits.png", badge: "POPULAR", badgeColor: "var(--color-primary-dark)" },
  { id: 103, categoryId: 1, title: "Sunfeast Dark Fantasy", prices: { "75 Gms": 40, "150 Gms": 75 }, weights: ["75 Gms", "150 Gms"], image: "/dark_fantasy.png" },
  { id: 104, categoryId: 1, title: "Britannia Bourbon", prices: { "120 Gms": 30 }, weights: ["120 Gms"], image: "/britannia_bourbon.png" },
  { id: 105, categoryId: 1, title: "McVitie's Digestive", prices: { "200 Gms": 60, "400 Gms": 110 }, weights: ["200 Gms", "400 Gms"], image: "/premium_biscuits.png", badge: "HEALTHY", badgeColor: "var(--color-primary-light)" },

  // Cigarettes (2)
  { id: 201, categoryId: 2, title: "Premium Cigarettes", prices: { "Pack of 10": 350, "Pack of 20": 680 }, weights: ["Pack of 10", "Pack of 20"], image: "/product_cigarettes.png", badge: "18+", badgeColor: "var(--color-primary-dark)" },

  // Detergent (3)
  { id: 301, categoryId: 3, title: "Surf Excel Washing Powder", prices: { "500 Gms": 120, "1 Kg": 220 }, weights: ["500 Gms", "1 Kg"], image: "/product_surf.png", badge: "ESSENTIAL", badgeColor: "var(--color-primary-light)" },
  { id: 302, categoryId: 3, title: "Tide Plus Double Power", prices: { "1 Kg": 195 }, weights: ["1 Kg"], image: "/tide_plus.png" },
  { id: 303, categoryId: 3, title: "Vim Lemon Dishwash Bar", prices: { "200 Gms": 25, "300 Gms": 35 }, weights: ["200 Gms", "300 Gms"], image: "/vim_bar.png" },

  // Chocolates & Candies (4)
  { id: 401, categoryId: 4, title: "Cadbury Dairy Milk", prices: { "50 Gms": 40, "100 Gms": 75 }, weights: ["50 Gms", "100 Gms"], image: "/dairy_milk.png", badge: "BESTSELLER!", badgeColor: "var(--color-badge-bestseller)" },
  { id: 402, categoryId: 4, title: "Chupa Chups Lollipop", prices: { "1 Pc": 10, "Pack of 5": 45 }, weights: ["1 Pc", "Pack of 5"], image: "/chupa_chups.png", badge: "KIDS FAVORITE", badgeColor: "#e83e8c" },
  { id: 403, categoryId: 4, title: "Nestle Munch", prices: { "10 Gms": 10, "25 Gms": 20 }, weights: ["10 Gms", "25 Gms"], image: "/nestle_munch_bar.png" },

  // Cold Drinks & Water (5)
  { id: 501, categoryId: 5, title: "Coca Cola Cans", prices: { "300 Ml": 40, "500 Ml": 60 }, weights: ["300 Ml", "500 Ml"], image: "/product_cocacola.png", badge: "CHILLED", badgeColor: "var(--color-primary-light)" },
  { id: 502, categoryId: 5, title: "Thums Up PET Bottle", prices: { "750 Ml": 45, "2.25 L": 110 }, weights: ["750 Ml", "2.25 L"], image: "/thums_up.png" },
  { id: 503, categoryId: 5, title: "Frooti Mango Drink", prices: { "160 Ml": 20, "600 Ml": 60 }, weights: ["160 Ml", "600 Ml"], image: "/frooti_drink.png", badge: "SUMMER SPECIAL", badgeColor: "#ffc107" },
  { id: 504, categoryId: 5, title: "Kinley Packaged Water", prices: { "250 Ml": 10, "500 Ml": 15, "1 L": 20, "2 L": 35 }, weights: ["250 Ml", "500 Ml", "1 L", "2 L"], image: "/kinley_water.png", badge: "ESSENTIAL", badgeColor: "var(--color-primary-dark)" },
  { id: 505, categoryId: 5, title: "Bisleri Mineral Water", prices: { "250 Ml": 10, "500 Ml": 15, "1 L": 20, "2 L": 35 }, weights: ["250 Ml", "500 Ml", "1 L", "2 L"], image: "/Bisleri Mineral Water, 12 x 1 L.jpeg" },
  { id: 506, categoryId: 5, title: "Bailley Packaged Water", prices: { "250 Ml": 10, "500 Ml": 15, "1 L": 20, "2 L": 35 }, weights: ["250 Ml", "500 Ml", "1 L", "2 L"], image: "/balley water.png" },
  { id: 507, categoryId: 5, title: "Pepsi Bottle", prices: { "750 Ml": 45, "2 L": 90 }, weights: ["750 Ml", "2 L"], image: "/pepsi.jpg" },

  // Namkeen (6)
  { id: 601, categoryId: 6, title: "Haldiram's Bhujia Sev", prices: { "200 Gms": 80, "400 Gms": 150 }, weights: ["200 Gms", "400 Gms"], image: "/product_namkeen.png", badge: "BESTSELLER!", badgeColor: "var(--color-badge-bestseller)" },
  { id: 602, categoryId: 6, title: "Haldiram's Navrattan", prices: { "200 Gms": 85, "400 Gms": 160 }, weights: ["200 Gms", "400 Gms"], image: "/haldirams_navrattan.png" },
  { id: 603, categoryId: 6, title: "Kaju (Cashew)", prices: { "200 Gms": 150, "500 Gms": 350 }, weights: ["200 Gms", "500 Gms"], image: "/kaju.jpg" },

  // Snacks (7)
  { id: 701, categoryId: 7, title: "Lay's Magic Masala", prices: { "50 Gms": 20, "90 Gms": 35 }, weights: ["50 Gms", "90 Gms"], image: "/lays_magic_masala.png", badge: "SPICY", badgeColor: "#d9534f" },
  { id: 702, categoryId: 7, title: "Bingo Mad Angles", prices: { "40 Gms": 10, "80 Gms": 20 }, weights: ["40 Gms", "80 Gms"], image: "/bingo_mad_angles.png" },
  { id: 703, categoryId: 7, title: "Lay's Classic Chips", prices: { "50 Gms": 20, "90 Gms": 35 }, weights: ["50 Gms", "90 Gms"], image: "/lays_classic_chips.png" },
  { id: 704, categoryId: 7, title: "Doritos Nacho Chips", prices: { "70 Gms": 30, "135 Gms": 55 }, weights: ["70 Gms", "135 Gms"], image: "/doritos_nacho_chips.png" },

  // Daily Staples (8)
  { id: 801, categoryId: 8, title: "Tata Salt Vacuum Evaporated", prices: { "1 Kg": 28 }, weights: ["1 Kg"], image: "/tata_salt.png", badge: "IODIZED", badgeColor: "#007bff" },
  { id: 802, categoryId: 8, title: "Aashirvaad Shudh Chakki Atta", prices: { "5 Kg": 250, "10 Kg": 480 }, weights: ["5 Kg", "10 Kg"], image: "/aashirvaad_atta.png", badge: "ESSENTIAL", badgeColor: "var(--color-primary-light)" },
  { id: 803, categoryId: 8, title: "India Gate Basmati Rice", prices: { "5 Kg": 550 }, weights: ["5 Kg"], image: "/india_gate_rice.png" },
  { id: 804, categoryId: 8, title: "Sugar", prices: { "1 Kg": 45, "5 Kg": 210 }, weights: ["1 Kg", "5 Kg"], image: "/sugar.jpg" },
  { id: 805, categoryId: 8, title: "Toor Dal / Arhar Dal", prices: { "500 Gms": 65, "1 Kg": 125 }, weights: ["500 Gms", "1 Kg"], image: "/pulse.jpg" },
  { id: 806, categoryId: 8, title: "Saffola Gold Oil", prices: { "1 Litre": 185, "5 Litre": 880 }, weights: ["1 Litre", "5 Litre"], image: "/oil.jpg" },

  // Household Items (9)
  { id: 901, categoryId: 9, title: "Homelite Matchbox", prices: { "Pack of 10": 10, "Pack of 50": 45 }, weights: ["Pack of 10", "Pack of 50"], image: "/matchbox.png" },
  { id: 902, categoryId: 9, title: "Mortein Mosquito Repellent", prices: { "1 Refill": 85, "Combo Pack": 150 }, weights: ["1 Refill", "Combo Pack"], image: "/mortein_repellent.png" },
  { id: 903, categoryId: 9, title: "Dove Beauty Soap", prices: { "75 Gms": 45, "100 Gms": 60 }, weights: ["75 Gms", "100 Gms"], image: "/premium_soap.png" },
  { id: 904, categoryId: 9, title: "Premium Spices Set", prices: { "Combo Pack": 150 }, weights: ["Combo Pack"], image: "/premium_spices.png" },
  { id: 905, categoryId: 9, title: "Premium Cleaning Kit", prices: { "Pack": 120 }, weights: ["Pack"], image: "/premium_cleaning.png" },
];


export const footerFeatures = [
  { text: "Your Trusted Partner for Daily Essentials" },
  { text: "Quality Products, Unbeatable Prices" }
]

// ── Shop Essentials Data ──────────────────────────────────────────────────────

export const essentialsCategories = [
  { key: 'all',       label: 'All Items',          icon: '🛒' },
  { key: 'snacks',    label: 'Snacks',              icon: '🍟' },
  { key: 'biscuits',  label: 'Biscuits & Cookies',  icon: '🍪' },
  { key: 'chocolates',label: 'Chocolates',           icon: '🍫' },
  { key: 'instant',   label: 'Instant Food',         icon: '🍜' },
  { key: 'beverages', label: 'Tea & Coffee',          icon: '☕' },
  { key: 'colddrinks',label: 'Cold Drinks',           icon: '🥤' },
  { key: 'breakfast', label: 'Breakfast Items',       icon: '🥣' },
  { key: 'cooking',   label: 'Cooking Essentials',    icon: '🧂' },
  { key: 'household', label: 'Household Items',       icon: '🧹' },
  { key: 'personal',  label: 'Personal Care',         icon: '🧴' },
  { key: 'dairy',     label: 'Dairy Products',        icon: '🥛' },
  { key: 'packaged',  label: 'Packaged Foods',        icon: '📦' },
];

export const essentialsData = [
  // ── Dairy ──
  { id: 'e001', categoryKey: 'dairy',     title: 'Amul Full Cream Milk',     emoji: '🥛', image: '/amul_milk.png',               bgColor: '#EBF5FB', price: 62,  originalPrice: 72,   rating: 4.6, reviewCount: 1243, qty: '1 Litre',    badge: 'DAILY ESSENTIAL', description: 'Fresh and nutritious full cream milk from Amul. Rich in calcium and protein.' },
  { id: 'e002', categoryKey: 'dairy',     title: 'Amul Butter Pasteurised',  emoji: '🧈', image: '/amul_butter.png',             bgColor: '#FEF9E7', price: 55,  originalPrice: 62,   rating: 4.7, reviewCount: 987,  qty: '100g',       badge: 'BESTSELLER',      description: 'Amul pasteurised butter from fresh cream. Ideal for cooking, baking and spreading.' },
  { id: 'e003', categoryKey: 'dairy',     title: 'Britannia Cheese Slices',  emoji: '🧀', image: '/britannia_cheese_slices.png', bgColor: '#FDFDE7', price: 110, originalPrice: 130,  rating: 4.4, reviewCount: 654,  qty: '10 Slices',  badge: 'POPULAR',         description: 'Tasty processed cheese slices, great for sandwiches and snacking.' },

  // ── Snacks ──
  { id: 'e004', categoryKey: 'snacks',    title: "Lay's Classic Chips",      emoji: '🥔', image: '/lays_classic_chips.png',      bgColor: '#FEF5E7', price: 20,  originalPrice: 25,   rating: 4.5, reviewCount: 2341, qty: '52g',        badge: 'POPULAR',         description: 'Crispy thin-sliced potato chips with the perfect amount of salt.' },
  { id: 'e005', categoryKey: 'snacks',    title: 'Doritos Nacho Chips',       emoji: '🌽', image: '/doritos_nacho_chips.png',     bgColor: '#FEF9E7', price: 45,  originalPrice: 55,   rating: 4.3, reviewCount: 876,  qty: '88g',        badge: 'CRUNCHY',         description: 'Crunchy triangular corn chips with bold nacho cheese flavour.' },
  { id: 'e006', categoryKey: 'snacks',    title: "Bingo Mad Angles",          emoji: '🔺', image: '/bingo_mad_angles.png',        bgColor: '#FDEDEC', price: 20,  originalPrice: 25,   rating: 4.4, reviewCount: 1234, qty: '75g',        badge: 'SPICY',           description: 'Achaari masti flavoured angled snacks — a party in every bite.' },

  // ── Biscuits & Cookies ──
  { id: 'e007', categoryKey: 'biscuits',  title: 'Britannia Marie Gold',     emoji: '🍪', image: '/britannia_marie_gold.png',    bgColor: '#FDFDE7', price: 15,  originalPrice: 18,   rating: 4.4, reviewCount: 1876, qty: '150g',       badge: 'CLASSIC',         description: 'Light and crispy Marie biscuits, perfect with your morning tea.' },
  { id: 'e008', categoryKey: 'biscuits',  title: 'Oreo Sandwich Cookies',    emoji: '⚫', image: '/oreo_cookies.png',            bgColor: '#F2F3F4', price: 35,  originalPrice: 42,   rating: 4.8, reviewCount: 3421, qty: '120g',       badge: 'BESTSELLER',      description: 'Dark chocolate wafers with classic vanilla cream filling.' },
  { id: 'e009', categoryKey: 'biscuits',  title: 'Good Day Cashew Cookies',  emoji: '🌟', image: '/good_day_cashew_cookies.png', bgColor: '#FEF9E7', price: 30,  originalPrice: 36,   rating: 4.5, reviewCount: 998,  qty: '100g',       badge: 'POPULAR',         description: 'Britannia Good Day cashew cookies with a rich buttery taste.' },

  // ── Chocolates ──
  { id: 'e010', categoryKey: 'chocolates',title: 'Cadbury Dairy Milk',        emoji: '🍫', image: '/cadbury_dairy_milk_ess.png',  bgColor: '#FDEDEC', price: 50,  originalPrice: 60,   rating: 4.8, reviewCount: 4532, qty: '90g',        badge: 'BESTSELLER',      description: 'The original melt-in-your-mouth milk chocolate everyone loves.' },
  { id: 'e011', categoryKey: 'chocolates',title: 'KitKat Wafer Bar',           emoji: '🍫', image: '/kitkat_wafer_bar.png',        bgColor: '#FDEDEC', price: 30,  originalPrice: 35,   rating: 4.7, reviewCount: 2876, qty: '37g',        badge: 'POPULAR',         description: 'Crispy wafer fingers covered in smooth milk chocolate. Have a break!' },
  { id: 'e012', categoryKey: 'chocolates',title: 'Nestle Munch Bar',           emoji: '🍫', image: '/nestle_munch_bar.png',        bgColor: '#FDEDEC', price: 10,  originalPrice: 12,   rating: 4.4, reviewCount: 1234, qty: '25g',        badge: 'VALUE PICK',      description: 'Rice puff wafer with caramel and cocoa-flavoured coating.' },

  // ── Instant Food ──
  { id: 'e013', categoryKey: 'instant',   title: 'Maggi 2-Min Noodles',       emoji: '🍜', image: '/maggi_noodles.png',           bgColor: '#FEF5E7', price: 14,  originalPrice: 17,   rating: 4.7, reviewCount: 8763, qty: '70g',        badge: 'ICONIC',          description: 'The beloved 2-minute noodles. Quick, convenient, and delicious.' },
  { id: 'e014', categoryKey: 'instant',   title: 'Top Ramen Noodles',          emoji: '🍝', image: '/top_ramen_noodles.png',       bgColor: '#FEF5E7', price: 15,  originalPrice: 18,   rating: 4.3, reviewCount: 1234, qty: '70g',        badge: 'QUICK MEAL',      description: 'Ready in minutes, with a rich soup base and springy noodles.' },
  { id: 'e015', categoryKey: 'instant',   title: 'Wai Wai Chicken Noodles',    emoji: '🥣', image: '/wai_wai_noodles.png',         bgColor: '#FEF5E7', price: 15,  originalPrice: 18,   rating: 4.2, reviewCount: 654,  qty: '75g',        badge: 'TASTY',           description: 'Pre-fried noodles with chicken masala and crispy toppings.' },

  // ── Tea & Coffee ──
  { id: 'e016', categoryKey: 'beverages', title: 'Tata Tea Premium',           emoji: '☕', image: '/tata_tea_premium.png',        bgColor: '#FDFDE7', price: 95,  originalPrice: 110,  rating: 4.5, reviewCount: 2134, qty: '250g',       badge: 'POPULAR',         description: 'Strong and aromatic tea blend for the perfect brew every morning.' },
  { id: 'e017', categoryKey: 'beverages', title: 'Nescafé Classic Coffee',     emoji: '☕', image: '/nescafe_classic_coffee.png',  bgColor: '#F2F3F4', price: 125, originalPrice: 148,  rating: 4.6, reviewCount: 1567, qty: '50g',        badge: 'PREMIUM',         description: 'Rich and bold instant coffee, perfect for a quick energising cup.' },
  { id: 'e018', categoryKey: 'beverages', title: 'Lipton Green Tea Bags',      emoji: '🍵', image: '/tata_tea_premium.png',        bgColor: '#E9F7EF', price: 85,  originalPrice: 100,  rating: 4.4, reviewCount: 876,  qty: '25 Bags',    badge: 'HEALTHY',         description: 'Refreshing green tea bags rich in natural antioxidants.' },

  // ── Cold Drinks ──
  { id: 'e019', categoryKey: 'colddrinks',title: 'Coca-Cola Classic',          emoji: '🥤', image: '/product_cocacola.png',        bgColor: '#FDEDEC', price: 40,  originalPrice: 48,   rating: 4.6, reviewCount: 3421, qty: '750ml',      badge: 'REFRESHING',      description: 'The original refreshing cola. Best served ice cold.' },
  { id: 'e020', categoryKey: 'colddrinks',title: 'Sprite Lemon Lime',           emoji: '🍋', image: '/thums_up.png',                bgColor: '#E9F7EF', price: 40,  originalPrice: 48,   rating: 4.4, reviewCount: 2134, qty: '750ml',      badge: 'CHILLED',         description: 'Crisp, refreshing lemon-lime flavoured soft drink.' },

  // ── Breakfast ──
  { id: 'e021', categoryKey: 'breakfast', title: "Kellogg's Cornflakes",       emoji: '🥣', image: '/premium_biscuits.png',         bgColor: '#FEF9E7', price: 145, originalPrice: 172,  rating: 4.5, reviewCount: 1234, qty: '300g',       badge: 'HEALTHY',         description: 'Light and crispy corn flakes — the classic breakfast choice.' },
  { id: 'e022', categoryKey: 'breakfast', title: 'Saffola Oats',               emoji: '🌾', image: '/aashirvaad_atta.png',          bgColor: '#F9F4E8', price: 90,  originalPrice: 105,  rating: 4.4, reviewCount: 876,  qty: '500g',       badge: 'HEALTHY',         description: 'Rolled oats for a heart-healthy, filling breakfast bowl.' },
  { id: 'e023', categoryKey: 'breakfast', title: 'Sundrop Peanut Butter',      emoji: '🥜', image: '/kaju.jpg',                     bgColor: '#FEF5E7', price: 180, originalPrice: 215,  rating: 4.6, reviewCount: 654,  qty: '400g',       badge: 'HIGH PROTEIN',    description: 'Smooth and creamy peanut butter, high in protein.' },

  // ── Cooking Essentials ──
  { id: 'e024', categoryKey: 'cooking',   title: 'Tata Salt Iodised',          emoji: '🧂', image: '/tata_salt.png',               bgColor: '#EBF5FB', price: 28,  originalPrice: 32,   rating: 4.8, reviewCount: 4321, qty: '1 Kg',       badge: 'ESSENTIAL',       description: 'Pure vacuum evaporated iodised salt for a healthy diet.' },
  { id: 'e025', categoryKey: 'cooking',   title: 'Saffola Gold Oil',           emoji: '🫙', image: '/oil.jpg',                     bgColor: '#FEF9E7', price: 185, originalPrice: 220,  rating: 4.4, reviewCount: 876,  qty: '1 Litre',    badge: 'HEART CARE',      description: 'Blended edible vegetable oil with LOSORB technology.' },
  { id: 'e026', categoryKey: 'cooking',   title: 'Kissan Mixed Fruit Jam',     emoji: '🍯', image: '/kissan_mixed_fruit_jam.png',   bgColor: '#FDEDEC', price: 95,  originalPrice: 115,  rating: 4.5, reviewCount: 543,  qty: '500g',       badge: 'KIDS FAVOURITE',  description: 'Sweet and fruity jam made from real fruit pulp.' },

  // ── Household ──
  { id: 'e027', categoryKey: 'household', title: 'Surf Excel Easy Wash',       emoji: '🧺', image: '/product_surf.png',            bgColor: '#EBF5FB', price: 95,  originalPrice: 115,  rating: 4.6, reviewCount: 2134, qty: '500g',       badge: 'POPULAR',         description: 'Powerful detergent powder that removes tough stains easily.' },
  { id: 'e028', categoryKey: 'household', title: 'Vim Dishwash Liquid',        emoji: '🍶', image: '/vim_bar.png',                 bgColor: '#E9F7EF', price: 85,  originalPrice: 99,   rating: 4.4, reviewCount: 876,  qty: '500ml',      badge: 'EFFECTIVE',       description: 'Effective dishwashing liquid that cuts through grease effortlessly.' },
  { id: 'e029', categoryKey: 'household', title: 'Softouch Tissue Rolls',      emoji: '🧻', image: '/premium_cleaning.png',        bgColor: '#F2F3F4', price: 60,  originalPrice: 78,   rating: 4.3, reviewCount: 432,  qty: 'Pack of 4',  badge: 'SOFT & STRONG',   description: 'Soft and absorbent tissue paper rolls for everyday use.' },

  // ── Personal Care ──
  { id: 'e030', categoryKey: 'personal',  title: 'Dove Beauty Soap',           emoji: '🧼', image: '/premium_soap.png',            bgColor: '#EBF5FB', price: 45,  originalPrice: 55,   rating: 4.6, reviewCount: 3456, qty: '100g',       badge: 'BESTSELLER',      description: 'Dove moisturising beauty bar with ¼ moisturising cream for soft skin.' },
];

