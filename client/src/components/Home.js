import React, { useContext, useState, useEffect } from 'react'
import CheckContainer from './CheckContainer'
import { MyContext } from './MyProvider'
import { useNavigate } from 'react-router-dom'
import Popup from './Popup'
import Calculator from './Calculator'

function Home() {
  const { user } = useContext(MyContext)
  const [ userChecks, setUserChecks ] = useState([])
  const [ toggleAll, setToggleAll ] = useState(false)
  const [ popup, setPopup ] = useState(false)
  const [ popupInput, setPopupInput ] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`/checks/user/${user.id}`)
    .then(resp => resp.json())
    .then(data => setUserChecks(data))
  }, [])

  console.log(userChecks)

  function updateChecks(newCheck) {
    const checks = [...userChecks, newCheck]
    
    setUserChecks(checks)
  }
  
  function handleNewCheck() {
    setPopup(true)
    // let table = popupInput
  
    // if (table && parseInt(table) !== 0) {
    //   fetch("/checks", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //       user_id: user.id,
    //       table_number: table
    //     }),
    //   })
    //   .then(resp => resp.json())
    //   .then(data => {
    //     updateChecks(data)
    //     navigate(`/check/${data.id}`, { state: data })
    //   })
    // } else {
    //   alert("You must enter a valid table number.")
    // }
  }

  function handleAllOpen() {
    if (!toggleAll) {
      fetch("/checks")
      .then(resp => resp.json())
      .then(data => setUserChecks(data))
    } else {
      console.log(user.checks)
      setUserChecks(user.checks)
    }
    setToggleAll(!toggleAll)
  }

  function closePopup() {
    setPopupInput("")
    setPopup(false)
  }

  function enterPopupInput() {
    setPopup(false)
    let table = popupInput
  
    if (table && parseInt(table) !== 0) {
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
      .then(data => {
        updateChecks(data)
        navigate(`/check/${data.id}`, { state: data })
      })
    } else {
      alert("You must enter a valid table number.")
    }
  }

  return (
    <div className="home-container">
      <CheckContainer userChecks={userChecks} />
      <div className="option-container">
        <button onClick={handleNewCheck}>New Check</button>
        <button onClick={handleAllOpen}>{toggleAll ? "My Checks" : "All Checks"}</button>
        <button>Menu</button>
        <button>Options</button>
        <button>Report</button>
        <button>Admin Portal</button>
      </div>
      
      <Popup trigger={popup} onEnter={enterPopupInput} onClose={closePopup}>
        <h1>Enter Table Number</h1>
        <Calculator calc={popupInput} onCalc={setPopupInput} />
        <button className="popup-enter" onClick={enterPopupInput}>Enter</button>
      </Popup>
    </div>
  )
}

export default Home