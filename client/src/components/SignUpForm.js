import React, { useState } from 'react'

function SignUpForm() {
    const [ first, setFirst ] = useState("")
    const [ last, setLast ] = useState("")
    const [ empNum, setEmpNum ] = useState("")
    const [ empConfirm, setEmpConfirm ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ passwordConfirm, setPasswordConfirm ] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        
        if (empNum.length !== 6 || !/^\d+$/.test(empNum)) {
            alert("Employee number must be 6 digits in length")
        } else if (empNum !== empConfirm) {
            alert("Employee Number values must match!")
        } else if (6 > password.length > 10) {
            alert("Password must be between 6 and 10 characters")
        } else if (password !== passwordConfirm) {
            alert("Password values must match!")
        } else {
            console.log(first, last, empConfirm, passwordConfirm)
        }

    }

    // function onEmpNumber(value) {
    //     if (value.length === 6 && parseInt(value)) {
    //         setEmpNum(value)
    //     } else {
    //         alert("Employee number must be 6 digits in length")
    //     }
    // }

    // function onPassword(value) {
    //     if (6 <= value.length <= 10) {
    //         setPassword(value)
    //     } else {
    //         alert("Password must be between 6 and 10 characters")
    //     }
    // }
    
    return (
        <form onSubmit={handleSubmit}>
            <label>First Name</label><br></br>
            <input 
                type="text" 
                placeholder='first name' 
                value={first} 
                onChange={(e) => {setFirst(e.target.value)}} 
            /><br></br>

            <label>Last Name</label><br></br>
            <input 
                type="text" 
                placeholder='last name' 
                value={last} 
                onChange={(e) => {setLast(e.target.value)}} 
            /><br></br>

            <label>Set Employee Number</label><br></br>
            <input 
                type="text" 
                placeholder='Enter a six digit number' 
                value={empNum} 
                onChange={(e) => {setEmpNum(e.target.value)}} 
            /><br></br>

            <label>Confirm Employee Number</label><br></br>
            <input 
                type="text" 
                placeholder='Re-Enter same six digit number' 
                value={empConfirm} 
                onChange={(e) => {setEmpConfirm(e.target.value)}} 
            /><br></br>

            <label>Set Password</label><br></br>
            <input 
                type="text" 
                placeholder='Enter Password' 
                value={password} 
                onChange={(e) => {setPassword(e.target.value)}} 
            /><br></br>

            <label>Confirm Password</label><br></br>
            <input 
                type="text" 
                placeholder='Re-enter Password' 
                value={passwordConfirm} 
                onChange={(e) => {setPasswordConfirm(e.target.value)}}
            /><br></br>

            <button>Submit</button>

        </form>
    )
}

export default SignUpForm