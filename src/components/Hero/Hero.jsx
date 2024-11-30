import React, { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Button, IconButton, Snackbar, Alert } from '@mui/material';
import { productData } from '../../data/products';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();
  const newArrivals = productData.slice(0, 6);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;

    if (!section || !trigger) return;

    // Initial fade in animation
    gsap.fromTo(
      '.hero-text',
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
      }
    );

    // Product cards reveal animation
    gsap.fromTo(
      '.product-card',
      {
        opacity: 0,
        y: 100,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );

    // Horizontal scroll animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1,
      }
    });

    timeline.to('.products-container', {
      x: () => -(section.scrollWidth - window.innerWidth + 48),
      ease: 'none'
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box
      ref={triggerRef}
      sx={{
        height: '100vh',
        bgcolor: '#f5f5f5',
        overflow: 'hidden',
        direction: 'rtl',
      }}
    >
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Hero Text */}
        <Box
          className="hero-text"
          sx={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            zIndex: 2,
            textAlign: 'right',
            maxWidth: '600px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              background: 'linear-gradient(45deg, #1a237e 30%, #303f9f 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            أحدث الأحذية الرياضية
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              mb: 3,
            }}
          >
            اكتشف مجموعتنا الجديدة من الأحذية الرياضية الفاخرة
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate('/products')}
            sx={{
              bgcolor: '#1a237e',
              color: 'white',
              py: 1.5,
              px: 4,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#303f9f',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            تسوق الآن
          </Button>
        </Box>

        {/* Products Container */}
        <Box
          ref={sectionRef}
          className="products-container"
          sx={{
            display: 'flex',
            gap: 4,
            pr: '5%',
            pl: '5%',
            minWidth: 'max-content',
          }}
        >
          {newArrivals.map((product) => (
            <Box
              key={product.id}
              className="product-card"
              onClick={() => handleProductClick(product.id)}
              sx={{
                width: 350,
                bgcolor: 'white',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  '& img': {
                    transform: 'scale(1.05)',
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  pt: '100%',
                  overflow: 'hidden',
                  background: 'linear-gradient(45deg, #f3f3f3 0%, #ffffff 100%)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    color: '#1a237e',
                  }}
                >
                  {product.price.toLocaleString()} د.ج
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(product.id);
                    }}
                    sx={{
                      bgcolor: 'black',
                      '&:hover': {
                        bgcolor: '#333',
                        transform: 'translateY(-2px)',
                      },
                      py: 1.5,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    اكتشف المزيد
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success"
          sx={{ 
            width: '100%',
            fontFamily: 'Cairo',
            '& .MuiAlert-message': {
              textAlign: 'right'
            }
          }}
        >
          تمت إضافة المنتج إلى السلة
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Hero;
