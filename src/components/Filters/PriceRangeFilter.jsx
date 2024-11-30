import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';

const PriceRangeFilter = ({ 
  priceRange,
  onPriceRangeChange,
  max = 1000
}) => {
  const [maxPrice, setMaxPrice] = useState(priceRange[1]);

  const handleMaxInputChange = (event) => {
    const newMax = event.target.value === '' ? max : Number(event.target.value);
    setMaxPrice(newMax);
    onPriceRangeChange([0, newMax]);
  };

  return (
    <Box>
      <Typography 
        sx={{ 
          mb: 2, 
          fontFamily: 'Cairo',
          fontSize: '0.9rem',
          color: '#666',
          textAlign: 'right'
        }}
      >
        السعر الأقصى
      </Typography>

      <TextField
        label="السعر الأقصى"
        type="number"
        variant="outlined"
        size="small"
        value={maxPrice}
        onChange={handleMaxInputChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">درهم</InputAdornment>,
        }}
        sx={{
          width: '100%',
          '& input': { 
            textAlign: 'left', 
            fontFamily: 'Cairo',
            direction: 'ltr'
          },
          '& label': {
            fontFamily: 'Cairo'
          }
        }}
        inputProps={{
          min: 0,
          max: max
        }}
      />
    </Box>
  );
};

export default PriceRangeFilter;
