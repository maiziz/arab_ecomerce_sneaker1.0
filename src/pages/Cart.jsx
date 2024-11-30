import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  Grid,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Chip,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { formatPrice } from '../utils/formatCurrency';
import { wilayas } from '../data/algerianWilayas';

const Cart = ({ cartItems, removeFromCart, updateCartItems, clearCart }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [openCheckout, setOpenCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    address: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');

  const hasInvalidItems = cartItems.some(item => !item.size || !item.color || item.size === 'undefined' || item.color === 'undefined');

  const handleQuantityChange = (productId, change) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCartItems(updatedItems);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryCost = 1000; // 1000 DZD delivery cost
    return {
      subtotal,
      deliveryCost,
      total: subtotal + deliveryCost
    };
  };

  const handleCheckout = () => {
    setShowDeliveryForm(true);
  };

  const handleSubmitOrder = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Here you would typically send the order to your backend
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        
        // Clear cart and show success
        clearCart();
        setOrderSuccess(true);
        setShowDeliveryForm(false);
        setFormData({
          fullName: '',
          phone: '',
          wilaya: '',
          address: '',
          notes: ''
        });
      } catch (error) {
        console.error('Error submitting order:', error);
        setFormErrors({ submit: 'حدث خطأ أثناء تقديم الطلب. حاول مرة أخرى.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'الاسم الكامل مطلوب';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^(0)(5|6|7)[0-9]{8}$/.test(formData.phone)) {
      errors.phone = 'رقم الهاتف غير صالح';
    }
    
    if (!formData.wilaya) {
      errors.wilaya = 'الولاية مطلوبة';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'العنوان مطلوب';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 60, color: '#1a237e', mb: 2, opacity: 0.5 }} />
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Cairo',
              color: '#1a237e',
              mb: 2,
              fontWeight: 'bold'
            }}
          >
            سلة التسوق فارغة
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Cairo',
              color: '#666',
              mb: 4
            }}
          >
            لم تقم بإضافة أي منتجات إلى سلة التسوق بعد
          </Typography>
          <Button
            onClick={() => navigate('/products')}
            variant="contained"
            sx={{
              backgroundColor: '#1a237e',
              fontFamily: 'Cairo',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#0d1642'
              }
            }}
          >
            تصفح المنتجات
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontFamily: 'Cairo',
          fontWeight: 'bold',
          color: '#1a237e',
          textAlign: 'right'
        }}
      >
        سلة التسوق
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {cartItems.map((item) => (
              <Card
                key={item.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  p: 2,
                  borderRadius: 2
                }}
              >
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{
                    width: { xs: '100%', sm: 200 },
                    height: { xs: 200, sm: 200 },
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 1
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    p: { xs: 2, sm: 3 }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {item.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
                        <Chip 
                          label={`المقاس: ${item.size || 'غير محدد'}`}
                          variant="outlined"
                          size="small"
                          color={!item.size || item.size === 'undefined' ? "error" : "default"}
                          sx={{ 
                            direction: 'rtl',
                            fontFamily: 'Cairo',
                            borderColor: !item.size || item.size === 'undefined' ? '#d32f2f' : '#1a237e',
                            color: !item.size || item.size === 'undefined' ? '#d32f2f' : '#1a237e'
                          }}
                        />
                        <Chip 
                          label={`اللون: ${item.color || 'غير محدد'}`}
                          variant="outlined"
                          size="small"
                          color={!item.color || item.color === 'undefined' ? "error" : "default"}
                          sx={{ 
                            direction: 'rtl',
                            fontFamily: 'Cairo',
                            borderColor: !item.color || item.color === 'undefined' ? '#d32f2f' : '#1a237e',
                            color: !item.color || item.color === 'undefined' ? '#d32f2f' : '#1a237e'
                          }}
                        />
                      </Box>
                      <Typography variant="h6" component="div" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                        {formatPrice(item.price)}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => removeFromCart(item.id)}
                      sx={{ color: '#666' }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      color: '#666',
                      mb: 2,
                      fontFamily: 'Cairo',
                      textAlign: 'right'
                    }}
                  >
                    {item.description}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        sx={{
                          backgroundColor: '#f5f5f5',
                          '&:hover': { backgroundColor: '#e0e0e0' }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        sx={{
                          fontFamily: 'Cairo',
                          fontWeight: 'bold',
                          minWidth: 40,
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        sx={{
                          backgroundColor: '#f5f5f5',
                          '&:hover': { backgroundColor: '#e0e0e0' }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'Cairo',
                        fontWeight: 'bold',
                        color: '#1a237e'
                      }}
                    >
                      {formatPrice(item.price * item.quantity)}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              position: { md: 'sticky' },
              top: { md: 100 }
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Cairo',
                fontWeight: 'bold',
                mb: 3,
                textAlign: 'right'
              }}
            >
              ملخص الطلب
            </Typography>

            <Box sx={{ mb: 3 }}>
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
                  عدد المنتجات
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Cairo',
                    fontWeight: 'bold'
                  }}
                >
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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
                  المجموع الفرعي
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Cairo',
                    fontWeight: 'bold'
                  }}
                >
                  {formatPrice(calculateTotal().subtotal)}
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
                  {formatPrice(calculateTotal().deliveryCost)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
                px: 1
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Cairo',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#1a237e'
                }}
              >
                المجموع الكلي
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Cairo',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  color: '#1a237e'
                }}
              >
                {formatPrice(calculateTotal().total)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              disabled={hasInvalidItems}
              onClick={handleCheckout}
              sx={{
                backgroundColor: '#1a237e',
                fontFamily: 'Cairo',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#0d1642'
                },
                '&.Mui-disabled': {
                  backgroundColor: '#ccc',
                  color: 'white'
                }
              }}
            >
              {hasInvalidItems ? 'يوجد منتجات غير مكتملة' : 'إتمام الطلب'}
            </Button>

            <Button
              onClick={() => navigate('/products')}
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                borderColor: '#1a237e',
                color: '#1a237e',
                fontFamily: 'Cairo',
                '&:hover': {
                  borderColor: '#0d1642',
                  backgroundColor: 'rgba(13, 22, 66, 0.04)'
                }
              }}
            >
              مواصلة التسوق
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Delivery Form Dialog */}
      <Dialog
        open={showDeliveryForm}
        onClose={() => setShowDeliveryForm(false)}
        maxWidth="sm"
        fullWidth
        sx={{ '& .MuiDialog-paper': { p: 2 } }}
      >
        <DialogTitle sx={{ textAlign: 'right', fontFamily: 'Cairo', fontWeight: 'bold' }}>
          معلومات التوصيل
        </DialogTitle>
        
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="الاسم الكامل"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              error={!!formErrors.fullName}
              helperText={formErrors.fullName}
              sx={{ mb: 2, direction: 'rtl' }}
              InputProps={{
                sx: { fontFamily: 'Cairo' }
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Cairo' }
              }}
            />
            
            <TextField
              fullWidth
              label="رقم الهاتف"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
              sx={{ mb: 2, direction: 'rtl' }}
              InputProps={{
                sx: { fontFamily: 'Cairo' }
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Cairo' }
              }}
            />
            
            <FormControl fullWidth error={!!formErrors.wilaya} sx={{ mb: 2 }}>
              <InputLabel sx={{ fontFamily: 'Cairo' }}>الولاية</InputLabel>
              <Select
                value={formData.wilaya}
                onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                label="الولاية"
                sx={{ textAlign: 'right', fontFamily: 'Cairo' }}
              >
                {wilayas.map((wilaya) => (
                  <MenuItem 
                    key={wilaya.id} 
                    value={wilaya.name}
                    sx={{ textAlign: 'right', fontFamily: 'Cairo' }}
                  >
                    {wilaya.name}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.wilaya && (
                <FormHelperText>{formErrors.wilaya}</FormHelperText>
              )}
            </FormControl>
            
            <TextField
              fullWidth
              label="العنوان"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              error={!!formErrors.address}
              helperText={formErrors.address}
              multiline
              rows={3}
              sx={{ mb: 2, direction: 'rtl' }}
              InputProps={{
                sx: { fontFamily: 'Cairo' }
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Cairo' }
              }}
            />
            
            <TextField
              fullWidth
              label="ملاحظات إضافية"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              multiline
              rows={2}
              sx={{ direction: 'rtl' }}
              InputProps={{
                sx: { fontFamily: 'Cairo' }
              }}
              InputLabelProps={{
                sx: { fontFamily: 'Cairo' }
              }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={() => setShowDeliveryForm(false)}
            sx={{ fontFamily: 'Cairo' }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitOrder}
            disabled={loading}
            sx={{
              bgcolor: '#1a237e',
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
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={orderSuccess}
        onClose={() => setOrderSuccess(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Cairo', color: 'success.main' }}>
            تم تقديم طلبك بنجاح!
          </Typography>
          <Typography sx={{ mb: 3, fontFamily: 'Cairo' }}>
            سنقوم بالاتصال بك قريباً لتأكيد الطلب.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOrderSuccess(false);
              navigate('/');
            }}
            sx={{
              bgcolor: '#1a237e',
              fontFamily: 'Cairo',
              '&:hover': {
                bgcolor: '#0d1642'
              }
            }}
          >
            العودة للرئيسية
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setError('')} 
          severity="error"
          sx={{ 
            width: '100%',
            fontFamily: 'Cairo',
            '& .MuiAlert-message': {
              textAlign: 'right'
            }
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cart;
