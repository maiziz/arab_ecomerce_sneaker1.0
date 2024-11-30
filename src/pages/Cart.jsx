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
  Link
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
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    wilaya: '',
    city: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState({});

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
    if (!/^\d{10}$/.test(formData.phone.trim())) errors.phone = 'رقم الهاتف يجب أن يكون 10 أرقام';
    if (!formData.address.trim()) errors.address = 'العنوان مطلوب';
    if (!formData.wilaya.trim()) errors.wilaya = 'الولاية مطلوبة';
    if (!formData.city.trim()) errors.city = 'المدينة مطلوبة';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setOrderSuccess(true);
        
        // Reset cart and form after successful order
        setTimeout(() => {
          setOpenCheckout(false);
          setOrderSuccess(false);
          setFormData({
            fullName: '',
            phone: '',
            address: '',
            wilaya: '',
            city: '',
            notes: ''
          });
          // Clear cart and redirect to home page
          clearCart();
          navigate('/', { 
            state: { 
              orderSuccess: true,
              message: 'تم تأكيد طلبك بنجاح! سنتصل بك قريباً.' 
            } 
          });
        }, 3000);
      } catch (error) {
        setFormErrors({ submit: 'حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.' });
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
            component={Link}
            to="/products"
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
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'Cairo',
                        fontWeight: 'bold',
                        color: '#1a237e',
                        textAlign: 'right',
                        flex: 1
                      }}
                    >
                      {item.name}
                    </Typography>
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
              onClick={() => setOpenCheckout(true)}
              sx={{
                backgroundColor: '#1a237e',
                fontFamily: 'Cairo',
                py: 1.5,
                '&:hover': {
                  backgroundColor: '#0d1642'
                }
              }}
            >
              إتمام الشراء
            </Button>

            <Button
              component={Link}
              to="/products"
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

      {/* Checkout Dialog */}
      <Dialog 
        open={openCheckout} 
        onClose={() => !loading && setOpenCheckout(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle 
          sx={{ 
            fontFamily: 'Cairo', 
            textAlign: 'right',
            backgroundColor: '#1a237e',
            color: 'white'
          }}
        >
          معلومات التوصيل
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          {orderSuccess ? (
            <Alert 
              severity="success" 
              sx={{ 
                mt: 2, 
                fontFamily: 'Cairo',
                '& .MuiAlert-message': {
                  textAlign: 'right'
                }
              }}
            >
              تم تأكيد طلبك بنجاح! سنتصل بك قريباً لتأكيد الطلب.
            </Alert>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="fullName"
                  label="الاسم الكامل"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={!!formErrors.fullName}
                  helperText={formErrors.fullName}
                  disabled={loading}
                  InputProps={{
                    sx: { fontFamily: 'Cairo', textAlign: 'right' }
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Cairo' }
                  }}
                  sx={{ 
                    '& .MuiInputBase-input': { textAlign: 'right' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="رقم الهاتف"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  disabled={loading}
                  InputProps={{
                    sx: { fontFamily: 'Cairo', textAlign: 'right' }
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Cairo' }
                  }}
                  sx={{ 
                    '& .MuiInputBase-input': { textAlign: 'right' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  error={!!formErrors.wilaya}
                  disabled={loading}
                >
                  <InputLabel 
                    id="wilaya-label"
                    sx={{ fontFamily: 'Cairo', right: 14, left: 'auto' }}
                  >
                    الولاية
                  </InputLabel>
                  <Select
                    labelId="wilaya-label"
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleInputChange}
                    label="الولاية"
                    sx={{ 
                      fontFamily: 'Cairo',
                      textAlign: 'right',
                      '& .MuiSelect-select': { 
                        paddingRight: '32px',
                        paddingLeft: '14px'
                      }
                    }}
                  >
                    {wilayas.map((wilaya) => (
                      <MenuItem 
                        key={wilaya.id} 
                        value={wilaya.id}
                        sx={{ 
                          fontFamily: 'Cairo',
                          textAlign: 'right',
                          direction: 'rtl'
                        }}
                      >
                        {wilaya.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formErrors.wilaya && (
                    <FormHelperText sx={{ fontFamily: 'Cairo', textAlign: 'right' }}>
                      {formErrors.wilaya}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="city"
                  label="البلدية / المدينة"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={!!formErrors.city}
                  helperText={formErrors.city}
                  disabled={loading}
                  InputProps={{
                    sx: { fontFamily: 'Cairo', textAlign: 'right' }
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Cairo' }
                  }}
                  sx={{ 
                    '& .MuiInputBase-input': { textAlign: 'right' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="address"
                  label="العنوان بالتفصيل (الشارع، الحي، رقم المنزل)"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                  multiline
                  rows={3}
                  disabled={loading}
                  InputProps={{
                    sx: { fontFamily: 'Cairo', textAlign: 'right' }
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Cairo' }
                  }}
                  sx={{ 
                    '& .MuiInputBase-input': { textAlign: 'right' }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="notes"
                  label="ملاحظات إضافية (اختياري)"
                  value={formData.notes}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                  disabled={loading}
                  InputProps={{
                    sx: { fontFamily: 'Cairo', textAlign: 'right' }
                  }}
                  InputLabelProps={{
                    sx: { fontFamily: 'Cairo' }
                  }}
                  sx={{ 
                    '& .MuiInputBase-input': { textAlign: 'right' }
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {!orderSuccess && (
            <>
              <Button
                onClick={() => !loading && setOpenCheckout(false)}
                disabled={loading}
                sx={{ 
                  fontFamily: 'Cairo',
                  color: '#666'
                }}
              >
                إلغاء
              </Button>
              <Button
                variant="contained"
                onClick={handleCheckout}
                disabled={loading}
                sx={{
                  fontFamily: 'Cairo',
                  backgroundColor: '#1a237e',
                  '&:hover': {
                    backgroundColor: '#0d1642'
                  },
                  minWidth: 120
                }}
                endIcon={loading && <CircularProgress size={20} color="inherit" />}
              >
                {loading ? 'جاري المعالجة...' : 'تأكيد الطلب'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;
