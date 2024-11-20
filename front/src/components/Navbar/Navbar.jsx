import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import MonitorSharpIcon from '@mui/icons-material/MonitorSharp';
import EmergencyRecordingSharpIcon from '@mui/icons-material/EmergencyRecordingSharp';
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import JaverianaLogo from '../../assets/javeriana.png';
import "./Navbar.css";


//Para hacer que los items del menu de user settings, wrap cada setting con un Link de react-router-dom

const settings = ['Información', 'Ajustes', 'Salir'];

const pageRoutes = [
  { name: 'Inventario', path: '/inventario', icon: <InventorySharpIcon  sx={{ color: 'black', fontSize: '80px' }}/>},
  { name: 'Reservas', path: '/reservas', icon: <MenuBookSharpIcon  sx={{ color: 'black', fontSize: '80px' }}/> },
  { name: 'Historial', path: '/historial', icon: <HistorySharpIcon sx={{ color: 'black', fontSize: '80px' }}/> },
  { name: 'Monitoreo', path: '/monitoreo', icon: <MonitorSharpIcon sx={{ color: 'black', fontSize: '80px' }}/> },
  { name: 'Grabaciones', path: '/grabaciones', icon: <EmergencyRecordingSharpIcon sx={{ color: 'black', fontSize: '80px' }}/> },
  { name: 'Administración', path: '/admin', icon: <AdminPanelSettingsSharpIcon sx={{ color: 'black', fontSize: '80px' }}/> },
  { name: 'Ayuda', path: '/ayuda', icon: <HelpSharpIcon sx={{ color: 'black', fontSize: '80px' }}/> },
];

function Navbar() {
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#00adef', width: '100%' }}>
      <Container maxWidth="false">
        <Toolbar disableGutters sx={{ width: "100%", flexDirection: "row", overflow: 'hidden', justifyContent: 'space-between', alignItems: 'center' }}>
          
        <Box
          component="img"
          sx={{
            height: 200,
            width: 160,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Logo de la javeriana."
          src = {JaverianaLogo}
        />
          <Box sx={{ flexGrow: 1, 
            display: { xs: 'flex', md: 'none'}}}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                width: 70,
                height: 70,
                margin: '0 auto',
                color: 'black',
                
              }}
            >
              <MenuIcon sx={{ color: 'black', fontSize: '60px' }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pageRoutes.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Link to={page.path} style={{ textDecoration: 'none', }}>
                    {page.icon}
                    <Typography sx={{ textAlign: 'center' }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },flexDirection: 'row',justifyContent: 'space-evenly'}}>
            {pageRoutes.map((page) => (
              <Button
                key={page.path}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block',textTransform: 'none', color: 'black', flexShrink: '1', minWidth: '20px',maxWidth: '80px',}}
              >
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
                {page.icon}
                {page.name}

                </Box>

              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0}}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, backgroundColor: 'transparent'}}>

                <Box sx={{ display: 'flex', flexDirection: 'column', paddingRight: '0.5em'}}>
                  <Typography 
                    variant="body1" 
                    sx={{ marginRight: 1, fontWeight: 'bold', color: 'white' }}
                    >
                    USER
                  </Typography>
                  <Typography 
                      variant="body1" 
                      sx={{ marginRight: 1, color: 'white' }}
                      >
                      Rol
                  </Typography>
                </Box>
             
                <Avatar alt="Remy Sharp" 
                  src="" 
                  sx={{ 
                    width: { xs: 60, sm: 70, md: 70 }, // Adjust size responsively
                    height: { xs: 60, sm: 70, md: 70 },
                  }}  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '100px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;