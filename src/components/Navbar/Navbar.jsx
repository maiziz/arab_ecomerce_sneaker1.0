import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ cartItemCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          direction: 'rtl', 
          backgroundColor: '#1a1a1a',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1, 
                fontFamily: 'Cairo',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              متجر الأحذية العربي
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button 
                color="inherit" 
                onClick={() => navigate('/')}
                sx={{ 
                  fontFamily: 'Cairo',
                  mx: 1,
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                  borderBottom: location.pathname === '/' ? '2px solid white' : 'none'
                }}
              >
                الرئيسية
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/products')}
                sx={{ 
                  fontFamily: 'Cairo',
                  mx: 1,
                  fontWeight: location.pathname === '/products' ? 'bold' : 'normal',
                  borderBottom: location.pathname === '/products' ? '2px solid white' : 'none'
                }}
              >
                المنتجات
              </Button>
              <IconButton 
                color="inherit" 
                onClick={() => navigate('/cart')}
                sx={{
                  ml: 1,
                  position: 'relative',
                  '&::after': location.pathname === '/cart' ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    height: '2px',
                    backgroundColor: 'white'
                  } : {}
                }}
              >
                <Badge 
                  badgeContent={cartItemCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontFamily: 'Cairo',
                      minWidth: '20px',
                      height: '20px',
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
    </Box>
  );
};

export default Navbar;
