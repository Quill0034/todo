import Axios  from 'axios';
import React, { useContext, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { myContext } from '../Pages/Context';

import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddTaskIcon from '@mui/icons-material/AddTask';
import PersonIcon from '@mui/icons-material/Person';

export default function NavBar() {
  const ctx = useContext(myContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };




  const logout = () => {
    Axios.get("/logout",{
    withCredentials: true
  }).then((res) => {
    if (res.data === "sucess") {
      window.location.href = "/";
    }
  })
  }

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AddTaskIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QUY-TODO
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               <MenuItem onClick={handleCloseNavMenu}>
                <Link component={RouterLink} onClick={logout} underline="none" textAlign="center" to="/">Logout </Link>
                </MenuItem>

                {ctx.isAdmin ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link component={RouterLink} underline="none"  to="/admin">Admin</Link> </MenuItem>
                ) : null}
                <MenuItem onClick={handleCloseNavMenu}>  
                <Link component={RouterLink} underline="none"  to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>  
                <Link component={RouterLink} underline="none" to="/Tasks">Task</Link>
                </MenuItem>
            </Menu>
          </Box>
          <AddTaskIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            QUY-TODOS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={logout}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to="/Logout"
              >
                Logout
                {ctx.isAdmin ? (<Link component={RouterLink} to="/admin">Admin</Link>) : null}  
              </Button>
              <Button
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to="/Profile"
              >
                 Profile
                </Button>
                <Button
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to="/Tasks"
              >
                 Task
                </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
              <IconButton component={RouterLink}
                to="/Profile" sx={{ p: 0 }}>
                <PersonIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          </Toolbar>
        </Container>
      </AppBar>













      {/* { ctx ? (
        <>
        <Link onClick={logout} to="/logout">Logout</Link>
        {ctx.isAdmin ? (<Link to="/admin">Admin</Link>) : null}  
        <Link to="/profile">Profile</Link>
        </>
      ): (
        <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link> 
        </>
      )} */}
      {/* <Link onClick={logout} to="/">Logout</Link>
        {ctx.isAdmin ? (<Link to="/admin">Admin</Link>) : null}  
        <Link to="/profile">Profile</Link>
      <Link to="/Tasks">Task</Link> */}

      
      
    </div>
  )
}