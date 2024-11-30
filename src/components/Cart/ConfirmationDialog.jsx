import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography
} from '@mui/material';

const ConfirmationDialog = ({ open }) => {
  return (
    <Dialog
      open={open}
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
  );
};

export default ConfirmationDialog;
