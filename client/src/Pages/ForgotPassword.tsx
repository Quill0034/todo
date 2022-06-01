import React from 'react'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export default function ForgotPassword() {
 
  return (
    <div>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <h1>You'd better know your password!</h1>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Go back to Sign in"}
              </Link>
            </Grid>
        </Box>
        
        
    </div>
  )
}
