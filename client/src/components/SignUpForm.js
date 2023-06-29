import React, { useState } from 'react'
import Popup from './Popup'

function SignUpForm({ onSignup }) {
    const [ first, setFirst ] = useState("")
    const [ last, setLast ] = useState("")
    const [ empNum, setEmpNum ] = useState("")
    const [ empConfirm, setEmpConfirm ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirm, setPasswordConfirm ] = useState("")
    const [ signUpOk, setSignUpOk ] = useState(false)

    const [ error, setError ] = useState(null)


    function handleSubmit(e) {
        e.preventDefault()
        
        if (empNum.length !== 6 || !/^\d+$/.test(empNum)) {
            setError("Employee number must be 6 digits in length")
        } else if (empNum !== empConfirm) {
            setError("Employee Number values must match!")
        } else if (6 > password.length > 10) {
            setError("Password must be between 6 and 10 characters")
        } else if (password !== passwordConfirm) {
            setError("Password values must match!")
        } else {
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    first_name: first,
                    last_name: last,
                    password: passwordConfirm,
                    emp_code: empConfirm
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if (data) {
                    setSignUpOk(true)
                    setTimeout(() => {
                        onSignup()
                    }, 2000)
                    
                } else {
                    setError("Unable to signup.")
                }
            })
        }
    }

    function closePopup(){
        setError(null)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>First Name</label><br></br>
                <input 
                    type="text" 
                    placeholder='first name' 
                    value={first} 
                    onChange={(e) => {setFirst(e.target.value)}} 
                /><br></br><br></br>

                <label>Last Name</label><br></br>
                <input 
                    type="text" 
                    placeholder='last name' 
                    value={last} 
                    onChange={(e) => {setLast(e.target.value)}} 
                /><br></br><br></br>

                <label>Set Employee Number</label><br></br>
                <input 
                    type="text" 
                    placeholder='Enter a six digit number' 
                    value={empNum} 
                    onChange={(e) => {setEmpNum(e.target.value)}} 
                /><br></br><br></br>

                <label>Confirm Employee Number</label><br></br>
                <input 
                    type="text" 
                    placeholder='Re-Enter same six digit number' 
                    value={empConfirm} 
                    onChange={(e) => {setEmpConfirm(e.target.value)}} 
                /><br></br><br></br>

                <label>Set Password</label><br></br>
                <input 
                    type="password" 
                    placeholder='Enter Password' 
                    value={password} 
                    onChange={(e) => {setPassword(e.target.value)}} 
                /><br></br><br></br>

                <label>Confirm Password</label><br></br>
                <input 
                    type="password" 
                    placeholder='Re-enter Password' 
                    value={passwordConfirm} 
                    onChange={(e) => {setPasswordConfirm(e.target.value)}}
                /><br></br><br></br>

                <button>Submit</button><br></br><br></br>

                {signUpOk ? <p>Sign Up Successful!  Redirecting to Login...</p> : null}

            </form>

            <Popup trigger={error} onClose={closePopup}>
                <h1>{error}</h1>
            </Popup>
        </div>
    )
}

export default SignUpForm