import React, { useState } from 'react'
// import { Form } from 'react-router-dom'

function LoginForm({ onLogin }) {
    const [ number, setNumber ] = useState("")
    const [ password, setPassword ] = useState("")
  
    function onSubmit(e) {
        e.preventDefault()
        
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                number,
                password
            })
        })
        .then(resp => resp.json())
        .then(data => onLogin(data))
    }
    
    return (
        <form onSubmit={onSubmit}>
            <label>Employee Number</label><br></br>
            <input type="text" placeholder="Enter Employee Number" value={number} onChange={(e) => setNumber(e.target.value)} /><br></br><br></br>
            <label>Password</label><br></br>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
            <button>Login</button>
        </form>
    )
}

export default LoginForm