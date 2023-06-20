import React, { useContext } from 'react'
import { MyContext } from './MyProvider'

function Nav() {

  const { onLogout } = useContext(MyContext)
  
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    })
    .then(data => onLogout())
  }
  
  return (
    <div>
      <button>Does nothing</button>
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Nav