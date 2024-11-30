import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress
} from '@mui/material';

const wilayas = [
  { id: 1, name: 'الجزائر العاصمة' },
  { id: 2, name: 'وهران' },
  { id: 3, name: 'قسنطينة' },
  { id: 4, name: 'عنابة' },
  { id: 5, name: 'سطيف' }
];

const DeliveryForm = ({ 
  deliveryInfo, 
  setDeliveryInfo, 
  formErrors, 
  handleDeliverySubmit,
  loading 
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleDeliverySubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        p: 3
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 2,
          textAlign: 'center',
          fontFamily: 'Cairo',
          color: '#1a237e'
        }}
      >
        معلومات التوصيل
      </Typography>

      <TextField
        name="fullName"
        label="الاسم الكامل"
        value={deliveryInfo.fullName}
        onChange={handleChange}
        error={!!formErrors.fullName}
        helperText={formErrors.fullName}
        InputLabelProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        InputProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        fullWidth
      />

      <TextField
        name="phone"
        label="رقم الهاتف"
        value={deliveryInfo.phone}
        onChange={handleChange}
        error={!!formErrors.phone}
        helperText={formErrors.phone}
        InputLabelProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        InputProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        fullWidth
      />

      <TextField
        select
        name="wilaya"
        label="الولاية"
        value={deliveryInfo.wilaya}
        onChange={handleChange}
        error={!!formErrors.wilaya}
        helperText={formErrors.wilaya}
        InputLabelProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        SelectProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        fullWidth
      >
        {wilayas.map((option) => (
          <MenuItem 
            key={option.id} 
            value={option.name}
            sx={{ fontFamily: 'Cairo' }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        name="address"
        label="العنوان"
        value={deliveryInfo.address}
        onChange={handleChange}
        error={!!formErrors.address}
        helperText={formErrors.address}
        multiline
        rows={3}
        InputLabelProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        InputProps={{
          sx: { fontFamily: 'Cairo' }
        }}
        fullWidth
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        sx={{
          bgcolor: '#1a237e',
          py: 1.5,
          fontFamily: 'Cairo',
          '&:hover': {
            bgcolor: '#0d1642'
          }
        }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'تأكيد الطلب'
        )}
      </Button>
    </Box>
  );
};

export default DeliveryForm;
