import React from 'react'

function SignUpForm() {
  return (
    <form>
        <label>First Name</label><br></br>
        <input type="text" placeholder='first name' /><br></br>

        <label>Last Name</label><br></br>
        <input type="text" placeholder='last name' /><br></br>

        <label>Set Employee Number</label><br></br>
        <input type="text" placeholder='Enter a six digit number' /><br></br>

        <label>Confirm Employee Number</label><br></br>
        <input type="text" placeholder='Re-Enter same six digit number' /><br></br>

        <label>Set Password</label><br></br>
        <input type="text" placeholder='Enter Password' /><br></br>

        <label>Confirm Password</label><br></br>
        <input type="text" placeholder='Re-enter Password' /><br></br>

        <button>Submit</button>

    </form>
  )
}

export default SignUpForm