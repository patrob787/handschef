import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

function Login({ onLogin }) {
    const [ displayLogin, setDisplayLogin ] = useState(true)

    function onDisplayClick() {
        setDisplayLogin(!displayLogin)
    }

  return (
    <div className="login-container">
        <div className="login-form">
            { displayLogin ? <LoginForm onLogin={onLogin} /> : <SignUpForm onSignup={onDisplayClick} /> }
        </div>
        { displayLogin ? 
            <div className="signup">
                <p>Don't have an account?</p>
                <button onClick={onDisplayClick}>Sign Up</button>
            </div> :
            <div className="signup">
                <p>Already have an account?</p>
                <button onClick={onDisplayClick}>Back to Login</button>
            </div>
        }
    </div>
  )
}

export default Login