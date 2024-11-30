export const categories = [
  'رياضي',
  'كاجوال',
  'كلاسيكي',
  'أحذية الجري',
  'أحذية كرة القدم'
];

export const brands = [
  { id: 'nike', name: 'Nike', nameAr: 'نايك' },
  { id: 'adidas', name: 'Adidas', nameAr: 'اديداس' },
  { id: 'puma', name: 'Puma', nameAr: 'بوما' },
  { id: 'newbalance', name: 'New Balance', nameAr: 'نيو بالانس' },
  { id: 'reebok', name: 'Reebok', nameAr: 'ريبوك' }
];

export const availableSizes = [
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45'
];

export const productData = [
  {
    id: 1,
    name: 'نايك اير جوردن 1 هاي',
    brand: 'Nike',
    brandAr: 'نايك',
    category: 'رياضي',
    price: 24999,
    image: '/images/hero-shoe.png',
    description: 'حذاء نايك اير جوردن 1 هاي الأصلي، تصميم كلاسيكي مع راحة استثنائية',
    colors: [
      { name: 'أحمر', code: '#FF0000', available: true },
      { name: 'أسود', code: '#000000', available: true },
      { name: 'أبيض', code: '#FFFFFF', available: true }
    ],
    sizes: [
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true },
      { size: '44', available: true }
    ],
    inStock: true,
    isNewArrival: true,
    discount: null
  },
  {
    id: 2,
    name: 'نايك اير ماكس 90',
    brand: 'Nike',
    brandAr: 'نايك',
    category: 'رياضي',
    price: 22999,
    image: '/images/hero-shoe-2.png',
    description: 'حذاء نايك اير ماكس 90 مع وحدة هواء مرئية للراحة القصوى',
    colors: [
      { name: 'أزرق', code: '#0000FF', available: true },
      { name: 'رمادي', code: '#808080', available: true }
    ],
    sizes: [
      { size: '39', available: true },
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true }
    ],
    inStock: true,
    isNewArrival: true,
    discount: null
  },
  {
    id: 3,
    name: 'نايك اير فورس 1',
    brand: 'Nike',
    brandAr: 'نايك',
    category: 'كاجوال',
    price: 19999,
    image: '/images/hero-shoe-3.png',
    description: 'حذاء نايك اير فورس 1 الكلاسيكي، أناقة وراحة في كل خطوة',
    colors: [
      { name: 'أبيض', code: '#FFFFFF', available: true },
      { name: 'أسود', code: '#000000', available: true }
    ],
    sizes: [
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true }
    ],
    inStock: true,
    isNewArrival: true,
    discount: null
  },
  {
    id: 4,
    name: 'نايك دنك لو',
    brand: 'Nike',
    brandAr: 'نايك',
    category: 'كاجوال',
    price: 21999,
    image: '/images/hero-shoe-4.png',
    description: 'حذاء نايك دنك لو بتصميم عصري وألوان جذابة',
    colors: [
      { name: 'أخضر', code: '#008000', available: true },
      { name: 'أبيض', code: '#FFFFFF', available: true }
    ],
    sizes: [
      { size: '39', available: true },
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true }
    ],
    inStock: true,
    isNewArrival: true,
    discount: null
  },
  {
    id: 5,
    name: 'اديداس سوبرستار',
    brand: 'Adidas',
    brandAr: 'اديداس',
    category: 'كاجوال',
    price: 18999,
    image: '/images/hero-shoe-5.png',
    description: 'حذاء اديداس سوبرستار الأيقوني مع الأشرطة الثلاثة المميزة',
    colors: [
      { name: 'أبيض', code: '#FFFFFF', available: true },
      { name: 'أسود', code: '#000000', available: true }
    ],
    sizes: [
      { size: '38', available: true },
      { size: '39', available: true },
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true }
    ],
    inStock: true,
    isNewArrival: true,
    discount: null
  },
  {
    id: 6,
    name: 'اديداس ستان سميث',
    brand: 'Adidas',
    brandAr: 'اديداس',
    category: 'كلاسيكي',
    price: 17999,
    image: '/images/hero-shoe-6.png',
    description: 'حذاء اديداس ستان سميث الكلاسيكي بتصميم نظيف وأنيق',
    colors: [
      { name: 'أبيض', code: '#FFFFFF', available: true },
      { name: 'أخضر', code: '#008000', available: true }
    ],
    sizes: [
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true }
    ],
    inStock: true,
    isNewArrival: true,
    discount: null
  },
  {
    id: 7,
    name: 'بوما ألترا بوست',
    brand: 'Puma',
    brandAr: 'بوما',
    category: 'أحذية الجري',
    price: 27999,
    image: '/images/hero-shoe-7.png',
    description: 'حذاء بوما ألترا بوست للجري مع تقنية متطورة للراحة القصوى',
    colors: [
      { name: 'أسود', code: '#000000', available: true },
      { name: 'رمادي', code: '#808080', available: true }
    ],
    sizes: [
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true },
      { size: '44', available: true }
    ],
    inStock: true,
    isNewArrival: false,
    discount: 30
  },
  {
    id: 8,
    name: 'نيو بالانس 574',
    brand: 'New Balance',
    brandAr: 'نيو بالانس',
    category: 'كاجوال',
    price: 23999,
    image: '/images/hero-shoe-8.png',
    description: 'حذاء نيو بالانس 574 بتصميم كلاسيكي وراحة فائقة',
    colors: [
      { name: 'أبيض', code: '#FFFFFF', available: true },
      { name: 'أسود', code: '#000000', available: true }
    ],
    sizes: [
      { size: '39', available: true },
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true }
    ],
    inStock: true,
    isNewArrival: false,
    discount: 25
  },
  {
    id: 9,
    name: 'ريبوك كلاسيك',
    brand: 'Reebok',
    brandAr: 'ريبوك',
    category: 'كاجوال',
    price: 19999,
    image: '/images/hero-shoe-9.png',
    description: 'حذاء ريبوك كلاسيك بتصميم عصري وراحة فائقة',
    colors: [
      { name: 'أبيض', code: '#FFFFFF', available: true },
      { name: 'أسود', code: '#000000', available: true }
    ],
    sizes: [
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true }
    ],
    inStock: true,
    isNewArrival: false,
    discount: 20
  },
  {
    id: 10,
    name: 'نايك ريفولوشن 6',
    brand: 'Nike',
    brandAr: 'نايك',
    category: 'أحذية الجري',
    price: 16999,
    image: '/images/hero-shoe-10.png',
    description: 'حذاء نايك ريفولوشن 6 للجري اليومي والتدريب',
    colors: [
      { name: 'أسود', code: '#000000', available: true },
      { name: 'رمادي', code: '#808080', available: true }
    ],
    sizes: [
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true }
    ],
    inStock: true,
    isNewArrival: false,
    discount: 35
  },
  {
    id: 11,
    name: 'اديداس جازيل',
    brand: 'Adidas',
    brandAr: 'اديداس',
    category: 'كلاسيكي',
    price: 21999,
    image: '/images/hero-shoe-11.png',
    description: 'حذاء اديداس جازيل الكلاسيكي بتصميم رياضي أنيق',
    colors: [
      { name: 'أزرق', code: '#0000FF', available: true },
      { name: 'أسود', code: '#000000', available: true }
    ],
    sizes: [
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true }
    ],
    inStock: true,
    isNewArrival: false,
    discount: 40
  },
  {
    id: 12,
    name: 'بوما سويد كلاسيك',
    brand: 'Puma',
    brandAr: 'بوما',
    category: 'كلاسيكي',
    price: 25999,
    image: '/images/hero-shoe-12.png',
    description: 'حذاء بوما سويد كلاسيك بتصميم أنيق وخامات فاخرة',
    colors: [
      { name: 'أسود', code: '#000000', available: true },
      { name: 'أحمر', code: '#FF0000', available: true }
    ],
    sizes: [
      { size: '40', available: true },
      { size: '41', available: true },
      { size: '42', available: true },
      { size: '43', available: true }
    ],
    inStock: true,
    isNewArrival: false,
    discount: 30
  }
];

// Helper function to get new arrivals
export const newArrivals = productData.filter(product => product.isNewArrival);

// Helper function to get products with promotions
export const promotions = productData.filter(product => product.discount !== null);

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return productData.filter(product => product.category === category);
};

// Helper function to get products by brand
export const getProductsByBrand = (brand) => {
  return productData.filter(product => product.brand === brand);
};

// Helper function to get available colors for a product
export const getAvailableColors = (productId) => {
  const product = productData.find(p => p.id === productId);
  return product ? product.colors.filter(color => color.available) : [];
};

// Helper function to get available sizes for a product
export const getAvailableSizes = (productId) => {
  const product = productData.find(p => p.id === productId);
  return product ? product.sizes.filter(size => size.available) : [];
};
