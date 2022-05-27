/* eslint-disable no-unreachable */
import axios, { AxiosResponse } from 'axios'
import React , {useState} from 'react'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Homepage() {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const login = () => {
    axios.post("/login", {
      username,
      password
    },{
    withCredentials: true
   }).then((res : AxiosResponse) => {
      if (res.data === "success") {
        window.location.href = "/"
      }
    }, () => {
      console.log("Failure")
    })
  }

   return (
    
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
          Sign in
        </Typography>
        
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={login}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
     
 
    </Container>
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
