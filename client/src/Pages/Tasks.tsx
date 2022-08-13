import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'

import {Button, Collapse, Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, List, ListItem, ListItemButton, ListItemText, Typography} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


import { ExpandLess, ExpandMore } from '@material-ui/icons';




export default function Tasks() {
  const [text, setText] =React.useState("");
  const [todo, setTodo] = React.useState([]);
  const [done, setDone] = React.useState([]);
  const [isUpdating, setUpdating] = React.useState("")
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  
  const handleClickOpenEdit = (_id: string, text: string) => {
    setOpenEdit(true);
    setUpdating(_id);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    axios.get("/todos")
    .then((res) => setTodo(res.data))
    .catch((err) => console.log(err))
  },[todo])

  useEffect(() => {
    axios.get("/done")
    .then((res) => setDone(res.data))
    .catch((err) => console.log(err))
  },[done])

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdating === "") {
      axios.post("/addTodo", {text})
      .then((res) => {

        setText("");
      })
      .catch((err) => console.log(err))
    }else{
      axios.post("/updateTodo", {_id: isUpdating, text})
      .then((res) => {
   
        setText("");
        setUpdating("");
        setOpenEdit(false);
      })
      .catch((err) => console.log(err))
    }
  }

  const deleteTodo = (_id: string) => {
    axios.post("/deleteTodo", {_id})
    .then((res) => {

    })
    .catch((err) => console.log(err))
  }

  // const updateTodo = (_id, text) => {
  //   setUpdating(_id);
  //   // setText(text);
  // }
  
  const completeTodo = (_id: string, complete: boolean) => {
    axios.put("/completeTodo", {_id, complete})
    .then((res) => {
 
    })
    .catch((err) => console.log(err))
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>     
<Container  maxWidth="lg" >    
      <form style={{maxWidth: 500}} onSubmit={addTodo}>
          <Input
          placeholder="What needs to be done?"
            type="text"
            fullWidth={true}
            value={text}
            onChange = {(e) => setText (e.target.value)}
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
        </Container>

        <Container  maxWidth="lg" >    
        <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form style={{padding: 20, margin: "auto", maxWidth: 500}}  onSubmit={addTodo}>
          <Input
            type="text"
            value={text}
            onChange = {(e) => setText (e.target.value)}
            autoFocus = {true}
          />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">Cancel</Button>
          <Button type="submit" color="success">OK</Button>
        </DialogActions>
      </Dialog>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Tasks need to be done
          </Typography>
         
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              
            {todo.map(({_id, text, complete}, i) => (
        <ListItem
          key={i}
          divider
          disableGutters
          secondaryAction={
            <>    
              <IconButton  onClick={() => {if(window.confirm('Delete the item?'))deleteTodo(_id)}}> <DeleteIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => handleClickOpenEdit(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => completeTodo(_id, complete)}> <RadioButtonUncheckedIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
            </List>
          
    </Container>

    <Container  maxWidth="lg" >  
    <div>
    <ListItemButton style={{padding: 0}}  onClick={handleOpen} >
      <Typography variant="h6" component="div">
              Tasks completed
      </Typography>
      
      {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      </div>
        
         
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              
            {done.map(({_id, text, complete}, i) => (
        <ListItem
          key={i}
          divider
          disableGutters
          secondaryAction={
            <>    
              <IconButton  onClick={() => {if(window.confirm('Delete the item?'))deleteTodo(_id)}}> <DeleteIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => handleClickOpenEdit(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => completeTodo(_id, complete)}> <CheckCircleIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
            </List>
            </Collapse>
         
    </Container>


      {/* <form style={{padding: 20, margin: "auto", width: 500}} onSubmit={addTodo}>
          <Input
          placeholder="What need to be done?"
            type="text"
            fullWidth={true}
            value={text}
            onChange = {(e) => setText (e.target.value)}
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
        <Box style={{ padding: 20, margin: "auto", textAlign: "center", width: 500}}>    
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <form style={{padding: 20, margin: "auto", width: 500}}  onSubmit={addTodo}>
          <Input
            type="text"
            value={text}
            onChange = {(e) => setText (e.target.value)}
            autoFocus = {true}
          />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">Cancel</Button>
          <Button type="submit" color="success">OK</Button>
        </DialogActions>
      </Dialog>
    <h1 style={{textAlign:"left"}}> Tasks need to be done</h1>
   
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todo.map(({_id, text, complete}, i) => (
        <ListItem
          key={i}
          divider
          disableGutters
          secondaryAction={
            <>    
              <IconButton  onClick={() => {if(window.confirm('Delete the item?'))deleteTodo(_id)}}> <DeleteIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => handleClickOpenEdit(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => completeTodo(_id, complete)}> <RadioButtonUncheckedIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    </Box>

    <Box style={{ padding: 20, margin: "auto", textAlign: "center", width: 500}} > 
    <div style={{textAlign:"left"}}>
    <ListItemButton  onClick={handleOpen} >
      <h1 >Tasks completed</h1> {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {done.map(({_id, text, complete}, i) => (
        <ListItem
          key={i}
          divider
          disableGutters
          secondaryAction={
            <>    
              <IconButton  onClick={() => {if(window.confirm('Delete the item?'))deleteTodo(_id)}}> <DeleteIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => handleClickOpenEdit(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => completeTodo(_id, complete)}> <CheckCircleIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    </Collapse>
    </Box> */}
    </div>
  )
        }

