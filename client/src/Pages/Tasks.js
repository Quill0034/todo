import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'

import { Paper, Grid, } from "@material-ui/core";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


import Item from './Item';


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
    Checkbox: {
      marginLeft: "auto",
      width: "10%"
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
        <Paper style={styles.Paper}> 
        <form onSubmit={addTodo}>
            <input 
            type= "text"
            placeholder="add Task..."
            value ={text}
            onChange = {(e) => setText (e.target.value)} />
            <button type="submit">{isUpdating? "Update": "Add"}</button>
            </form>
        </Paper>   
      </div>

      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {todo.map(item => <Item
        key={item._id} 
        text={item.text} 
        remove={() => deleteTodo(item._id)} 
        update={() => updateTodo(item._id, text.text)} />)}
      </List>
    </div>
  )
        }

