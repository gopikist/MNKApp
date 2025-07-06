import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsightsIcon from '@mui/icons-material/Insights';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSidebar } from '../contexts/SidebarContext';

const drawerWidth = 220;
const collapsedDrawerWidth = 64;

const menuItems = [
  { text: 'Profile setup', icon: PersonIcon, path: '/profile-setup' },
  { text: 'View profile', icon: AccountBoxIcon, path: '/view-profile' },
  { text: 'Insights', icon: InsightsIcon, path: '/insights' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, toggleSidebar } = useSidebar();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        [`& .MuiDrawer-paper`]: { 
          width: isOpen ? drawerWidth : collapsedDrawerWidth, 
          boxSizing: 'border-box', 
          bgcolor: '#232e52', 
          color: '#fff', 
          border: 'none',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >

      <Box sx={{ overflow: 'auto' }}>
        {/* Toggle Button inside sidebar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: isOpen ? 'flex-end' : 'center',
          px: isOpen ? 2 : 0,
          py: 1,
        }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: '#fff',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <List>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = location.pathname === item.path;
            
            return (
              <ListItem 
                button 
                key={item.text}
                selected={isSelected}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                    borderLeft: '3px solid #fff',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#fff',
                    },
                    '& .MuiListItemText-primary': {
                      fontWeight: 600,
                      color: '#fff',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                  },
                  minHeight: 48,
                  px: isOpen ? 2 : 1.5,
                  justifyContent: isOpen ? 'flex-start' : 'center',
                  borderLeft: isSelected ? '3px solid #fff' : '3px solid transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.8)',
                    minWidth: isOpen ? 40 : 'auto',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <IconComponent />
                </ListItemIcon>
                {isOpen && (
                  <ListItemText 
                    primary={item.text} 
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.875rem',
                        fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                        transition: 'all 0.2s ease',
                      },
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar; 