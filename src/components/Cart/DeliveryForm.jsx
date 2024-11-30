import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { wilayas } from '../../data/algerianWilayas';

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
          MenuProps: {
            PaperProps: {
              sx: {
                maxHeight: 300,
                '& .MuiMenuItem-root': {
                  fontFamily: 'Cairo'
                }
              }
            }
          }
        }}
        fullWidth
      >
        {wilayas.map((wilaya) => (
          <MenuItem key={wilaya.id} value={wilaya.id}>
            {wilaya.name}
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
          color: 'white',
          py: 1.5,
          fontFamily: 'Cairo',
          '&:hover': {
            bgcolor: '#0d47a1'
          }
        }}
      >
        {loading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          'تأكيد الطلب'
        )}
      </Button>
    </Box>
  );
};

export default DeliveryForm;
