import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Chip, 
  IconButton,
  Snackbar,
  Alert,
  Divider
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

    // Check if selected size and color are available
    const sizeAvailable = product.sizes.find(s => s.size === selectedSize)?.available;
    const colorAvailable = product.colors.find(c => c.name === selectedColor)?.available;

    if (!sizeAvailable || !colorAvailable) {
      setError('عذراً، هذا المقاس أو اللون غير متوفر حالياً');
      setOpenSnackbar(true);
      return;
    }

    // Calculate final price with discount
    const finalPrice = product.discount 
      ? product.price * (1 - product.discount / 100) 
      : product.price;

    if (addToCart) {
      addToCart(product, selectedSize, selectedColor, finalPrice);
      setError('تمت إضافة المنتج إلى السلة');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // Calculate the final price after discount
  const finalPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

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
            {/* Product Badges */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              {product.discount && (
                <Chip
                  label={`خصم ${product.discount}%`}
                  sx={{
                    bgcolor: '#d32f2f',
                    color: 'white',
                    fontWeight: 'bold',
                    '& .MuiChip-label': {
                      px: 2,
                    },
                  }}
                />
              )}
              {product.isNewArrival && (
                <Chip
                  label="وصل حديثاً"
                  sx={{
                    bgcolor: '#1a237e',
                    color: 'white',
                    fontWeight: 'bold',
                    '& .MuiChip-label': {
                      px: 2,
                    },
                  }}
                />
              )}
            </Box>
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
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  bgcolor: '#f5f5f5', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 1,
                  mr: 2
                }}
              >
                {product.brand}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  bgcolor: '#f5f5f5', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 1 
                }}
              >
                {product.category}
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {Math.round(finalPrice).toLocaleString()} د.ج
              </Typography>
              {product.discount && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textDecoration: 'line-through',
                    color: 'text.secondary'
                  }}
                >
                  {product.price.toLocaleString()} د.ج
                </Typography>
              )}
            </Box>

            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Color Selection */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              اللون:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {product.colors.map((color) => (
                <Box
                  key={color.name}
                  onClick={() => color.available && setSelectedColor(color.name)}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: color.code,
                    borderRadius: '50%',
                    cursor: color.available ? 'pointer' : 'not-allowed',
                    border: selectedColor === color.name ? '2px solid #1a237e' : '2px solid transparent',
                    opacity: color.available ? 1 : 0.5,
                    position: 'relative',
                    '&:hover': {
                      transform: color.available ? 'scale(1.1)' : 'none',
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                />
              ))}
            </Box>

            {/* Size Selection */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
              المقاس:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
              {product.sizes.map((sizeObj) => (
                <Chip
                  key={sizeObj.size}
                  label={sizeObj.size}
                  onClick={() => sizeObj.available && setSelectedSize(sizeObj.size)}
                  variant={selectedSize === sizeObj.size ? "filled" : "outlined"}
                  color={selectedSize === sizeObj.size ? "primary" : "default"}
                  sx={{ 
                    minWidth: '60px',
                    opacity: sizeObj.available ? 1 : 0.5,
                    cursor: sizeObj.available ? 'pointer' : 'not-allowed'
                  }}
                  disabled={!sizeObj.available}
                />
              ))}
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              sx={{
                mt: 'auto',
                bgcolor: '#1a237e',
                color: 'white',
                py: 1.5,
                '&:hover': {
                  bgcolor: '#0d47a1'
                }
              }}
            >
              {product.inStock ? 'إضافة إلى السلة' : 'غير متوفر'}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={error ? "error" : "success"} 
          sx={{ width: '100%' }}
        >
          {error || 'تمت إضافة المنتج إلى السلة'}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;
