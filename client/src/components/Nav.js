import React, { useContext } from 'react'
import { MyContext } from './MyProvider'

function Nav() {

  const { onLogout, onSleep } = useContext(MyContext)
  
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    })
    .then(data => onLogout())
  }

  function handleSleep() {
    onSleep()
  }
  
  return (
    <div className="header-nav">
      <button className="nav-btn">Checkout</button>
      <button className="nav-btn" onClick={handleSleep}>Exit</button>
      <button className="nav-btn" onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Nav