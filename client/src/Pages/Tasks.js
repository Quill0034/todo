import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'

import { Paper, Grid, } from "@material-ui/core";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Tasks() {
  const [todos, setTodos] = useState([])
  const [done, setDone] = useState([])
  const [task, setTask] = useState("")
  const [open, setOpen] = useState(false);

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
    axios.get("/todos", {withCredentials: true}).then((res ) => {
      setTodos(res.data);
    })
  }, []
 )
 
  useEffect(() => {
    axios.get("/done", {withCredentials: true}).then((res ) => {
      setDone(res.data);
    })
  }, [])

  const  addTask = () => {
    axios.post("/todo", {
      task,
    }, {
      withCredentials: true
    }).then((res) => {
      if (res.data === "add task successfully"){
        window.location.reload();
      }
    }, () => {
      console.log("failure")
    })
  }


  // }

  const deleteTask = (b) => {
    axios.delete(`/todo/${b}`).then ((res) => {
      if (res.data === "delete task successfully") {
        window.location.reload();
      }
    })
  }

  const completeTask = (b) => {
    axios.put(`/todo/${b}`).then ((res) => {
      window.location.reload();
    })
  }

  const handleOpen = () => {
    setOpen(!open);
  };


  return (
    <div className="App">
      <div> 
      <Paper style={styles.Paper}>
        <form onSubmit={addTask}>
          <input
            type ="text"
            placeholder ="Your task here"
            onChange = {e => setTask(e.target.value)}>
          </input>
          <button type="submit">Add</button>
        </form>
        </Paper>    
      </div>

      <Box style={styles.Box.sx} >
        <h1>Tasks need to be done</h1>
          <List sx={styles.List} component="nav" aria-label="mailbox folders">
            {todos.map(({ _id, task, complete}, i) => (
              <ListItem
                key={i}
                divider
              >
                {task} 
                <Checkbox type='checkbox' style={styles.Checkbox} onClick={() => completeTask(_id)}></Checkbox>
                  <IconButton  onClick={ () => {if(window.confirm('Delete the item?'))deleteTask(_id)}}><Delete fontSize="small" /></IconButton>      
              </ListItem>
            ))}
        </List>
      </Box>
    
    <Box sx={styles.Box.sx} >

    <ListItemButton onClick={handleOpen} >
      <h1>Tasks completed</h1> {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
          <List style={styles.List}  component="nav" aria-label="mailbox folders" disablePadding>
            {done.map(({ _id, task, complete}, i) => (
              <ListItem
                key={i}
                sx={{ pl: 4 }}
                divider
              >
                <Grid container item xs={12} style={styles.Paper}>
                {task} 
                <Checkbox type='checkbox' style={styles.Checkbox} onClick={() => completeTask(_id)}></Checkbox>
                  <IconButton  onClick={ () => {if(window.confirm('Delete the item?'))deleteTask(_id)}}><Delete fontSize="small" /></IconButton>   
                  </Grid>
              </ListItem>
            ))}
          </List>
          </Collapse>
    </Box>

    </div>
  )
        }
