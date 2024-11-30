import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        },
        position: 'relative',
        borderRadius: 2,
        overflow: 'visible'
      }}
    >
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'white',
            color: '#f50057'
          },
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
        size="small"
      >
        <FavoriteBorderIcon fontSize="small" />
      </IconButton>

      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ 
          objectFit: 'contain',
          backgroundColor: '#f5f5f5',
          p: 2
        }}
      />
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 2,
          '&:last-child': {
            pb: 2
          }
        }}
      >
        <Typography 
          variant="h6" 
          component="h2"
          sx={{ 
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            textAlign: 'right',
            fontSize: '1.1rem',
            mb: 1,
            color: '#333'
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            fontFamily: 'Cairo',
            textAlign: 'right',
            color: '#666',
            fontSize: '0.9rem',
            lineHeight: 1.5
          }}
        >
          {product.description}
        </Typography>
        <Box 
          sx={{ 
            mt: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Button
            variant="contained"
            onClick={() => onAddToCart(product)}
            sx={{ 
              fontFamily: 'Cairo',
              backgroundColor: '#2196f3',
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              '&:hover': {
                backgroundColor: '#1976d2'
              }
            }}
            startIcon={<AddShoppingCartIcon />}
          >
            أضف للسلة
          </Button>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              color: '#2196f3',
              direction: 'rtl'
            }}
          >
            {product.price} ر.س
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
