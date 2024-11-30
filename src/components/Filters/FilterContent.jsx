import React from 'react';
import { 
  Box, 
  Typography, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Button,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';

const FilterContent = ({ 
  priceRange, 
  setPriceRange, 
  selectedBrands, 
  setSelectedBrands,
  resetFilters
}) => {
  // Available filter options
  const brands = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Reebok'];

  const handlePriceChange = (event) => {
    const value = event.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setPriceRange([0, Number(value) || 0]);
    }
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Price Input */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          السعر الأقصى
        </Typography>
        <TextField
          fullWidth
          value={priceRange[1]}
          onChange={handlePriceChange}
          type="text"
          InputProps={{
            endAdornment: <InputAdornment position="end">د.ج</InputAdornment>,
            inputMode: 'numeric',
            sx: {
              direction: 'rtl',
              '& input': {
                textAlign: 'right',
              }
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#1a237e',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1a237e',
              },
            },
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Brands */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          الماركات
        </Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox 
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  sx={{
                    color: '#1a237e',
                    '&.Mui-checked': {
                      color: '#1a237e',
                    },
                  }}
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Reset Filters Button */}
      <Button
        variant="outlined"
        fullWidth
        onClick={resetFilters}
        sx={{
          mt: 2,
          color: '#1a237e',
          borderColor: '#1a237e',
          '&:hover': {
            borderColor: '#0d1642',
            bgcolor: 'rgba(26, 35, 126, 0.04)',
          },
        }}
      >
        إعادة تعيين الفلاتر
      </Button>
    </Box>
  );
};

export default FilterContent;
