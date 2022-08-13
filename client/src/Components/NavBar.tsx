import Axios  from 'axios';
import React, { useContext, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { myContext } from '../Pages/Context';


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

import PersonIcon from '@mui/icons-material/Person';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
export default function NavBar() {
  const ctx = useContext(myContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const theme = createTheme();

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
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
   
      <AppBar position="static" >
      <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense">
            
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/welcome"
            sx={{
              
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
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            >
          
               <MenuItem onClick={handleCloseNavMenu}>
               
                <Typography style={{textDecoration:'none'}} onClick={logout} textAlign="center" component="a" href="/" >Logout</Typography>
                </MenuItem>
                {ctx.isAdmin ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography style={{textDecoration:'none'}} textAlign="center" component="a"  href="/admin" >admin</Typography> </MenuItem>
                ) : null}
                <MenuItem onClick={handleCloseNavMenu}>  
                <Typography style={{textDecoration:'none'}} textAlign="center" component="a"  href="/profile" >profile</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>  
                <Typography style={{textDecoration:'none'}} textAlign="center" component="a"  href="/tasks" >Task</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>  
                <Typography style={{textDecoration:'none'}} textAlign="center" component="a"  href="/messageBoard" >Message</Typography>
                </MenuItem>
            </Menu>
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              
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
                  
              </Button>
              {ctx.isAdmin ? (<Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} component={RouterLink} to="/admin">Admin</Button>) : null}
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to="/profile"
              >
                 Profile
                </Button>
                <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to="/tasks"
              >
                 Task
                </Button>
                <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to="/messageBoard"
              >
                 Message
                </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open profile">
              <IconButton component={RouterLink}
                to="/Profile" sx={{ p: 0 }}>
                <PersonIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          </Toolbar>
          </Container>
      </AppBar>
      
      </ThemeProvider>



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

      
</>
  )
}