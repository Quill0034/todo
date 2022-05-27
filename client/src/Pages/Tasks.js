import React, {useState, useEffect} from 'react'
import axios, { AxiosResponse } from 'axios'



export default function Tasks() {
  const [todos, setTodos] = useState([])
  const [done, setDone] = useState([])
  const [task, setTask] = useState("")


  useEffect(() => {
    axios.get("/todos", {withCredentials: true}).then((res ) => {
      setTodos(res.data);
    })
  }, [])
 
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
        window.alert("OK!")
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
        window.alert("delete ok!")
        window.location.reload();
      }
    })

  }

  const completeTask = (b) => {
    axios.put(`/todo/${b}`).then ((res) => {
      window.location.reload();
    })
  }




  return (
    <div className="App">
      <div>
        <form onSubmit={addTask}>
      <input
        type ="text"
        placeholder ="Your task here"
        onChange = {e => setTask(e.target.value)}>
      </input>
      <button type="submit">Add</button>
      </form>
      </div>

 <h1>Tasks need to be done</h1>
        <ul>
    {todos.map(({ _id, task, complete}, i) => (
      <li
        key={i}
      >
        {task} 
        <input type='checkbox' onClick={() => completeTask(_id)}></input>
          <button  onClick={ () => deleteTask(_id)}>x</button>
          
          
          
      </li>
    ))}
    </ul>

    <h1>Tasks completed</h1>

{done.map(({ _id, task, complete}, i) => (
      <li
        key={i}
      >
        {task} 
        <input type='checkbox' onClick={() => completeTask(_id)}></input>
          <button  onClick={ () => deleteTask(_id)}>x</button>
          
      </li>
    ))}

    </div>
  )
        }
