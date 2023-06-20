import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from './MyProvider'
import Nav from './Nav'
import "./App.css"

function Header() {
  const { user } = useContext(MyContext)

  const [ date, setDate ] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanUp() {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div className="header-container">
      <div className="header-details">
        <h1>Welcome, {user.first_name.toUpperCase()}</h1>
        <p>DATE: {date.toLocaleDateString()}</p>
        <p>TIME: {date.toLocaleTimeString()}</p>
      </div>
      <Nav />
    </div>
  )
}

export default Header