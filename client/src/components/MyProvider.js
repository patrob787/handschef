import React, { useState, useEffect, createContext } from 'react'
import Login from './Login'

export const MyContext = createContext()

function MyProvider({ children }) {

    // Login Authentication
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/check_session")
        .then((resp) => {
            if (resp.ok) {
                resp.json()
            }
        })
        .then((user) => {setUser(user)})
    }, [])

  return (
    <MyContext.Provider 
    value ={({user: user})}>
        {children}
    </MyContext.Provider>
  )
}

export default MyProvider