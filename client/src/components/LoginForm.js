import React, { useState } from 'react'
import Popup from './Popup'
// import { Form } from 'react-router-dom'

function LoginForm({ onLogin }) {
    const [ number, setNumber ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState(null)
  
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
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => onLogin(data))
            } else {
                resp.json()
                .then(err => setError(err.error))
            }
        }) 
    }

    function closePopup(){
        setError(null)
    }
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>Employee Number</label><br></br>
                <input type="text" placeholder="Enter Employee Number" value={number} onChange={(e) => setNumber(e.target.value)} /><br></br><br></br>
                <label>Password</label><br></br>
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br></br><br></br>
                <button>Login</button>
            </form>
            <Popup trigger={error} onClose={closePopup}>
                <h1>Invalid Input</h1>
                {error}
            </Popup>
        </div>
    )
}

export default LoginForm