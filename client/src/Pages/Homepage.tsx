import React from 'react'

export default function Homepage() {  
  return (
    <div>
      Homepage
      <button onClick = {() => window.location.href = "/login"}>login</button>
    </div>
  )
}