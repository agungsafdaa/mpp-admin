
import React, { useState, createContext, useContext, } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { logoutUser } from "../util"
import { isAuthenticated, unauthenticateUser } from '../auth';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BreadcrumbsMobile from './BreadcrumbsMobile';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import BreadcrumbsComponents from './Breadcrumbs';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CircleIcon from '@mui/icons-material/Circle';
import Custom404 from '../pages/404';
import { useRouter } from 'next/router'
import Login from '../pages';
import Router from "next/router"
const drawerWidth = 240;
const Context = createContext();
const Layout = ({ children }) => {
  const router = useRouter()
  const authenticated = isAuthenticated()
  const data_login = JSON.parse(localStorage.getItem("dataLogin"));
  const [globalState, setGlobalState] = useState([data_login]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const MenuSidebar = [
    { label: 'Kategori Dinas', path: '/master-dinas' },
    { label: 'Master Bidang/Seksi PTSP', path: '/master-bidang-ptsp' },
    { label: 'Kategori Izin', path: '/kategori-izin' },
    { label: 'Master Persyaratan', path: '/master-persyaratan' },
    { label: 'Kecamatan & Kelurahan', path: '/kecamatan-kelurahan' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const ShowDropdown = (event) => {
    setDropdownShow(!dropdownShow)
  };

  const Logout = async () => {
    logoutUser() // add this
    localStorage.removeItem("dataLogin");
    unauthenticateUser()
    Router.push('/')
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const drawer = (
    <div className="sidebar-mpp">
      <div className="heading">
        <h3>DPMPTSP.PALEMBANG</h3>
      </div>
      <Divider />
      <Link href="/">
        <List className="menu-mpp">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="center">
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText className="menu" primary={'Dashboard'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Link>

      <List onClick={ShowDropdown} className="menu-mpp">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon className="center">
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText className="menu" primary={'Referensi'} /> <KeyboardArrowDownIcon />

          </ListItemButton>
        </ListItem>
      </List>

      {dropdownShow === false ?
        '' :
        <>
          {MenuSidebar.map((row) => (

            <Link href={row.path} key={row.label}>
              <List className="menu-mpp">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon className="center">
                      <CircleIcon style={{ fontSize: 11 }} />
                    </ListItemIcon>
                    <ListItemText className="menu" primary={row.label} style={{ fontSize: '14px!important;' }} />

                  </ListItemButton>
                </ListItem>
              </List>
            </Link>
          ))}
        </>
      }





    </div>
  );


  return (
    <>
      {authenticated === false ?
        <>
          <Divider />
          <Login />
        </>
        :
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar
            className="shadow-none"
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
            }}

          >
            <Toolbar className="navbar-mpp">

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              <BreadcrumbsComponents />
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <div className="info-login">
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      <h6>{authenticated === true ? data_login.user.user.email : ""}</h6>
                    </div>

                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
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

                  <MenuItem>
                    <Typography textAlign="center">
                      <Link href="ganti-password">
                        Ganti Password
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={Logout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>

          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer

              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Toolbar />
            <BreadcrumbsMobile />

            {children.props.statusCode === undefined ?
             
                children
           
              : <Custom404 />}

          </Box>

        </Box>
      }

    </>


  );
}

export default Layout; 