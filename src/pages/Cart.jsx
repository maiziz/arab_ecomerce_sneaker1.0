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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, clearCart, updateCartItems }) => {
  const navigate = useNavigate();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = total > 200 ? 0 : 30; // Free shipping over 200 درهم
  const discount = (total * promoDiscount);
  const totalWithShipping = total + shippingCost - discount;

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

  const handlePromoCode = () => {
    setPromoError('');
    // Example promo codes
    const promoCodes = {
      'WELCOME10': 0.10,
      'SUMMER20': 0.20,
      'SPECIAL30': 0.30
    };

    if (!promoCode.trim()) {
      setPromoError('الرجاء إدخال رمز الخصم');
      return;
    }

    const discount = promoCodes[promoCode.toUpperCase()];
    if (discount) {
      setPromoDiscount(discount);
      setPromoError('تم تطبيق الخصم بنجاح!');
    } else {
      setPromoError('رمز الخصم غير صالح');
      setPromoDiscount(0);
    }
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
        //     total: totalWithShipping
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
      <Container maxWidth="md" sx={{ mt: { xs: 10, sm: 12 }, direction: 'rtl' }}>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography sx={{ fontFamily: 'Cairo', mb: 2 }}>
            سلة التسوق فارغة
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/products')}
            sx={{ fontFamily: 'Cairo' }}
          >
            تسوق الآن
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 10, sm: 12 }, direction: 'rtl' }}>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'Cairo' }}>
        سلة التسوق
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <List>
              {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: 60, height: 60, marginLeft: 16, objectFit: 'cover' }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography sx={{ fontFamily: 'Cairo', color: 'primary.main' }}>
                                {item.price} درهم
                              </Typography>
                              <Box sx={{ mt: 1 }}>
                                <ButtonGroup size="small">
                                  {['40', '41', '42', '43', '44', '45'].map((size) => (
                                    <Button
                                      key={size}
                                      variant={selectedSize[item.id] === size ? 'contained' : 'outlined'}
                                      onClick={() => handleSizeChange(item.id, size)}
                                      sx={{ minWidth: '40px' }}
                                    >
                                      {size}
                                    </Button>
                                  ))}
                                </ButtonGroup>
                              </Box>
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
                            </>
                          }
                        />
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Cairo' }}>
                ملخص الطلب
              </Typography>
              
              {/* Promo Code Section */}
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="رمز الخصم"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  error={promoError === 'رمز الخصم غير صالح'}
                  helperText={promoError}
                  sx={{ mb: 1 }}
                />
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handlePromoCode}
                  sx={{ fontFamily: 'Cairo' }}
                >
                  تطبيق الخصم
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              {/* Order Summary */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontFamily: 'Cairo' }}>المجموع</Typography>
                  <Typography>{total.toFixed(2)} درهم</Typography>
                </Box>
                {promoDiscount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontFamily: 'Cairo', color: 'success.main' }}>الخصم</Typography>
                    <Typography sx={{ color: 'success.main' }}>
                      -{discount.toFixed(2)} درهم
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontFamily: 'Cairo' }}>
                    {total > 200 ? 'الشحن (مجاني)' : 'تكلفة الشحن'}
                  </Typography>
                  <Typography>
                    {total > 200 ? '0.00' : shippingCost} درهم
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
                    الإجمالي
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {totalWithShipping.toFixed(2)} درهم
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setShowCheckoutForm(true)}
                sx={{ fontFamily: 'Cairo' }}
              >
                متابعة الطلب
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
      {/* Payment Method Selection */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ mb: 1, fontFamily: 'Cairo' }}>طريقة الدفع</Typography>
        <ButtonGroup fullWidth>
          <Button
            variant={formData.paymentMethod === 'cod' ? 'contained' : 'outlined'}
            onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'cod' }})}
            sx={{ fontFamily: 'Cairo' }}
          >
            الدفع عند الاستلام
          </Button>
          <Button
            variant={formData.paymentMethod === 'card' ? 'contained' : 'outlined'}
            onClick={() => handleInputChange({ target: { name: 'paymentMethod', value: 'card' }})}
            sx={{ fontFamily: 'Cairo' }}
          >
            بطاقة ائتمان
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default Cart;
