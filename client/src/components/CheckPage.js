import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyContext } from './MyProvider'
import Order from './Order'

function CheckPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [ check, setCheck ] = useState(location.state)
  const [ menu, setMenu ] = useState([])
  const [ currentOrders, setCurrentOrders ] = useState([])
  const [ itemsSelected, setItemsSelected ] = useState([])
  const [ seat, setSeat ] = useState(1)
  const [ reset, setReset ] = useState(false)
  
  const { allItems } = useContext(MyContext)

  console.log(reset)


  useEffect(() => {
    fetch(`/orders/check/${check.id}`)
    .then(resp => resp.json())
    .then(data => {
      setCurrentOrders(data)
      console.log(data)
    })
  }, [reset])
  
  function handleCatClick(e) {
    
    fetch(`/items/${e.target.value}`)
    .then(resp => resp.json())
    .then(items => setMenu(items))
  }

  function handleItemClick(e) {
    const item = allItems.find(i => i.button_name === e.target.value)
    
    setCurrentOrders([...currentOrders, item])
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
    
    setCurrentOrders(currentOrders.filter((o) => {
      if (!itemsSelected.find((i) => {
        return i.name === o.name
      })) {
        return o
      }
    }))
    setItemsSelected([])
    
  }

  let orderCatch = [];

  function handleSendClick() {
    console.log(orderCatch)
    currentOrders.forEach((order) => {
      if (!Object.keys(order).includes("item")) {
      
        fetch("/orders", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
            item_id: order.id,
            check_id: check.id,
            seat_number: seat
          })
        })
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          setReset(!reset)
        })
      }
    })
  }


  function handleExitClick() {
    handleSendClick()
    navigate("/")
  }
  
  const categories = Array.from(new Set(allItems.map(item => item.category)))
  
  const catBtns = categories.map((cat) => {
    return <button className="cat-btn" value={cat} onClick={handleCatClick}>{cat}</button>
  })
  
  const itemBtns = menu.map((item) => {
    return <button className="item-btn" value={item.button_name} onClick={handleItemClick}>{item.button_name}</button>
  })


  const renderOrders = currentOrders.map((order) => {
        return (

          Object.keys(order).includes("item") ? 
          <Order 
            key={order.id} 
            order={order.item} 
            onSelected={handleOrdersSelected} 
            onDeselected={handleOrdersDeselected} 
          /> :
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
          {renderOrders}
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
        <button onClick={handleSendClick}>Send</button>
        <button onClick={handleExitClick}>Send/Exit</button>
      </div>
    
    </div>
  )
}

export default CheckPage