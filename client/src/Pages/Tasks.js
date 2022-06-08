import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'

import Box from '@mui/material/Box';

import IconButton from "@material-ui/core/IconButton";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function Tasks() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("")

  const styles = {
    Paper: {
      padding: 20,
      margin: "auto",
      textAlign: "center",
      width: 500
    },
    Box: {
      sx: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }
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
  
  return (
    <div className="Todo">
      <div>
      <Box style={styles.Paper}> 
        {/* <Paper style={styles.Paper}>  */}
        <form onSubmit={addTodo}>
            <TextField  label="Task"
          size="small" color="success" focused 
            type= "text"
            value ={text}
            onChange = {(e) => setText (e.target.value)} />
            
            <Button variant="contained" color="success" type="submit">{isUpdating? "Update": "Add"}</Button>
            </form>
        {/* </Paper>    */}
        </Box>
      </div>

      <Box style={styles.Paper}> 
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todo.map(({_id, text}, i) => (
        <ListItem
          key={i}
          divider
          disableGutters
          secondaryAction={
            <>    
              <IconButton  onClick={() => {if(window.confirm('Delete the item?'))deleteTodo(_id)}}> <DeleteIcon fontSize="small" /> </IconButton>
              <IconButton  onClick={() => updateTodo(_id, text)}> <CreateIcon fontSize="small" /> </IconButton>
            </>
          }
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    </Box>
    </div>
  )
        }

