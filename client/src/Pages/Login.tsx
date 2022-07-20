/* eslint-disable no-unreachable */
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
import { createTheme, Paper, ThemeProvider } from '@mui/material';

const theme = createTheme();

export default function Homepage() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const Login = (event: any) => {
    event.preventDefault();
    axios.post("/login", {
      username,
      password
    },{
    withCredentials: true
   }).then((res : AxiosResponse) => {
      if (res.data === "success") {
        window.location.href = "/welcome"
      }
    }, () => {

    })
  }

   return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={Login} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            autoComplete = "off"
            autoFocus
            onChange={e => setUsername(e.target.value) }
          />
          <TextField
            margin="normal"
            required
            fullWidth   
            label="Password"
            type="password"
            autoComplete = "new-password"
            id="password"     
            onChange={e => setPassword(e.target.value) }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
 
          <Grid container>
            <Grid item xs>
              <Link href="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
     </Box>
 
        </Grid>
    </Grid>
    </ThemeProvider>
    
   )
    // eslint-disable-next-line no-lone-blocks
    {/* <div>
      <h1>Login</h1>
      <input type="text" placeholder='username' onChange={e => setUsername(e.target.value) }/>
      <input type ="text" placeholder='password' onChange={e => setPassword(e.target.value) }/>
      <button onClick={login}>login</button>
      {/* <button onClick={getUser}>Get User Thats Logged In</button> 
    </div> */}
 
 
}
