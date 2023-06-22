import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { MyContext } from './MyProvider'
import Order from './Order'

function CheckPage() {
  const location = useLocation()
  
  const [ check, setCheck ] = useState(location.state)
  const [ menu, setMenu ] = useState([])
  const [ orders, setOrders ] = useState([])
  const [ itemsSelected, setItemsSelected ] = useState([])
  
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

  function handleOrdersSelected(item) {
    setItemsSelected([...itemsSelected, item])
  }
  
  function handleOrdersDeselected(item) {
    setItemsSelected(itemsSelected.filter((i) => {
        if (i.id !== item.id) {
          return i
        }
    }))
  }

  function handleVoidClick() {
    
    setOrders(orders.filter((o) => {
      if (!itemsSelected.find((i) => {
        return i.name === o.name
      })) {
        return o
      }
    }))
    setItemsSelected([])
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

      <Order 
        key={order.id} 
        order={order} 
        onSelected={handleOrdersSelected} 
        onDeselected={handleOrdersDeselected} 
      />
    
    )
  })
  
  return (
    <div className="check-page">
      
      <div className="order-page">
        <div className="order-info">
          <h3>Table {check.table_number}</h3>
          <div className="seats">
            <button>All</button>
            <button>Seat 1</button>
          </div>
          {orderItems}
        </div>
        
        <div className="menu-int">
          {itemBtns}
        </div>
        
        <div className="menu-btn-container">
          {catBtns}
        </div>
      </div>

      <div className="option-btn-container">
        <button>Pay</button>
        <button>Edit Seats</button>
        <button>Add Seat</button>
        <button onClick={handleVoidClick}>Void</button>
        <button>Print Check</button>
        <button>Send</button>
        <button>Send/Exit</button>
      </div>
    
    </div>
  )
}

export default CheckPage