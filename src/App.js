import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Box,
  CssBaseline,
} from '@mui/material';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProfileSetup from './components/ProfileSetup';
import ViewProfile from './components/ViewProfile';
import Insights from './components/Insights';
import { SidebarProvider } from './contexts/SidebarContext';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <SidebarProvider>
        <Router>
          <Box sx={{ display: 'flex', bgcolor: '#f7f8fa', minHeight: '100vh', width: '100vw' }}>
            <CssBaseline />
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                p: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minHeight: '100vh', 
                bgcolor: '#f7f8fa',
                transition: 'margin-left 0.3s ease',
              }}
            >
              {/* Top Bar */}
              <TopBar />
              {/* Routes */}
              <Routes>
                <Route path="/profile-setup" element={<ProfileSetup />} />
                <Route path="/view-profile" element={<ViewProfile />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/" element={<Navigate to="/profile-setup" replace />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </SidebarProvider>
    </Provider>
  );
}

export default App;
