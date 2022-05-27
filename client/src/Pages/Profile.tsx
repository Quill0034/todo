import React, { useContext } from 'react'
import { myContext } from './Context';

export default function Profile() {
  const ctx = useContext(myContext);
  return (
    <div>Current logged in user: {ctx.username} </div>
  )
}
