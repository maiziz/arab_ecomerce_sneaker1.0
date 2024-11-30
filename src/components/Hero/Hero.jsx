import React from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { productData } from '../../data/products';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Hero = () => {
  const scrollContainerRef = React.useRef(null);
  const newArrivals = productData.slice(0, 6); // Get more products for scrolling

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#f5f5f5',
        pt: 8,
        pb: 6,
        direction: 'rtl'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          sx={{ mb: 4, fontWeight: 'bold' }}
        >
          أحدث الأحذية الرياضية
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          اكتشف مجموعتنا الجديدة من الأحذية الرياضية الفاخرة
        </Typography>

        <Box sx={{ position: 'relative' }}>
          {/* Scroll Buttons */}
          <IconButton
            onClick={() => scroll('right')}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: 'white' },
              zIndex: 2
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={() => scroll('left')}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: 2,
              '&:hover': { bgcolor: 'white' },
              zIndex: 2
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Scrollable Container */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              gap: 3,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                display: 'none'
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              py: 2
            }}
          >
            {newArrivals.map((product) => (
              <Box
                key={product.id}
                sx={{
                  minWidth: 280,
                  bgcolor: 'white',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 1,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    pt: '100%',
                    overflow: 'hidden'
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
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box sx={{ p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#1a237e'
                    }}
                  >
                    {product.price.toLocaleString()} د.ج
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      bgcolor: 'black',
                      '&:hover': {
                        bgcolor: '#333'
                      }
                    }}
                  >
                    اكتشف المزيد
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
