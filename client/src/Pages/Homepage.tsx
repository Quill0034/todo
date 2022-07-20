import React from 'react'

/* eslint-disable no-unreachable */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Homepage() {  
  return (
    <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <AddTaskIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            QuysTodo
          </Typography>
        </Toolbar>
      </AppBar>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              To-do List 
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and simple that you want to put down to remember 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button 
              onClick={() => window.location.href = "/login"}
            type="submit" 
            variant="contained">
              Sign in
              </Button>
              <Button 
              onClick={() => window.location.href = "/register"}
              type="submit" 
              variant="outlined"
              color="secondary">
                Register
                </Button>
            </Stack>
          </Container>
        </Box>
        </ThemeProvider>
  </div>
  )
}
