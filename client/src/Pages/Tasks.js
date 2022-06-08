import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'

import Box from '@mui/material/Box';
import IconButton from "@material-ui/core/IconButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Input from '@mui/material/Input';

import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Tasks() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);
  const [isUpdating, setUpdating] = useState("")
  const [open, setOpen] = useState(false);


  const styles = {
    Box: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
      width: 500
    },
    Form: {
      padding: 20,
      margin: "auto",
      width: 500
    },
    List: {
      width: '100%',
      maxWidth: 360,
      bgcolor: 'background.paper',
    }
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

  const addTodo = (event) => {
    event.preventDefault();
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
      })
      .catch((err) => console.log(err))
    }
  }

  const deleteTodo = (_id) => {
    axios.post("/deleteTodo", {_id})
    .then((res) => {

    })
    .catch((err) => console.log(err))
  }

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    // setText(text);
  }
  
  const completeTodo = (_id, complete) => {
    axios.put("/completeTodo", {_id, complete})
    .then((res) => {
 
    })
    .catch((err) => console.log(err))
  }

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="Todo">
   
      
     
      <form style={styles.Form} onSubmit={addTodo}>
      
          <Input
          placeholder="Task"
            type="text"
            value={text}
            onChange = {(e) => setText (e.target.value)}
            endAdornment={ 
                <IconButton
                  edge="end" type="submit"
                >
                  <AddBoxIcon color="success"/>
                </IconButton>
            }
          />
        </form>
        <Box style={styles.Box}> 

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
              <IconButton  onClick={() => updateTodo(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => completeTodo(_id, complete)}> <RadioButtonUncheckedIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    </Box>

    <Box style={styles.Box}> 
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
              <IconButton  onClick={() => updateTodo(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => completeTodo(_id, complete)}> <CheckCircleIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    </Collapse>
    </Box>



    </div>
  )
        }

