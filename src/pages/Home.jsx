import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ProductCard from '../components/ProductCard/ProductCard';

const featuredProducts = [
  {
    id: 1,
    name: 'حذاء رياضي أديداس',
    description: 'حذاء رياضي مريح مناسب للجري والتمارين الرياضية',
    price: 499,
    image: 'https://example.com/sneaker1.jpg'
  },
  {
    id: 2,
    name: 'نايكي اير ماكس',
    description: 'حذاء عصري بتصميم أنيق ومريح للغاية',
    price: 599,
    image: 'https://example.com/sneaker2.jpg'
  },
  // Add more products as needed
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
