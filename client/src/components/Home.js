import React, { useContext, useState, useEffect } from 'react'
import CheckContainer from './CheckContainer'
import { MyContext } from './MyProvider'

function Home() {
  const { user } = useContext(MyContext)
  const [ userChecks, setUserChecks ] = useState([])

  useEffect(() => {
    fetch(`/checks/user/${user.id}`)
    .then(resp => resp.json())
    .then(data => setUserChecks(data))
  }, [])

  console.log(userChecks)

  function updateChecks(newCheck) {
    const checks = userChecks.append(newCheck)
    setUserChecks(checks)
  }

  function handleNewCheck() {
    let table = prompt("Enter Table Number")
    
    fetch("/checks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        table_number: table
      }),
    })
    .then(resp => resp.json())
    .then(data => updateChecks(data))
  }

  return (
    <div className="home-container">
      <CheckContainer userChecks={userChecks} />
      <div className="option-container">
        <button onClick={handleNewCheck}>New Check</button>
        <button>All Open Checks</button>
        <button>Menu</button>
        <button>Options</button>
        <button>Report</button>
        <button>Admin Portal</button>
      </div>
    </div>
  )
}

export default Home