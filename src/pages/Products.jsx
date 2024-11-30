import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  IconButton, 
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { productData } from '../data/products';
import ProductCard from '../components/ProductCard/ProductCard';
import FilterContent from '../components/Filters/FilterContent';

const Products = ({ addToCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  // Reset filters
  const resetFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
  };

  // Filter products
  const filteredProducts = productData.filter(product => {
    const priceInRange = product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    return priceInRange && brandMatch;
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filterContent = (
    <FilterContent
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      selectedBrands={selectedBrands}
      setSelectedBrands={setSelectedBrands}
      resetFilters={resetFilters}
    />
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4, direction: 'rtl' }}>
      <Box sx={{ display: 'flex', mb: 4, alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          تسوق الأحذية
        </Typography>
        {isMobile && (
          <IconButton 
            onClick={handleDrawerToggle}
            sx={{ 
              color: '#1a237e',
              border: '1px solid #1a237e',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'rgba(26, 35, 126, 0.04)',
              },
            }}
          >
            <FilterListIcon />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Filters - Desktop */}
        {!isMobile && (
          <Grid item md={3} lg={2}>
            <Box 
              sx={{ 
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 1,
                position: 'sticky',
                top: 24,
              }}
            >
              {filterContent}
            </Box>
          </Grid>
        )}

        {/* Products Grid */}
        <Grid item xs={12} md={9} lg={10}>
          <Grid container spacing={3}>
            {filteredProducts.length === 0 ? (
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 8,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    لا توجد منتجات تطابق معايير البحث
                  </Typography>
                </Box>
              </Grid>
            ) : (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Filters - Mobile Drawer */}
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
            width: 280,
            bgcolor: 'background.paper',
          },
        }}
      >
        {filterContent}
      </Drawer>
    </Container>
  );
};

export default Products;
