import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button, Paper, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductCard from '../components/ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { productData } from '../data/products';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #303f9f 90%)',
  color: 'white',
  padding: theme.spacing(10, 0),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: '50%',
    background: 'url("/hero-bg.png") no-repeat center',
    backgroundSize: 'contain',
    opacity: 0.1,
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const CategoryCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  height: 200,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}));

const features = [
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
    title: 'شحن سريع',
    description: 'توصيل مجاني لجميع الطلبات'
  },
  {
    icon: <SecurityOutlinedIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
    title: 'ضمان الجودة',
    description: 'منتجات أصلية 100%'
  },
  {
    icon: <SupportAgentOutlinedIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
    title: 'دعم العملاء',
    description: 'متوفر على مدار الساعة'
  }
];

const categories = [
  { id: 1, name: 'رياضي', image: '/category-sports.jpg' },
  { id: 2, name: 'جري', image: '/category-running.jpg' },
  { id: 3, name: 'كاجوال', image: '/category-casual.jpg' }
];

const Home = ({ onAddToCart }) => {
  const location = useLocation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (location.state?.orderSuccess) {
      setSnackbarMessage(location.state.message);
      setOpenSnackbar(true);
      // Clean up the state after showing the message
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const featuredProducts = productData ? productData.slice(0, 4) : [];

  return (
    <>
      <Box sx={{ pb: 8 }}>
        {/* Hero Section */}
        <Container maxWidth="xl">
          <HeroSection>
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" component="h1" sx={{ fontFamily: 'Cairo', mb: 2, fontWeight: 'bold' }}>
                    أحدث الأحذية الرياضية
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: 'Cairo', mb: 4, opacity: 0.9 }}>
                    اكتشف تشكيلتنا الواسعة من الأحذية الرياضية العصرية
                  </Typography>
                  <Button
                    component={Link}
                    to="/products"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: 'white',
                      color: '#1a237e',
                      px: 4,
                      py: 1.5,
                      fontFamily: 'Cairo',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    تسوق الآن
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </HeroSection>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center" 
              sx={{ 
                mb: 6,
                fontFamily: 'Cairo',
                fontWeight: 'bold',
                color: '#1a237e'
              }}
            >
              لماذا تختارنا؟
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <FeatureCard>
                    <CardContent sx={{ p: 4 }}>
                      {feature.icon}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mt: 2,
                          mb: 1,
                          fontFamily: 'Cairo',
                          fontWeight: 'bold',
                          color: '#1a237e'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1"
                        sx={{ 
                          color: '#666',
                          fontFamily: 'Cairo'
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Featured Products */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center"
              sx={{ 
                mb: 6,
                fontFamily: 'Cairo',
                fontWeight: 'bold',
                color: '#1a237e'
              }}
            >
              منتجات مميزة
            </Typography>
            <Grid container spacing={4}>
              {featuredProducts.map(product => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Categories */}
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              component="h2" 
              align="center"
              sx={{ 
                mb: 6,
                fontFamily: 'Cairo',
                fontWeight: 'bold',
                color: '#1a237e'
              }}
            >
              تصفح حسب الفئة
            </Typography>
            <Grid container spacing={4}>
              {categories.map(category => (
                <Grid item xs={12} md={4} key={category.id}>
                  <CategoryCard>
                    <Box
                      component={Link}
                      to={`/products?category=${category.name}`}
                      sx={{
                        display: 'block',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'inherit',
                        position: 'relative'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `url(${category.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                          }
                        }}
                      />
                      <Box
                        sx={{
                          position: 'relative',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 3
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            color: 'white',
                            fontFamily: 'Cairo',
                            fontWeight: 'bold',
                            textAlign: 'center'
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Box>
                    </Box>
                  </CategoryCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Success Message Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: '100%',
            fontFamily: 'Cairo',
            '& .MuiAlert-message': {
              textAlign: 'right'
            }
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
