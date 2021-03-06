import axios, { AxiosResponse } from 'axios'
import React , {useState} from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Register() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const register = () => {
    axios.post("/register", {
      username,
      password
    },{
    withCredentials: true
   }).then((res : AxiosResponse) => {
      if (res.data === "success") {
        window.alert("Account created successfully!")
        window.location.href = "/"
      }
    })
  }
  return (
    <>
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              autoFocus
              autoComplete = "off"
              onChange={e => setUsername(e.target.value)} />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete = "new-password"
              id="password" 
              onChange={e => setPassword(e.target.value)} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick = {register}
            >
              Register
            </Button>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Go back to Sign in"}
              </Link>
            </Grid>      
        </Box>
      </Container>
    </ThemeProvider>
      </>
  )
}
