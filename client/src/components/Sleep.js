import React, { useState } from 'react'
import Calculator from './Calculator'
import pinkLogo from "../logos/2.png"


function Sleep({ user, onSleep }) {
    
    const [ number, setNumber ] = useState("")
  
    function handleSubmit(e) {
        e.preventDefault()

        if (number === user.emp_code) {
            onSleep()
        } else {
            alert("Employee number Invalid")
        }
    }

    function handleCalc(value) {
        setNumber(value)
    }

    return (
    <div className="login-container">
        <div>
            <h1>Enter Employee Number</h1>
            <Calculator calc={number} onCalc={handleCalc}/>
            <button className="login-btn" onClick={handleSubmit}>Enter</button>
        </div>
    </div>
  )
}

export default Sleep