import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserInterface } from '../Interfaces/Interfaces';
import { myContext } from './Context';

export default function AdminPage() {
  const ctx = useContext(myContext);
  
  const [data, setData] = useState<UserInterface[]>();
  const [selectedUser, setSelectedUser] = useState<string>();
  useEffect (() => {
    axios.get("/getallusers", {
      withCredentials: true
    }).then((res : AxiosResponse) => {

      setData(res.data.filter((item : UserInterface) => {
        return item.username !== ctx.username
      })) 
    })
  }, [ctx]);
  if (!data) {
    return null;
  }
  console.log(data);
  const deleteUser = () => {
    let userid : string;
    data.forEach((item : UserInterface) => {
      if (item.username === selectedUser) {
        userid = item.id

      }
    })
    axios.post("/deleteuser", {
      id: userid!
    }, {
      withCredentials: true
    })
  }

  return (
    <div>
      <h1>AdminPage, only ADmin can see this</h1>
      <select onChange={e => setSelectedUser(e.target.value)} name="deleteuser" id="deleteuser">
      <option id="select a user">Select a user</option>
        {
          data.map((item: UserInterface) => {
            return (
              <option key={item.username} id={item.username}>{item.username}</option>
            )
          })
        }
      </select>
      <button onClick={deleteUser}>Delete user</button>
    </div>
  )
}
