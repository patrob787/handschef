import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Login({ onLogin }) {
    const [ displayLogin, setDisplayLogin ] = useState(true)

    function onDisplayClick() {
        setDisplayLogin(!displayLogin)
    }

  return (
    <div>
        <div>
            { displayLogin ? <LoginForm onLogin={onLogin} /> : <SignUpForm onSignup={onDisplayClick} /> }
        </div>
        { displayLogin ? 
            <div>
                <p>Don't have an account?</p>
                <button onClick={onDisplayClick}>Sign Up</button>
            </div> :
            <div>
                <p>Already have an account?</p>
                <button onClick={onDisplayClick}>Back to Login</button>
            </div>
        }
    </div>
  )
}

export default Login