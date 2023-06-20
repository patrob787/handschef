import React, { useContext, useState } from 'react'
import { MyContext } from './MyProvider'

function Sleep({ user, onSleep }) {
    // const { onSleep } = useContext(MyContext)
    const [ number, setNumber ] = useState("")
    console.log(user)
  
    function handleSubmit(e) {
        e.preventDefault()
        
        console.log(user.emp_code, number)

        if (number === user.emp_code) {
            onSleep()
        } else {
            alert("Employee number Invalid")
        }
    }

    return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Enter Employee Number</label><br></br>
            <input type="text" value={number} onChange={(e) => {setNumber(e.target.value)}}></input><br></br>
            <button>Enter</button>
        </form>
    </div>
  )
}

export default Sleep