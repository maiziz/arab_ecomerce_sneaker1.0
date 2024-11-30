import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider
} from '@mui/material';

const DELIVERY_PRICE = 1000; // 1000 DZD delivery cost

const CartSummary = ({ cartItems }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + DELIVERY_PRICE;

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        bgcolor: '#f8f8f8'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontFamily: 'Cairo',
          color: '#1a237e',
          fontWeight: 'bold',
          textAlign: 'right'
        }}
      >
        ملخص الطلب
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cairo',
              color: '#666'
            }}
          >
            المجموع الفرعي
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontWeight: 'bold'
            }}
          >
            {subtotal.toLocaleString()} د.ج
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Cairo',
              color: '#666'
            }}
          >
            تكلفة التوصيل
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              color: '#00796b'
            }}
          >
            {DELIVERY_PRICE.toLocaleString()} د.ج
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: '#1a237e'
          }}
        >
          المجموع الكلي
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            color: '#1a237e'
          }}
        >
          {total.toLocaleString()} د.ج
        </Typography>
      </Box>
    </Paper>
  );
};

export default CartSummary;
