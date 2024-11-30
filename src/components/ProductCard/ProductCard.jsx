import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Rating
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatCurrency';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  if (!product) {
    console.error('Product data is missing');
    return null;
  }

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      onClick={handleProductClick}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          '& .MuiCardMedia-root': {
            transform: 'scale(1.05)',
          }
        },
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'all 0.3s ease',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            color: '#1a237e',
            textAlign: 'right',
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'flex-end' }}>
          <Rating value={product.rating} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            ({product.reviews})
          </Typography>
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: '#1a237e',
            textAlign: 'right',
          }}
        >
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
