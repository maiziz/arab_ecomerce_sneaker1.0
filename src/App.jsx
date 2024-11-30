import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme, CssBaseline, CircularProgress, Box } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import './App.css'

// Lazy load components
const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const Cart = lazy(() => import('./pages/Cart'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Cairo, sans-serif',
  },
});

// Loading component
const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size, color, finalPrice) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && 
        item.size === size && 
        item.color === color
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          (item.id === product.id && item.size === size && item.color === color)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { 
        ...product, 
        size, 
        color, 
        price: finalPrice,
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateCartItems = (newItems) => {
    setCartItems(newItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Suspense fallback={<LoadingFallback />}><Home addToCart={addToCart} /></Suspense>} />
            <Route path="/products" element={<Suspense fallback={<LoadingFallback />}><Products addToCart={addToCart} /></Suspense>} />
            <Route path="/cart" element={<Suspense fallback={<LoadingFallback />}><Cart cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} updateCartItems={updateCartItems} /></Suspense>} />
            <Route path="/product/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail addToCart={addToCart} /></Suspense>} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
