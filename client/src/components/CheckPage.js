import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MyContext } from './MyProvider'

function CheckPage() {
  const location = useLocation()
  const [ check, setCheck ] = useState(location.state)
  const [ menu, setMenu ] = useState([])
  const [ orders, setOrders ] = useState([])
  const { allItems } = useContext(MyContext)

  console.log(check)
  
  function handleClick(e) {
    
    fetch(`/items/${e.target.value}`)
    .then(resp => resp.json())
    .then(items => setMenu(items))
  }

  function handleItemClick(e) {
    const item = allItems.find(i => i.button_name === e.target.value)
    
    setOrders([...orders, item])
  }
  
  const categories = Array.from(new Set(allItems.map(item => item.category)))
  
  const catBtns = categories.map((cat) => {
    return <button className="cat-btn" value={cat} onClick={handleClick}>{cat}</button>
  })
  
  const itemBtns = menu.map((item) => {
    return <button className="item-btn" value={item.button_name} onClick={handleItemClick}>{item.button_name}</button>
  })

  const orderItems = orders.map((order) => {
    return (
      <table>
        <tr>
          <td>{order.name}</td>
          <td></td>
          <td>${order.price}</td>
        </tr>
      </table>
    )
  })
  
  return (
    <div className="check-page">
      
      <div className="order-info">
        <h3>Table {check.table_number}</h3>
        {orderItems}
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