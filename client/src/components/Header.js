import React, { useContext } from 'react'
import { MyContext } from './MyProvider'
import Nav from './Nav'
import Clock from './Clock'
import "./App.css"
import pinkLogo from "../logos/2.png"
import pinkHat from "../logos/8.png"

function Header() {
  const { user } = useContext(MyContext)

  return (
    <div className="header-container">
      <div>
        <img id="header-logo" src={pinkHat} />
        <div className="header-details">
          <h1>Welcome, {user.first_name.toUpperCase()}</h1>
          <p>POSITION: {user.admin ? "Administrator" : "Server"}</p>
          <Clock />
        </div>
      </div>
      <Nav />
    </div>
  )
}

export default Header