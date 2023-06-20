import React from 'react'
import { Form } from 'react-router-dom'

function LoginForm({ onLogin }) {
  return (
    <form>
        <label>Employee Number</label><br></br>
        <input type="text" placeholder="Enter Employee Number" /><br></br>
        <label>Password</label><br></br>
        <input type="text" placeholder="Enter Password" /><br></br>
        <button>Login</button>
    </form>
  )
}

export default LoginForm