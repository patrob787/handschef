import React, { useState, useEffect, createContext } from 'react'
import Login from './Login'

export const MyContext = createContext()

function MyProvider({ children }) {

    // Login Authentication
    const [user, setUser] = useState(null)

    function onLogin(user) {
        setUser(user)
    }

    function onLogout() {
        setUser(null)
    }

    useEffect(() => {
        fetch("/check_session")
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => setUser(data))
            } else {
                resp.json()
                .then(err => console.log(err))
            }
        })
    }, [])

    if (!user) {
        return <Login onLogin={onLogin} />
    }

    return (
        <MyContext.Provider 
            value ={({user: user, onLogout: onLogout})}
        >
            {children}
        </MyContext.Provider>
    )
    }

export default MyProvider