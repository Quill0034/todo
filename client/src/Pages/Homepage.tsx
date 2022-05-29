import React from 'react'

/* eslint-disable no-unreachable */
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Homepage() {  
  return (
    <div>

      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
         Using this app, you do not need another To-do list application
        </Typography>
          
          
          <Grid container>
          <Button
            onClick={() => window.location.href = "/login"}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Button
            onClick={() => window.location.href = "/register"}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          </Grid>
        </Box>
    </Container>
  </div>
  )
}