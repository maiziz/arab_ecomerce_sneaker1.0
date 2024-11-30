import React, { useEffect, useRef } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { newArrivals, promotions } from '../../data/products';

const ScrollableSection = ({ title, products, icon: Icon, color, onClick }) => {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = direction === 'right' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <Box sx={{ position: 'relative', mb: 8 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4, 
          gap: 2,
          bgcolor: color,
          p: 2,
          borderRadius: 2,
          boxShadow: `0 4px 20px ${color}26`
        }}
      >
        <Icon sx={{ color: '#fff', fontSize: 32 }} />
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            color: '#fff'
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <IconButton
          onClick={() => handleScroll('left')}
          sx={{
            position: 'absolute',
            left: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            zIndex: 2,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <NavigateBeforeIcon />
        </IconButton>

        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            pb: 2,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: '#f1f1f1',
              borderRadius: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: color,
              borderRadius: 4,
              '&:hover': {
                bgcolor: color,
              },
            },
          }}
        >
          {products.map((product) => (
            <Card 
              key={product.id}
              onClick={() => onClick(product.id)}
              sx={{ 
                minWidth: 300,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 8px 30px ${color}26`
                },
                bgcolor: '#fff',
                borderRadius: 3,
                overflow: 'hidden',
                border: `1px solid ${color}1a`,
                position: 'relative',
                flex: '0 0 auto'
              }}
            >
              {product.discount && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: '#d32f2f',
                    color: 'white',
                    borderRadius: '50%',
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Cairo',
                    fontWeight: 'bold',
                    zIndex: 1,
                    boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)'
                  }}
                >
                  {product.discount}%
                </Box>
              )}

              <Box sx={{ 
                position: 'relative',
                bgcolor: '#fff',
                p: 3,
                borderBottom: `1px solid ${color}1a`
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                  sx={{ 
                    objectFit: 'contain',
                    transform: 'scale(0.9)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1)'
                    }
                  }}
                />
              </Box>
              <CardContent sx={{ textAlign: 'right', bgcolor: '#fff' }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontFamily: 'Cairo',
                    color: color,
                    mb: 0.5
                  }}
                >
                  {product.brand}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: 'Cairo',
                    mb: 1,
                    color: color,
                    fontSize: '1rem'
                  }}
                >
                  {product.name}
                </Typography>
                {product.discount ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontFamily: 'Cairo',
                        color: '#d32f2f',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}
                    >
                      {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()} د.ج
                    </Typography>
                    <Typography 
                      sx={{ 
                        fontFamily: 'Cairo',
                        color: '#666',
                        textDecoration: 'line-through',
                        fontSize: '0.875rem'
                      }}
                    >
                      {product.price.toLocaleString()} د.ج
                    </Typography>
                  </Box>
                ) : (
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontFamily: 'Cairo',
                      color: color,
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    {product.price.toLocaleString()} د.ج
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>

        <IconButton
          onClick={() => handleScroll('right')}
          sx={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            zIndex: 2,
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const newArrivalsRef = useRef(null);
  const promotionsRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    
    const ctx = gsap.context(() => {
      gsap.set([newArrivalsRef.current, promotionsRef.current], {
        y: 50,
        opacity: 0
      });

      const tl = gsap.timeline();

      tl.to(newArrivalsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      })
      .to(promotionsRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.5");

      hasAnimated.current = true;
    });

    return () => ctx.revert();
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Box sx={{ bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box ref={newArrivalsRef}>
          <ScrollableSection
            title="وصل حديثاً"
            products={newArrivals}
            icon={NewReleasesIcon}
            color="#1a237e"
            onClick={handleProductClick}
          />
        </Box>

        <Box ref={promotionsRef}>
          <ScrollableSection
            title="تخفيضات"
            products={promotions}
            icon={LocalFireDepartmentIcon}
            color="#d32f2f"
            onClick={handleProductClick}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
