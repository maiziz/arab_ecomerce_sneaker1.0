import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  useScrollTrigger,
  Slide,
  Stack,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Navbar = ({ cartItemCount = 0 }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'الرئيسية', path: '/' },
    { label: 'المنتجات', path: '/products' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center', direction: 'rtl' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#1a237e' }}>
        ARAB SNEAKER
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Button
              fullWidth
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
              sx={{
                color: '#1a237e',
                py: 2,
                '&:hover': {
                  bgcolor: 'rgba(26, 35, 126, 0.08)',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              minHeight: { xs: '64px', md: '70px' },
            }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  color: '#1a237e',
                  display: { md: 'none' },
                  order: 1
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 700,
                color: '#1a237e',
                cursor: 'pointer',
                flexGrow: { xs: 1, md: 0 },
                textAlign: { xs: 'center', md: 'left' },
                order: 2
              }}
              onClick={() => navigate('/')}
            >
              ARAB SNEAKER
            </Typography>

            <Stack
              direction="row"
              spacing={4}
              sx={{
                display: { xs: 'none', md: 'flex' },
                mx: 4,
                order: 3
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: '#1a237e',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': {
                      color: '#303f9f',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack 
              direction="row" 
              spacing={1}
              sx={{
                order: 4
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/cart');
                }}
                sx={{
                  color: '#1a237e',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
