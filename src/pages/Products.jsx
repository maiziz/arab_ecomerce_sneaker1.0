import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Paper,
  Container,
  Divider,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from '../components/ProductCard/ProductCard';
import PriceRangeFilter from '../components/Filters/PriceRangeFilter';
import { formatPrice } from '../utils/formatCurrency';

// Product data
const productData = [
  {
    id: 1,
    name: 'نايكي اير جوردن 1',
    price: 24999,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-jordan-1-mid-shoes-SQf7DM.png',
    description: 'حذاء رياضي كلاسيكي بتصميم أنيق',
    brand: 'نايكي',
    category: 'رياضي',
  },
  {
    id: 2,
    name: 'اديداس الترا بوست',
    price: 28999,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_Light_Shoes_Black_GX3062_01_standard.jpg',
    description: 'حذاء جري مريح مع تقنية بوست المتطورة',
    brand: 'اديداس',
    category: 'جري',
  },
  {
    id: 3,
    name: 'بوما سويد كلاسيك',
    price: 12999,
    image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/374915/01/sv01/fnd/IND/fmt/png/Suede-Classic-XXI-Sneakers',
    description: 'حذاء كاجوال كلاسيكي للاستخدام اليومي',
    brand: 'بوما',
    category: 'كاجوال',
  },
  {
    id: 4,
    name: 'نايكي اير ماكس 270',
    price: 22999,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png',
    description: 'حذاء رياضي خفيف مع وسادة هوائية',
    brand: 'نايكي',
    category: 'رياضي',
  },
  {
    id: 5,
    name: 'اديداس ستان سميث',
    price: 15999,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68ae7ea7849b43eca70aac1e00f5146d_9366/Stan_Smith_Shoes_White_FX5502_01_standard.jpg',
    description: 'حذاء كلاسيكي أنيق باللون الأبيض',
    brand: 'اديداس',
    category: 'كاجوال',
  },
  {
    id: 6,
    name: 'نيو بالانس 574',
    price: 18999,
    image: 'https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=440&hei=440',
    description: 'حذاء رياضي مريح للمشي اليومي',
    brand: 'نيو بالانس',
    category: 'رياضي',
  }
];

const Products = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState('الكل');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const brands = ['الكل', 'نايكي', 'اديداس', 'بوما', 'نيو بالانس'];
  const categories = ['الكل', 'رياضي', 'جري', 'كاجوال'];

  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'الكل' || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange[1];

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
  });

  return (
    <Box sx={{ minHeight: '100vh', py: 4, direction: 'rtl' }}>
      <Container maxWidth="xl">
        {/* Filter Section */}
        <Box 
          component="aside"
          sx={{ 
            width: 280,
            position: 'fixed',
            top: 80,
            right: { xs: 16, sm: 24, md: 40, lg: 80 },
            height: 'calc(100vh - 100px)',
            overflowY: 'auto',
            borderLeft: '1px solid #e0e0e0',
            pl: 3,
            pr: 2,
            pb: 4,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#555',
              },
            },
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3, 
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              color: '#1976d2',
              textAlign: 'right'
            }}
          >
            تصفية المنتجات
          </Typography>

          {/* Search Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
              البحث
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#666' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#f5f5f5',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Brand Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
              الماركة
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                sx={{ 
                  fontFamily: 'Cairo',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  textAlign: 'right',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                {brands.map(brand => (
                  <MenuItem key={brand} value={brand} sx={{ fontFamily: 'Cairo', textAlign: 'right' }}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Category Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
              الفئة
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ 
                  fontFamily: 'Cairo',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  textAlign: 'right',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category} sx={{ fontFamily: 'Cairo', textAlign: 'right' }}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Price Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
              السعر الأقصى
            </Typography>
            <Box sx={{ px: 2 }}>
              <PriceRangeFilter 
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                min={0}
                max={100000}
              />
            </Box>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box 
          component="main"
          sx={{ 
            marginRight: { xs: '300px', sm: '320px', md: '340px', lg: '380px' }
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ fontFamily: 'Cairo', mb: 1, textAlign: 'right' }}>
              تسوق الأحذية
            </Typography>
            <Typography sx={{ fontFamily: 'Cairo', color: '#666', textAlign: 'right' }}>
              {filteredProducts.length} منتج
            </Typography>
          </Box>

          {filteredProducts.length === 0 ? (
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 3
            }}>
              <Paper 
                sx={{ 
                  gridColumn: {
                    xs: 'span 1',
                    sm: 'span 2',
                    md: 'span 3',
                    lg: 'span 4'
                  },
                  height: '100%',
                  minHeight: 300,
                  bgcolor: 'background.default',
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 4,
                  direction: 'rtl',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontFamily: 'Cairo',
                    color: 'text.secondary',
                    mb: 2,
                    fontSize: {
                      xs: '2.4rem',
                      sm: '2.8rem',
                      md: '3rem'
                    },
                    textAlign: 'right',
                    fontWeight: 'bold'
                  }}
                >
                  عذراً، لم يتم العثور على منتجات
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{ 
                    fontFamily: 'Cairo',
                    color: 'text.disabled',
                    mb: 3,
                    fontSize: {
                      xs: '1.8rem',
                      sm: '2rem',
                      md: '2.2rem'
                    },
                    textAlign: 'right'
                  }}
                >
                  يرجى تعديل معايير البحث للحصول على نتائج
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="text"
                    sx={{ 
                      fontFamily: 'Cairo',
                      textTransform: 'none',
                      p: 0,
                      minWidth: 'auto',
                      color: 'primary.main',
                      fontSize: {
                        xs: '1.6rem',
                        sm: '1.8rem',
                        md: '2rem'
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBrand('الكل');
                      setSelectedCategory('الكل');
                      setPriceRange([0, 100000]);
                    }}
                  >
                    إعادة تعيين الفلاتر
                  </Button>
                </Box>
              </Paper>
            </Box>
          ) : (
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)'
              },
              gap: 3
            }}>
              {filteredProducts.map((product) => (
                <Box 
                  key={product.id}
                  sx={{
                    height: '100%',
                    display: 'flex'
                  }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={onAddToCart}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
