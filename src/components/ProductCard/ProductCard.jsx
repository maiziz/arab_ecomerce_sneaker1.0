import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Box
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card 
      sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <Box sx={{ position: 'relative', height: 200, bgcolor: '#f5f5f5' }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{
            height: '100%',
            objectFit: 'contain',
            p: 2
          }}
        />
      </Box>
      <CardContent 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          pb: 0
        }}
      >
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            textAlign: 'right',
            fontSize: '1rem',
            mb: 1,
            minHeight: '48px'
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            fontFamily: 'Cairo',
            textAlign: 'right',
            mb: 'auto',
            minHeight: '40px'
          }}
        >
          {product.description}
        </Typography>
        <Typography 
          variant="h6" 
          color="primary"
          sx={{ 
            fontFamily: 'Cairo',
            textAlign: 'right',
            mt: 2,
            direction: 'rtl'
          }}
        >
          {product.price} درهم
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 1 }}>
        <Button 
          fullWidth 
          variant="contained"
          onClick={() => onAddToCart(product)}
          sx={{
            fontFamily: 'Cairo',
            textTransform: 'none',
            py: 1
          }}
        >
          إضافة إلى السلة
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
