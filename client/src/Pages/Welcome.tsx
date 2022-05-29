import React from 'react'
import Box from '@mui/material/Box';

export default function Welcome() {
 
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
            <h1>Live, Laugh, Love </h1>
        </Box>
        
    </div>
  )
}
