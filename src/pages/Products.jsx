import React, { useState, useMemo } from 'react';
import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';
import FilterPanel from '../components/FilterPanel/FilterPanel';

const products = [
  {
    id: 1,
    name: 'حذاء رياضي أديداس',
    description: 'حذاء رياضي مريح مناسب للجري والتمارين الرياضية',
    price: 499,
    image: '/images/sneaker1.jpg',
    brand: 'adidas'
  },
  {
    id: 2,
    name: 'نايكي اير ماكس',
    description: 'حذاء عصري بتصميم أنيق ومريح للغاية',
    price: 599,
    image: '/images/sneaker2.jpg',
    brand: 'nike'
  },
  {
    id: 3,
    name: 'بوما سويد كلاسيك',
    description: 'حذاء كلاسيكي بتصميم عصري وخامات فاخرة',
    price: 449,
    image: '/images/sneaker3.jpg',
    brand: 'puma'
  },
  {
    id: 4,
    name: 'ريبوك كلاسيك',
    description: 'حذاء رياضي كلاسيكي مناسب للاستخدام اليومي',
    price: 399,
    image: '/images/sneaker4.jpg',
    brand: 'reebok'
  },
  {
    id: 5,
    name: 'نيو بالانس 574',
    description: 'حذاء رياضي مريح مع دعم ممتاز للقدم',
    price: 549,
    image: '/images/sneaker5.jpg',
    brand: 'newBalance'
  },
  {
    id: 6,
    name: 'أندر آرمور هوفر',
    description: 'حذاء رياضي خفيف مع تقنية امتصاص الصدمات',
    price: 649,
    image: '/images/sneaker6.jpg',
    brand: 'underArmour'
  },
  {
    id: 7,
    name: 'نايكي زوم',
    description: 'حذاء رياضي خفيف مثالي للركض',
    price: 799,
    image: '/images/sneaker7.jpg',
    brand: 'nike'
  },
  {
    id: 8,
    name: 'أديداس ألترا بوست',
    description: 'حذاء رياضي مع تقنية بوست المتطورة',
    price: 899,
    image: '/images/sneaker8.jpg',
    brand: 'adidas'
  }
];

const Products = ({ onAddToCart }) => {
  const [priceRange, setPriceRange] = useState([0, 759]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchesPrice && matchesBrand;
    });
  }, [priceRange, selectedBrands]);

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrands(prev => {
      if (prev.includes(brandId)) {
        return prev.filter(b => b !== brandId);
      }
      return [...prev, brandId];
    });
  };

  return (
    <Box 
      sx={{ 
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        pt: { xs: 8, sm: 10 },
      }}
    >
      {/* Title Section */}
      <Container 
        maxWidth={false}
        sx={{
          backgroundColor: '#fff',
          py: 4,
          borderBottom: '1px solid #eee',
          mb: 3
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '1800px',
            margin: '0 auto',
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontFamily: 'Cairo', 
              textAlign: 'center',
              color: '#333',
              fontWeight: 'bold',
              mb: 1
            }}
          >
            منتجاتنا
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Cairo', 
              color: '#666',
              textAlign: 'center'
            }}
          >
            تشكيلة متنوعة من أفضل الأحذية الرياضية
          </Typography>
        </Box>
      </Container>

      {/* Main Content */}
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 3,
            maxWidth: '1800px',
            margin: '0 auto'
          }}
        >
          {/* Filter Panel */}
          <Box 
            sx={{ 
              width: 280,
              flexShrink: 0,
              position: 'sticky',
              top: 100,
              height: 'fit-content'
            }}
          >
            <FilterPanel
              priceRange={priceRange}
              selectedBrands={selectedBrands}
              onPriceChange={handlePriceChange}
              onBrandChange={handleBrandChange}
            />
          </Box>

          {/* Results Section */}
          <Box 
            sx={{ 
              flexGrow: 1,
              minWidth: 0,
              width: 'calc(100% - 280px - 24px)'
            }}
          >
            {/* Results Header */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                backgroundColor: '#fff',
                border: '1px solid #eee',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography 
                sx={{ 
                  fontFamily: 'Cairo',
                  color: '#666',
                  fontSize: '1.1rem'
                }}
              >
                {filteredProducts.length} منتج
              </Typography>
            </Paper>

            {/* Results Grid */}
            {filteredProducts.length > 0 ? (
              <Grid 
                container 
                spacing={3}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                    xl: 'repeat(4, 1fr)'
                  },
                  width: '100%',
                  minHeight: '400px',
                  alignItems: 'start',
                  gap: 3
                }}
              >
                {filteredProducts.map((product) => (
                  <Grid 
                    item 
                    key={product.id}
                    sx={{
                      minWidth: { sm: '300px' }
                    }}
                  >
                    <ProductCard product={product} onAddToCart={onAddToCart} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid 
                container 
                spacing={3}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)',
                    xl: 'repeat(4, 1fr)'
                  },
                  width: '100%',
                  minHeight: '400px',
                  alignItems: 'start',
                  gap: 3
                }}
              >
                <Grid 
                  item
                  sx={{
                    gridColumn: { xs: '1 / -1', sm: '1 / 3', lg: '1 / 3', xl: '1 / 3' },
                    gridRow: 'span 2',
                    minWidth: { sm: '600px' }
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{ 
                      backgroundColor: '#fff',
                      borderRadius: 1,
                      border: '1px solid #eee',
                      height: '300px', 
                      display: 'flex',
                      flexDirection: 'row', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4 
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/no-results.png"
                      alt="لا توجد نتائج"
                      sx={{
                        width: '120px',
                        height: '120px',
                        opacity: 0.6
                      }}
                    />
                    <Box sx={{ maxWidth: '60%' }}>
                      <Typography 
                        variant="h6"
                        sx={{ 
                          fontFamily: 'Cairo',
                          color: '#666',
                          textAlign: 'right',
                          fontWeight: 500,
                          mb: 1
                        }}
                      >
                        لا توجد منتجات تطابق معايير البحث
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Cairo',
                          color: '#888',
                          textAlign: 'right',
                          fontSize: '0.875rem'
                        }}
                      >
                        حاول تغيير معايير البحث للحصول على نتائج مختلفة
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
