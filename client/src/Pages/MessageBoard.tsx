import { Box, IconButton, Input, List, ListItem, ListItemText} from '@mui/material';

import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react'

import { myContext } from './Context';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
export default function MessageBoard() {
  const ctx = useContext(myContext);
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messageBoard")
    .then((res) => setMessages(res.data))
    .catch((err) => console.log(err))
  },[messages])


  const addMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("/addMessage", {message})
    .then((res) => {
      setMessage("");
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>     
      <form style={{padding: 20, margin: "auto", width: 500}} onSubmit={addMessage}>
          <Input
          placeholder="Type your message here..."
            type="text"
            fullWidth={true}
            value={message}
            onChange = {(e) => setMessage (e.target.value)}
            endAdornment={ 
                <IconButton
                  edge="end" type="submit"
                >
                  <AddBoxIcon color="success"/>
                </IconButton>
            }
            autoFocus = {true}
          />
        </form>
        <Box >    
      
    <h1 style={{textAlign:"left"}}> Messages</h1>
   
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {messages.map(({message}, i) => (
        <ListItem
          key={i}
          divider
          disableGutters
          secondaryAction={
            <>    
              <IconButton> <DeleteIcon fontSize="small" /> </IconButton>
              </>
          }
        >
          <ListItemText primary={message} />
        </ListItem>
      ))}
    </List>
    </Box>

    
    </div>
  )
}
