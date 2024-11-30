import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, removeFromCart }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      sx={{ 
        mb: 2, 
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt={item.name}
        sx={{
          width: { xs: '100%', sm: '150px' },
          height: { xs: '200px', sm: '150px' },
          objectFit: 'contain',
          borderRadius: 1
        }}
      />
      <Box sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-start' },
        gap: 1
      }}>
        <Typography variant="h6" sx={{ fontFamily: 'Cairo', textAlign: { xs: 'center', sm: 'right' } }}>
          {item.name}
        </Typography>
        <Typography sx={{ color: '#666', fontFamily: 'Cairo' }}>
          المقاس: {item.size}
        </Typography>
        <Typography sx={{ color: '#666', fontFamily: 'Cairo' }}>
          اللون: {item.color}
        </Typography>
        <Typography sx={{ fontWeight: 'bold', color: '#1a237e', fontFamily: 'Cairo' }}>
          {item.price.toLocaleString()} د.ج
        </Typography>
      </Box>
      <IconButton 
        onClick={() => removeFromCart(item.id)}
        sx={{
          color: '#d32f2f',
          alignSelf: { xs: 'center', sm: 'flex-start' }
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default CartItem;
