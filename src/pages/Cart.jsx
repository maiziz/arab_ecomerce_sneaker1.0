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
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: '',
    phone: '',
    wilaya: '',
    address: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({
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
    if (!deliveryInfo.fullName.trim()) errors.fullName = 'الاسم الكامل مطلوب';
    if (!deliveryInfo.phone.trim()) errors.phone = 'رقم الهاتف مطلوب';
    if (!/^\d{10}$/.test(deliveryInfo.phone.trim())) errors.phone = 'رقم الهاتف يجب أن يكون 10 أرقام';
    if (!deliveryInfo.address.trim()) errors.address = 'عنوان التوصيل مطلوب';
    if (!deliveryInfo.wilaya) errors.wilaya = 'ولاية التوصيل مطلوبة';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (hasInvalidItems) {
      setError('يوجد منتجات بدون مقاس أو لون. الرجاء حذفها من السلة أو تحديث المقاس واللون.');
      return;
    }
    setShowDeliveryForm(true);
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show confirmation dialog
        setShowConfirmation(true);
        setShowDeliveryForm(false);
        
        // Clear cart and redirect after delay
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
    <Container maxWidth="lg" sx={{ py: 4, minHeight: '80vh' }}>
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
              onClick={handleCheckout}
              sx={{
                bgcolor: '#1a237e',
                py: 1.5,
                mb: 2,
                '&:hover': {
                  bgcolor: '#0d1642'
                }
              }}
            >
              إتمام الطلب
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
      >
        <DialogTitle sx={{ textAlign: 'right', fontFamily: 'Cairo' }}>
          معلومات التوصيل
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleDeliverySubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {/* Form fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="الاسم الكامل"
                  name="fullName"
                  value={deliveryInfo.fullName}
                  onChange={handleInputChange}
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName}
                  sx={{ direction: 'rtl' }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="رقم الهاتف"
                  name="phone"
                  value={deliveryInfo.phone}
                  onChange={handleInputChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  sx={{ direction: 'rtl' }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!formErrors.wilaya}>
                  <InputLabel id="wilaya-label" sx={{ direction: 'rtl', right: 14, left: 'auto' }}>
                    الولاية
                  </InputLabel>
                  <Select
                    labelId="wilaya-label"
                    name="wilaya"
                    value={deliveryInfo.wilaya}
                    onChange={handleInputChange}
                    sx={{ direction: 'rtl' }}
                  >
                    {wilayas.map((wilaya) => (
                      <MenuItem key={wilaya.id} value={wilaya.name}>
                        {wilaya.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.wilaya && (
                    <FormHelperText>{formErrors.wilaya}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="العنوان"
                  name="address"
                  value={deliveryInfo.address}
                  onChange={handleInputChange}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                  multiline
                  rows={3}
                  sx={{ direction: 'rtl' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ملاحظات إضافية"
                  name="notes"
                  value={deliveryInfo.notes}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  sx={{ direction: 'rtl' }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                onClick={() => setShowDeliveryForm(false)}
                sx={{ fontFamily: 'Cairo' }}
              >
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: '#1a237e',
                  '&:hover': { bgcolor: '#0d1642' },
                  fontFamily: 'Cairo'
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'تأكيد الطلب'
                )}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmation}
        aria-labelledby="confirmation-dialog-title"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            minWidth: { xs: '90%', sm: 400 }
          }
        }}
      >
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography 
              variant="h6" 
              component="h2" 
              sx={{ 
                mb: 2,
                fontFamily: 'Cairo',
                fontWeight: 'bold',
                color: '#1a237e'
              }}
            >
              شكراً لك!
            </Typography>
            <Typography 
              sx={{ 
                mb: 2,
                fontFamily: 'Cairo',
                color: '#666'
              }}
            >
              تم استلام طلبك بنجاح
            </Typography>
            <Typography 
              sx={{ 
                fontFamily: 'Cairo',
                color: '#666'
              }}
            >
              سيتم معالجة طلبك والاتصال بك خلال 24 ساعة القادمة
            </Typography>
          </Box>
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
