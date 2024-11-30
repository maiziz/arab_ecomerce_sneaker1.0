import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ButtonGroup,
  Alert,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatCurrency';

const Cart = ({ cartItems, removeFromCart, clearCart, updateCartItems }) => {
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'cod' // cash on delivery by default
  });
  const [formErrors, setFormErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 1000; // Fixed shipping cost
  const total = subtotal + shippingCost;

  const handleQuantityChange = (itemId, change) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, Math.min(10, item.quantity + change)); // Maximum 10 items
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCartItems(updatedItems);
  };

  const handleSizeChange = (itemId, size) => {
    setSelectedSize(prev => ({
      ...prev,
      [itemId]: size
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'الاسم مطلوب';
    if (!formData.phone.trim()) errors.phone = 'رقم الهاتف مطلوب';
    if (!/^\d{8,12}$/.test(formData.phone.trim())) errors.phone = 'رقم الهاتف يجب أن يكون بين 8 و 12 رقم';
    if (!formData.address.trim()) errors.address = 'العنوان مطلوب';
    if (!formData.city.trim()) errors.city = 'المدينة مطلوبة';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Here you would typically send the order to your backend
        // const response = await fetch('/api/orders', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     items: cartItems,
        //     customer: formData,
        //     total: total
        //   })
        // });
        
        setOrderSuccess(true);
        setTimeout(() => {
          clearCart();
          setShowCheckoutForm(false);
          setOrderSuccess(false);
          navigate('/');
        }, 5000); // Increased to 5 seconds
      } catch (error) {
        console.error('Error processing order:', error);
        setFormErrors({ submit: 'حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.' });
      } finally {
        setLoading(false);
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, direction: 'rtl' }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center', 
            borderRadius: 4,
            backgroundColor: '#f5f5f5',
            border: '2px dashed #e0e0e0'
          }}
        >
          <Typography 
            sx={{ 
              textAlign: 'center', 
              fontFamily: 'Cairo',
              fontSize: '1.2rem',
              color: '#666'
            }}
          >
            سلة التسوق فارغة
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{
              py: 2,
              fontFamily: 'Cairo',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 2,
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1'
              },
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)'
            }}
          >
            تسوق الآن
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, direction: 'rtl' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontFamily: 'Cairo', 
          textAlign: 'right',
          fontWeight: 'bold',
          color: '#1a237e'
        }}
      >
        سلة التسوق
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        {/* Cart Items */}
        <Box sx={{ flex: 1 }}>
          {cartItems.map((item) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #e0e0e0',
                borderRadius: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  borderRadius: 2,
                  mr: 3,
                  backgroundColor: '#f5f5f5',
                  padding: 1
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography 
                  sx={{ 
                    fontFamily: 'Cairo', 
                    mb: 1,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#1a237e'
                  }}
                >
                  {item.name}
                </Typography>
                <Typography 
                  sx={{ 
                    color: '#1976d2', 
                    fontFamily: 'Cairo',
                    fontSize: '1.1rem',
                    fontWeight: '500'
                  }}
                >
                  {formatPrice(item.price)}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <ButtonGroup size="small" sx={{ mx: 2 }}>
                    <Button onClick={() => handleQuantityChange(item.id, -1)}>
                      <RemoveIcon />
                    </Button>
                    <Button disabled sx={{ minWidth: 40 }}>
                      {item.quantity}
                    </Button>
                    <Button onClick={() => handleQuantityChange(item.id, 1)}>
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                  <IconButton onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Order Summary */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            border: '1px solid #e0e0e0', 
            borderRadius: 4,
            width: 360,
            position: 'sticky',
            top: 24,
            backgroundColor: '#ffffff'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 3, 
              fontFamily: 'Cairo',
              fontWeight: 'bold',
              color: '#1a237e'
            }}
          >
            ملخص الطلب
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ color: '#666', fontFamily: 'Cairo' }}>
              المجموع الفرعي:
            </Typography>
            <Typography sx={{ fontFamily: 'Cairo', fontWeight: '500' }}>
              {formatPrice(subtotal)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography sx={{ color: '#666', fontFamily: 'Cairo' }}>
              رسوم الشحن:
            </Typography>
            <Typography sx={{ fontFamily: 'Cairo', fontWeight: '500' }}>
              {formatPrice(shippingCost)}
            </Typography>
          </Box>

          {/* Payment Method */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                mb: 2, 
                fontFamily: 'Cairo', 
                fontWeight: 'bold',
                color: '#1a237e'
              }}
            >
              طريقة الدفع
            </Typography>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                backgroundColor: '#f5f5f5'
              }}
            >
              <Box 
                component="img" 
                src="/cod-icon.png" 
                alt="الدفع عند الاستلام"
                sx={{ 
                  width: 32, 
                  height: 32, 
                  objectFit: 'contain' 
                }} 
              />
              <Typography sx={{ fontFamily: 'Cairo', color: '#424242' }}>
                الدفع عند الاستلام
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 4,
              pt: 3,
              borderTop: '2px solid #e0e0e0',
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontFamily: 'Cairo', color: '#1a237e' }}>
              المجموع:
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontFamily: 'Cairo', color: '#1a237e', fontSize: '1.2rem' }}>
              {formatPrice(total)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={() => setShowCheckoutForm(true)}
            sx={{
              py: 2,
              fontFamily: 'Cairo',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 2,
              backgroundColor: '#1a237e',
              '&:hover': {
                backgroundColor: '#0d47a1'
              },
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(26, 35, 126, 0.2)'
            }}
          >
            متابعة الطلب
          </Button>
        </Paper>
      </Box>

      <Dialog 
        open={showCheckoutForm} 
        onClose={() => setShowCheckoutForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontFamily: 'Cairo', direction: 'rtl' }}>
          معلومات التوصيل
        </DialogTitle>
        <DialogContent sx={{ direction: 'rtl' }}>
          {orderSuccess ? (
            <Alert severity="success" sx={{ mt: 2, fontFamily: 'Cairo' }}>
              تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً.
            </Alert>
          ) : (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="الاسم الكامل"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    error={!!formErrors.fullName}
                    helperText={formErrors.fullName}
                    sx={{ '& label': { fontFamily: 'Cairo' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="رقم الهاتف"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
                    sx={{ '& label': { fontFamily: 'Cairo' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="العنوان"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!formErrors.address}
                    helperText={formErrors.address}
                    multiline
                    rows={2}
                    sx={{ '& label': { fontFamily: 'Cairo' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="المدينة"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                    sx={{ '& label': { fontFamily: 'Cairo' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="ملاحظات إضافية"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    multiline
                    rows={2}
                    sx={{ '& label': { fontFamily: 'Cairo' } }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ direction: 'rtl', p: 2 }}>
          <Button 
            onClick={() => setShowCheckoutForm(false)} 
            sx={{ fontFamily: 'Cairo' }}
            disabled={loading}
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleCheckout} 
            variant="contained" 
            sx={{ fontFamily: 'Cairo' }}
            disabled={loading}
          >
            {loading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
          </Button>
        </DialogActions>
        {formErrors.submit && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {formErrors.submit}
          </Alert>
        )}
      </Dialog>
    </Container>
  );
};

export default Cart;
