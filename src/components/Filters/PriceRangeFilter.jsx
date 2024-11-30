import React, { useState } from 'react';
import {
  Box,
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
      <TextField
        type="number"
        variant="outlined"
        size="small"
        value={maxPrice}
        onChange={handleMaxInputChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">دج</InputAdornment>,
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
