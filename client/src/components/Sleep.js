import React, { useState } from 'react'
import Calculator from './Calculator'
import pinkLogo from "../logos/2.png"
import Popup from './Popup'


function Sleep({ user, onSleep }) {
    
    const [ number, setNumber ] = useState("")
    const [ error, setError ] = useState(null)
  
    function handleSubmit(e) {
        e.preventDefault()

        if (number === user.emp_code) {
            onSleep()
        } else {
            setError(<h1>Invalid Employee Number</h1>)
            setNumber("")
        }
    }

    function handleCalc(value) {
        setNumber(value)
    }

    function closePopup(){
        setError(null)
    }

    return (
    <div className="login-container">
        <div>
            <h1>Enter Employee Number</h1>
            <Calculator calc={number} onCalc={handleCalc}/>
            <button className="login-btn" onClick={handleSubmit}>Enter</button>
        </div>
        <Popup trigger={error} onClose={closePopup}>
            {error}
        </Popup>
    </div>
  )
}

export default Sleep