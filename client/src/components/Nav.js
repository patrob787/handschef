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

  function handleCheckout() {
    alert("Soon this will be a cool popup that'll ask if you're ready to check out and check to see if you have remaining checks and stuff!!!")
  }
  
  return (
    <div className="header-nav">
      <button className="nav-btn" onClick={handleCheckout}>Checkout</button>
      <button className="nav-btn" onClick={handleSleep}>Exit</button>
      <button className="nav-btn" onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Nav