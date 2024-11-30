import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/Cart/CartItem';
import DeliveryForm from '../components/Cart/DeliveryForm';
import ConfirmationDialog from '../components/Cart/ConfirmationDialog';
import CartSummary from '../components/Cart/CartSummary';

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    address: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!deliveryInfo.fullName.trim()) {
      errors.fullName = 'الرجاء إدخال الاسم الكامل';
    }
    if (!deliveryInfo.phone.trim()) {
      errors.phone = 'الرجاء إدخال رقم الهاتف';
    } else if (!/^(0)(5|6|7)[0-9]{8}$/.test(deliveryInfo.phone)) {
      errors.phone = 'الرجاء إدخال رقم هاتف صحيح';
    }
    if (!deliveryInfo.wilaya) {
      errors.wilaya = 'الرجاء اختيار الولاية';
    }
    if (!deliveryInfo.address.trim()) {
      errors.address = 'الرجاء إدخال العنوان';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowConfirmation(true);
        setShowDeliveryForm(false);
        
        setTimeout(() => {
          clearCart();
          setShowConfirmation(false);
          navigate('/');
        }, 3000);
      } catch (error) {
        setError('حدث خطأ أثناء إتمام الطلب. الرجاء المحاولة مرة أخرى.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 3, fontFamily: 'Cairo' }}>
            سلة المشتريات فارغة
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{
              bgcolor: '#1a237e',
              '&:hover': { bgcolor: '#0d1642' },
              fontFamily: 'Cairo'
            }}
          >
            تصفح المنتجات
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {!showDeliveryForm ? (
        <>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4,
              textAlign: 'center',
              fontFamily: 'Cairo',
              color: '#1a237e'
            }}
          >
            سلة المشتريات
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 4 }}>
                {cartItems.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    removeFromCart={removeFromCart}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <CartSummary cartItems={cartItems} />
              
              <Button
                variant="contained"
                onClick={() => setShowDeliveryForm(true)}
                fullWidth
                sx={{
                  bgcolor: '#1a237e',
                  py: 1.5,
                  px: 4,
                  mt: 3,
                  fontFamily: 'Cairo',
                  '&:hover': {
                    bgcolor: '#0d1642'
                  }
                }}
              >
                متابعة الشراء
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <DeliveryForm
          deliveryInfo={deliveryInfo}
          setDeliveryInfo={setDeliveryInfo}
          formErrors={formErrors}
          handleDeliverySubmit={handleDeliverySubmit}
          loading={loading}
        />
      )}

      <ConfirmationDialog open={showConfirmation} />

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
      >
        <Alert 
          onClose={() => setError('')} 
          severity="error" 
          sx={{ width: '100%', fontFamily: 'Cairo' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
