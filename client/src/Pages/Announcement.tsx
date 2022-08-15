import {Container, IconButton, Input, List, ListItem, ListItemAvatar, ListItemText, Typography} from '@mui/material';

import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react'

import { myContext } from './Context';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Announce() {
  
  const ctx = useContext(myContext);
  
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  useEffect(() => {
    axios.get("/messageBoard")
    .then((res) => setMessages(res.data))
    .catch((err) => console.log(err))
  },[messages])


  const addMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      username: ctx.username,
      message,
    }
    axios.post("/addMessage", newMessage)
    .then((res) => {
      setMessage("");
    })
    .catch((err) => console.log(err))
  }

  return (
    <Container maxWidth="md">    
      
      <form style={{maxWidth: 500}} onSubmit={addMessage}>
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
           
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            MessageBoard
          </Typography>
         
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              
            {messages.map(({message, username, createdAt}, i) => (
        <ListItem
          key={i}
          disableGutters
          divider
          secondaryAction={
            <>    
              {ctx.isAdmin?<IconButton edge="end" aria-label="delete"> <DeleteIcon fontSize="small" /> </IconButton>: null}
              </>
              
          }
        >
          <ListItemAvatar>
                      {username}
                  </ListItemAvatar>
                  <ListItemText
                    primary={message}
                    secondary= {new Date(createdAt).toDateString()} 
                  />     
        </ListItem>
      ))}
            </List>

</Container>
  )
}
