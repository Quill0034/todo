import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserInterface } from '../Interfaces/Interfaces';
import { myContext } from './Context';

export default function AdminPage() {
  const ctx = useContext(myContext);
  
  const [data, setData] = useState<UserInterface[]>();

  


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
