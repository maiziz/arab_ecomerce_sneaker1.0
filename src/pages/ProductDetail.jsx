import React, { useState, useCallback, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Button, Rating, Chip, IconButton, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { formatPrice } from '../utils/formatCurrency';
import { productData } from '../data/products';

const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '8px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const ThumbnailImage = styled('img')({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '0 8px',
  border: '2px solid transparent',
  '&.active': {
    border: '2px solid #1a237e',
  },
});

const SizeButton = styled(Button)(({ theme, selected }) => ({
  minWidth: '60px',
  margin: '0 8px 8px 0',
  backgroundColor: selected ? '#1a237e' : 'transparent',
  color: selected ? 'white' : '#1a237e',
  border: '1px solid #1a237e',
  '&:hover': {
    backgroundColor: selected ? '#1a237e' : 'rgba(26, 35, 126, 0.1)',
  },
}));

const ColorChip = styled(Chip)(({ selected }) => ({
  margin: '0 8px 8px 0',
  border: selected ? '2px solid #1a237e' : 'none',
  '&:hover': {
    backgroundColor: 'rgba(26, 35, 126, 0.1)',
  },
}));

const ProductDetail = ({ onAddToCart, cartItems }) => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState({});

  const product = useMemo(() => 
    productData.find(p => p.id === Number(id)), 
    [id]
  );

  const allImages = useMemo(() => 
    product ? [product.image, ...product.additionalImages] : [],
    [product]
  );

  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  const handleColorSelect = useCallback((color) => {
    setSelectedColor(color);
  }, []);

  const handleImageSelect = useCallback((index) => {
    setSelectedImage(index);
    setMainImageLoaded(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product && selectedSize && selectedColor) {
      onAddToCart({
        ...product,
        selectedSize,
        selectedColor
      });
    }
  }, [product, selectedSize, selectedColor, onAddToCart]);

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ my: 4 }}>
          المنتج غير موجود
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb Navigation */}
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <Link to="/products" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <ArrowBackIcon sx={{ ml: 1 }} />
          <Typography variant="body1">العودة إلى المنتجات</Typography>
        </Link>
      </Box>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            {!mainImageLoaded && (
              <Skeleton 
                variant="rectangular" 
                width="100%" 
                height={400} 
                animation="wave" 
              />
            )}
            <ProductImage 
              src={allImages[selectedImage]} 
              alt={product.name} 
              onLoad={() => setMainImageLoaded(true)}
              sx={{ display: mainImageLoaded ? 'block' : 'none' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {allImages.map((img, index) => (
              <ThumbnailImage
                key={index}
                src={img}
                alt={`${product.name} - ${index + 1}`}
                className={selectedImage === index ? 'active' : ''}
                onLoad={() => setThumbnailsLoaded(prevState => ({ ...prevState, [index]: true }))}
                sx={{ display: thumbnailsLoaded[index] ? 'block' : 'none' }}
                onClick={() => handleImageSelect(index)}
              />
            ))}
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ mr: 1 }}>
              ({product.reviews} تقييم)
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
            {formatPrice(product.price)}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {/* Colors */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              الألوان المتوفرة:
            </Typography>
            <Box>
              {product.colors.map((color) => (
                <ColorChip
                  key={color}
                  label={color}
                  onClick={() => handleColorSelect(color)}
                  selected={selectedColor === color}
                />
              ))}
            </Box>
          </Box>

          {/* Sizes */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              المقاسات المتوفرة:
            </Typography>
            <Box>
              {product.sizes.map((size) => (
                <SizeButton
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  selected={selectedSize === size}
                >
                  {size}
                </SizeButton>
              ))}
            </Box>
          </Box>

          {/* Features */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              المميزات:
            </Typography>
            <ul style={{ paddingRight: '20px', margin: 0 }}>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!selectedSize || !selectedColor}
            onClick={handleAddToCart}
          >
            إضافة إلى السلة
          </Button>

          {/* Stock Status */}
          <Typography variant="body2" color="success.main" sx={{ mt: 2, textAlign: 'center' }}>
            {product.stockStatus}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
