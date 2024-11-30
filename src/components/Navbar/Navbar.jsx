import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ cartItemCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        bgcolor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo/Home Link */}
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate('/')}
            sx={{
              color: '#1a237e',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Cairo',
              fontSize: '1.5rem',
              '&:hover': {
                color: '#0d1642'
              }
            }}
          >
            Arab Sneaker
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Products Link */}
            <Typography
              onClick={() => navigate('/products')}
              sx={{
                color: '#1a237e',
                cursor: 'pointer',
                fontFamily: 'Cairo',
                fontWeight: 500,
                '&:hover': {
                  color: '#0d1642'
                }
              }}
            >
              المنتجات
            </Typography>

            {/* Cart Icon */}
            <IconButton 
              color="inherit" 
              onClick={() => navigate('/cart')}
              sx={{ 
                color: '#1a237e',
                '&:hover': {
                  bgcolor: 'rgba(26, 35, 126, 0.04)'
                }
              }}
            >
              <Badge 
                badgeContent={cartItemCount} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    fontFamily: 'Cairo'
                  }
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
