import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Grid, Box, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Hero from '../components/Hero/Hero';

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const features = [
  {
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
    title: 'توصيل سريع',
    description: 'توصيل إلى جميع ولايات الوطن'
  },
  {
    icon: <SecurityOutlinedIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
    title: 'دفع آمن',
    description: 'طرق دفع متعددة وآمنة'
  },
  {
    icon: <SupportAgentOutlinedIcon sx={{ fontSize: 40, color: '#1a237e' }} />,
    title: 'دعم متواصل',
    description: 'فريق دعم متواجد على مدار الساعة'
  }
];

const Home = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Hero />
      
      {/* Features Section */}
      <Box sx={{ mb: 8 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          sx={{ 
            mb: 6,
            fontFamily: 'Cairo',
            fontWeight: 'bold',
            color: '#1a237e'
          }}
        >
          لماذا تختارنا؟
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  {feature.icon}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mt: 2,
                      mb: 1,
                      fontFamily: 'Cairo',
                      fontWeight: 'bold',
                      color: '#1a237e'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: '#666',
                      fontFamily: 'Cairo'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Success Message Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{
            width: '100%',
            fontFamily: 'Cairo',
            '& .MuiAlert-message': {
              textAlign: 'right'
            }
          }}
        >
          تمت إضافة المنتج بنجاح
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
