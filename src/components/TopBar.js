import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const pageTitles = {
  '/profile-setup': 'Profile setup',
  '/view-profile': 'View profile',
  '/insights': 'Insights',
};

function TopBar() {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || 'Profile setup';

  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: '#fff', 
        color: '#232e52', 
        boxShadow: 'none', 
        borderBottom: '1px solid #e0e0e0', 
        width: '100%' 
      }}
    >
      <Toolbar sx={{ minHeight: 64, px: 3 }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
          {currentTitle}
        </Typography>
        <IconButton color="inherit" sx={{ mr: 2 }}>
          <NotificationsNoneIcon />
        </IconButton>
        <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar; 