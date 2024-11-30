import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button, 
  Box,
  Rating,
  Skeleton
} from '@mui/material';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatCurrency';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductCard = ({ product, onAddToCart }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  if (!product) {
    console.error('Product data is missing');
    return null;
  }

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          paddingTop: '100%', // 1:1 Aspect ratio
          width: '100%',
          backgroundColor: '#f5f5f5'
        }}
      >
        {!imageLoaded && (
          <Skeleton 
            variant="rectangular" 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }} 
          />
        )}
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
            objectFit: 'contain',
            p: 2,
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
        />
      </Box>

      <CardContent 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 2,
          '&:last-child': { pb: 2 }
        }}
      >
        <Link 
          to={`/product/${product.id}`}
          style={{ 
            textDecoration: 'none',
            color: 'inherit',
            display: 'block',
            flexGrow: 1
          }}
        >
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontFamily: 'Cairo',
              fontSize: '1.1rem',
              fontWeight: 600,
              mb: 1,
              textAlign: 'right',
              minHeight: '2.5em',
              lineHeight: 1.2,
              color: '#1a237e'
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
            mb: 1
          }}>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                fontFamily: 'Cairo',
                direction: 'rtl'
              }}
            >
              ({product.reviews})
            </Typography>
            <Rating 
              value={product.rating} 
              readOnly 
              size="small"
              dir="ltr"
            />
          </Box>

          <Typography 
            variant="h6" 
            color="primary"
            sx={{ 
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              textAlign: 'right',
              mb: 1,
              color: '#1a237e'
            }}
          >
            {formatPrice(product.price)}
          </Typography>
        </Link>

        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product)}
          startIcon={<ShoppingCartIcon />}
          sx={{
            mt: 'auto',
            backgroundColor: '#1a237e',
            fontFamily: 'Cairo',
            '&:hover': {
              backgroundColor: '#0d1642'
            }
          }}
        >
          أضف إلى السلة
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
