import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Container,
  Divider,
  Button,
  Drawer,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  Grid,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ProductCard from '../components/ProductCard/ProductCard';
import PriceRangeFilter from '../components/Filters/PriceRangeFilter';
import { formatPrice } from '../utils/formatCurrency';
import { productData } from '../data/products';

const FilterContent = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedBrand, 
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  brands,
  categories,
  isMobile,
  onClose
}) => (
  <Box 
    sx={{ 
      width: isMobile ? '100%' : 280,
      height: '100%',
      overflowY: 'auto',
      p: 3,
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
        '&:hover': {
          background: '#555',
        },
      },
    }}
  >
    {isMobile && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          تصفية المنتجات
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    )}

    {/* Search Filter */}
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
        البحث
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="ابحث عن المنتجات..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
        sx={{ 
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#f5f5f5',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }
        }}
      />
    </Box>

    <Divider sx={{ my: 2 }} />

    {/* Brand Filter */}
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
        الماركة
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          sx={{ 
            fontFamily: 'Cairo',
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            textAlign: 'right',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {brands.map(brand => (
            <MenuItem key={brand} value={brand} sx={{ fontFamily: 'Cairo', textAlign: 'right' }}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    {/* Category Filter */}
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
        الفئة
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ 
            fontFamily: 'Cairo',
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            textAlign: 'right',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {categories.map(category => (
            <MenuItem key={category} value={category} sx={{ fontFamily: 'Cairo', textAlign: 'right' }}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

    <Divider sx={{ my: 2 }} />

    {/* Price Filter */}
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mb: 1, fontFamily: 'Cairo', fontSize: '0.9rem', color: '#666', textAlign: 'right' }}>
        السعر الأقصى
      </Typography>
      <Box sx={{ px: 2 }}>
        <PriceRangeFilter 
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          min={0}
          max={100000}
        />
      </Box>
    </Box>

    {isMobile && (
      <Button 
        fullWidth 
        variant="contained" 
        onClick={onClose}
        sx={{ 
          mt: 2,
          fontFamily: 'Cairo',
          backgroundColor: '#1a237e',
          '&:hover': {
            backgroundColor: '#0d1642'
          }
        }}
      >
        تطبيق التصفية
      </Button>
    )}
  </Box>
);

const Products = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrand, setSelectedBrand] = useState('الكل');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const brands = ['الكل', 'نايكي', 'اديداس', 'بوما', 'نيو بالانس'];
  const categories = ['الكل', 'رياضي', 'جري', 'كاجوال'];

  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'الكل' || product.brand === selectedBrand;
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange[1];

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
  });

  return (
    <Box sx={{ minHeight: '100vh', py: 4, direction: 'rtl' }}>
      <Container maxWidth="xl">
        {/* Mobile Filter Toggle Button */}
        {isMobile && (
          <Fab
            color="primary"
            aria-label="filter"
            sx={{ 
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
              bgcolor: '#1a237e',
              '&:hover': {
                bgcolor: '#0d1642'
              }
            }}
            onClick={() => setIsFilterOpen(true)}
          >
            <FilterListIcon />
          </Fab>
        )}

        {/* Filter Section */}
        {isMobile ? (
          <Drawer
            anchor="right"
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            PaperProps={{
              sx: {
                width: '100%',
                maxWidth: '100%',
                height: '100%',
              }
            }}
          >
            <FilterContent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              brands={brands}
              categories={categories}
              isMobile={true}
              onClose={() => setIsFilterOpen(false)}
            />
          </Drawer>
        ) : (
          <Box 
            component="aside"
            sx={{ 
              width: 280,
              position: 'fixed',
              top: 80,
              right: { sm: 24, md: 40, lg: 80 },
              height: 'calc(100vh - 100px)',
              borderLeft: '1px solid #e0e0e0',
            }}
          >
            <FilterContent
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              brands={brands}
              categories={categories}
              isMobile={false}
            />
          </Box>
        )}

        {/* Main Content Area */}
        <Box 
          component="main"
          sx={{ 
            marginRight: { xs: 0, md: '320px', lg: '380px' },
            transition: 'margin 0.3s ease'
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontFamily: 'Cairo', 
                mb: 1, 
                textAlign: 'right',
                fontWeight: 'bold',
                color: '#1a237e'
              }}
            >
              تسوق الأحذية
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#666', 
                mb: 3, 
                textAlign: 'right',
                fontFamily: 'Cairo'
              }}
            >
              {`${filteredProducts.length} منتج`}
            </Typography>
          </Box>

          <Grid 
            container 
            spacing={{ xs: 2, sm: 3 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          >
            {filteredProducts.map(product => (
              <Grid 
                item 
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={product.id}
                sx={{
                  height: '100%',
                  minHeight: { xs: 'auto', sm: '450px' },
                  display: 'flex'
                }}
              >
                <Box sx={{ width: '100%', height: '100%' }}>
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </Box>
              </Grid>
            ))}
          </Grid>

          {filteredProducts.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center',
                py: 8,
                px: 3,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                mt: 4
              }}
            >
              <Typography 
                variant="h6"
                sx={{ 
                  fontFamily: 'Cairo',
                  color: '#666',
                  mb: 2
                }}
              >
                لم يتم العثور على منتجات
              </Typography>
              <Typography 
                sx={{ 
                  fontFamily: 'Cairo',
                  color: '#888'
                }}
              >
                جرب تغيير معايير البحث الخاصة بك
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Products;
