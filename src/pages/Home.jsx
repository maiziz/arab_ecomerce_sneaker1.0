import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: 'نايكي اير جوردن 1',
    description: 'حذاء رياضي كلاسيكي بتصميم أنيق',
    price: 24999,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-jordan-1-mid-shoes-SQf7DM.png'
  },
  {
    id: 2,
    name: 'اديداس الترا بوست',
    description: 'حذاء جري مريح مع تقنية بوست المتطورة',
    price: 28999,
    image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/69cbc73d0cb846889f89acbb011e68cb_9366/Ultraboost_Light_Shoes_Black_GX3062_01_standard.jpg'
  },
  {
    id: 3,
    name: 'نايكي اير ماكس 270',
    description: 'حذاء رياضي خفيف مع وسادة هوائية',
    price: 22999,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-shoes-2V5C4p.png'
  }
];

const Home = ({ onAddToCart }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 10, sm: 12 }, direction: 'rtl' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontFamily: 'Cairo', mb: 2 }}>
          أهلاً بك في متجر الأحذية العربي
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', color: 'text.secondary' }}>
          اكتشف أحدث تشكيلة من الأحذية الرياضية العصرية
        </Typography>
      </Box>
      
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Cairo' }}>
        المنتجات المميزة
      </Typography>
      
      <Grid container spacing={3}>
        {featuredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
