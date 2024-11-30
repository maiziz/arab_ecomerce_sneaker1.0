import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment
} from '@mui/material';

const brands = [
  { id: 'nike', label: 'نايكي' },
  { id: 'adidas', label: 'أديداس' },
  { id: 'puma', label: 'بوما' },
  { id: 'reebok', label: 'ريبوك' },
  { id: 'newBalance', label: 'نيو بالانس' }
];

const FilterPanel = ({ priceRange, selectedBrands, onPriceChange, onBrandChange }) => {
  const handlePriceInputChange = (event) => {
    let value = event.target.value;
    
    // Allow empty input
    if (value === '') {
      onPriceChange([0, 0]);
      return;
    }

    // Convert to number and validate
    value = Number(value);
    if (!isNaN(value) && value >= 0) {
      onPriceChange([0, value]);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        backgroundColor: '#fff',
        border: '1px solid #eee',
        borderRadius: 1
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Cairo',
          mb: 3,
          color: '#333',
          fontWeight: 600,
          textAlign: 'right'
        }}
      >
        تصفية المنتجات
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: 'Cairo',
            mb: 2,
            color: '#666',
            fontWeight: 500,
            textAlign: 'right'
          }}
        >
          نطاق السعر
        </Typography>
        
        <TextField
          fullWidth
          size="small"
          value={priceRange[1]}
          onChange={handlePriceInputChange}
          inputProps={{
            min: 0,
            type: 'number',
            style: { 
              textAlign: 'left',
              fontFamily: 'Cairo',
              direction: 'rtl',
              width: '100%',
              minWidth: '80px'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography sx={{ fontFamily: 'Cairo', color: '#666', minWidth: '30px' }}>
                  د.إ
                </Typography>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
              backgroundColor: '#f8f8f8',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '&:hover fieldset': {
                borderColor: '#2196f3',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2196f3',
              },
              '& input': {
                width: '100%',
                minWidth: '80px',
                padding: '8.5px 14px'
              }
            },
            '& .MuiInputBase-input': {
              fontFamily: 'Cairo',
              paddingRight: '14px'
            }
          }}
        />

        <Typography 
          sx={{ 
            color: '#666', 
            fontSize: '0.875rem', 
            fontFamily: 'Cairo',
            mt: 1,
            textAlign: 'right'
          }}
        >
          عرض المنتجات حتى {priceRange[1]} د.إ
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontFamily: 'Cairo',
            mb: 2,
            color: '#666',
            fontWeight: 500,
            textAlign: 'right'
          }}
        >
          الماركات
        </Typography>
        <FormGroup>
          {brands.map((brand) => (
            <FormControlLabel
              key={brand.id}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => onBrandChange(brand.id)}
                  sx={{
                    color: '#bdbdbd',
                    '&.Mui-checked': {
                      color: '#2196f3',
                    },
                  }}
                />
              }
              label={
                <Typography 
                  sx={{ 
                    fontFamily: 'Cairo',
                    color: '#666',
                    fontSize: '0.9rem'
                  }}
                >
                  {brand.label}
                </Typography>
              }
              sx={{ 
                flexDirection: 'row-reverse',
                marginLeft: 0,
                marginRight: -1
              }}
            />
          ))}
        </FormGroup>
      </Box>
    </Paper>
  );
};

export default FilterPanel;
