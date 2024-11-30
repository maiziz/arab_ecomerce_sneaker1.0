import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Rating, 
  Chip, 
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import { productData } from '../data/products';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState('');

  // Find the product by ID
  const product = productData.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          المنتج غير موجود
        </Typography>
      </Container>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Validate selections
    if (!selectedSize) {
      setError('الرجاء اختيار المقاس');
      setOpenSnackbar(true);
      return;
    }
    if (!selectedColor) {
      setError('الرجاء اختيار اللون');
      setOpenSnackbar(true);
      return;
    }

    if (addToCart) {
      addToCart(product, selectedSize, selectedColor);
      setError('');
      setOpenSnackbar(true);
      console.log('Adding to cart:', { product, size: selectedSize, color: selectedColor }); // Debug log
    } else {
      console.error('addToCart function is not defined in ProductDetail');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, direction: 'rtl' }}>
      <IconButton 
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: 'relative',
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              overflow: 'hidden',
              height: '500px',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                display: 'flex',
                gap: 1,
              }}
            >
              <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }}>
                <FavoriteBorderIcon />
              </IconButton>
              <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'white' } }}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} readOnly />
              <Typography variant="body2" sx={{ mr: 1 }}>
                ({product.reviews} تقييم)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
              {product.price.toLocaleString()} د.ج
            </Typography>

            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>

            {/* Size Selection */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              المقاس:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {product.sizes?.map((size) => (
                <Chip
                  key={size}
                  label={size}
                  onClick={() => setSelectedSize(size)}
                  variant={selectedSize === size ? "filled" : "outlined"}
                  color={selectedSize === size ? "primary" : "default"}
                  sx={{ minWidth: '60px' }}
                />
              ))}
            </Box>

            {/* Color Selection */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              اللون:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
              {product.colors?.map((color) => (
                <Chip
                  key={color}
                  label={color}
                  onClick={() => setSelectedColor(color)}
                  variant={selectedColor === color ? "filled" : "outlined"}
                  color={selectedColor === color ? "primary" : "default"}
                />
              ))}
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                mt: 'auto',
                bgcolor: '#1a237e',
                '&:hover': {
                  bgcolor: '#0d1642',
                },
                py: 1.5,
              }}
            >
              أضف إلى السلة
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? "error" : "success"}
          sx={{ 
            width: '100%',
            fontFamily: 'Cairo',
            '& .MuiAlert-message': {
              textAlign: 'right'
            }
          }}
        >
          {error || 'تمت إضافة المنتج إلى السلة'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;
