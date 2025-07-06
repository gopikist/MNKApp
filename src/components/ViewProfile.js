import React from 'react';
import { Box, Typography } from '@mui/material';

function ViewProfile() {
  return (
    <Box sx={{ width: 950, mt: 6, mb: 6, mx: 'auto', bgcolor: '#fff', borderRadius: 3, boxShadow: '0 2px 16px 0 rgba(44,62,80,0.07)', border: '1px solid #ececec', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 650 }}>
      <Typography variant="h4" sx={{ color: '#6b7280', fontWeight: 500 }}>
        View Profile
      </Typography>
      <Typography variant="body1" sx={{ color: '#9ca3af', mt: 2 }}>
        This page is under development
      </Typography>
    </Box>
  );
}

export default ViewProfile; 