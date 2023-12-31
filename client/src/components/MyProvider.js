import React, { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'
import Sleep from './Sleep'

export const MyContext = createContext()

function MyProvider({ children }) {
    const navigate = useNavigate()

    // All Items
    const [ allItems, setAllItems ] = useState([])

    useEffect(() => {
        fetch("/items")
        .then(resp => resp.json())
        .then(items => setAllItems(items))
    }, [])
    
    // Login Authentication
    const [user, setUser] = useState(null)

    function onLogin(user) {
        setUser(user)
        navigate("/")
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

    //Sleep Function
    const [sleep, setSleep] = useState(false)

    function onSleep() {
        if (sleep) {
            navigate("/")
        }
        setSleep(!sleep)
    }
    
    if (!user) {
        return <Login onLogin={onLogin} />
    }

    if (sleep) {
        return <Sleep user={user} onSleep={onSleep} />
    }

    return (
        <MyContext.Provider 
            value ={({user: user, onLogout: onLogout, onSleep: onSleep, allItems: allItems})}
        >
            {children}
        </MyContext.Provider>
    )
    }

export default MyProvider