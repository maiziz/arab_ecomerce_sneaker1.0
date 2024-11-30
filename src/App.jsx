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

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
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
            <Route path="/" element={<Home onAddToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/products" element={<Products onAddToCart={addToCart} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                  updateCartItems={updateCartItems}
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  onAddToCart={addToCart}
                  cartItems={cartItems}
                />
              } 
            />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
}

export default App
