import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MyContext } from './MyProvider'

function CheckPage() {
  const location = useLocation()
  const [ check, setCheck ] = useState(location.state)
  const [ menu, setMenu ] = useState([])
  const { allItems } = useContext(MyContext)

  const categories = Array.from(new Set(allItems.map(item => item.category)))
  
  const catBtns = categories.map((cat) => {
    return <button className="cat-btn" value={cat} onClick={handleClick}>{cat}</button>
  })
  
  function handleClick(e) {
    
    fetch(`/items/${e.target.value}`)
    .then(resp => resp.json())
    .then(items => setMenu(items))
  }

  const itemBtns = menu.map((item) => {
    return <button className="item-btn" value={item.button_name}>{item.button_name}</button>
  })
  
  return (
    <div className="check-page">
      
      <div className="order-info">
        {"Order info goes here"}
      </div>
      
      <div className="menu-int">
        {itemBtns}
      </div>
      
      <div className="menu-btn-container">
        {catBtns}
      </div>
    
    </div>
  )
}

export default CheckPage