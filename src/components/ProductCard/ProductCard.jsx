import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box,
  Rating,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../utils/formatCurrency';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
          '& .view-details': {
            opacity: 1,
          }
        },
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ position: 'relative', pt: '100%' }}>
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
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* View Details Overlay */}
        <Box
          className="view-details"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          <Chip
            icon={<VisibilityIcon />}
            label="عرض التفاصيل"
            sx={{
              bgcolor: 'white',
              color: '#1a237e',
              fontFamily: 'Cairo',
              '& .MuiChip-icon': {
                color: '#1a237e'
              }
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 1,
            fontWeight: 'bold',
            color: '#1a237e',
            textAlign: 'right',
            fontFamily: 'Cairo',
          }}
        >
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'flex-end' }}>
          <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary', fontFamily: 'Cairo' }}>
            ({product.reviews} تقييم)
          </Typography>
          <Rating value={product.rating} readOnly size="small" />
        </Box>

        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: '#1a237e',
            textAlign: 'right',
            fontFamily: 'Cairo',
          }}
        >
          {formatPrice(product.price)} د.ج
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
