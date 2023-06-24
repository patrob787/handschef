import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyContext } from './MyProvider'
import Seat from './Seat'

function CheckPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [ check, setCheck ] = useState(location.state)
  const [ menu, setMenu ] = useState([])
  const [ currentOrders, setCurrentOrders ] = useState([])
  const [ itemsSelected, setItemsSelected ] = useState([])
  const [ seat, setSeat ] = useState(1)
  const [ seatNums, setSeatNums ] = useState([])
  const [ reset, setReset ] = useState(false)
  
  const { allItems } = useContext(MyContext)
  
  useEffect(() => {
    fetch(`/orders/check/${check.id}`)
    .then(resp => resp.json())
    .then(data => {
      setCurrentOrders(data)
      
      if (data.length > 0) {
        const nums = data.map(i => i.seat_number)
        const numArray = nums.filter((num, i) => {
          return nums.indexOf(num) === i
        })
        setSeatNums(numArray.sort())
      } else {
        setSeatNums([1])
      }
    })
  }, [reset])
  
  function handleCatClick(e) {
    const catItems = allItems.filter((i) => {
      return i.category === e.target.value
    })
    setMenu(catItems)
    
    // fetch(`/items/${e.target.value}`)
    // .then(resp => resp.json())
    // .then(items => setMenu(items))
  }

  function handleItemClick(e) {
    const item = allItems.find(i => i.button_name === e.target.value)

    const itemCopy = {
      id: item.id,
      name: item.name,
      price: item.price,
      seat_number: seat,
      staged: true
    }
    

    setCurrentOrders([...currentOrders, itemCopy])
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

  
  // BOTTOM MENU BUTTONS
  
  function addSeatClick() {
    
    const nextSeat = seatNums.length + 1
    setSeatNums([...seatNums, nextSeat])
  }
  
  function handleSeatClick(e) {
    
    setSeat(parseInt(e.target.value))
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
  
  function handlePrintClick() {
    alert("Your Check is printing!")
  }
  
  
  function handleSendClick() {
    
    currentOrders.forEach((order) => {
      if (!Object.keys(order).includes("item")) {
        
        fetch("/orders", {
          method: "POST",
          headers: {"Content-type": "application/json"},
          body: JSON.stringify({
            item_id: order.id,
            check_id: check.id,
            seat_number: order.seat_number
          })
        })
        .then(resp => resp.json())
        .then(data => {
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
  
  const renderSeatButtons = seatNums.map((num) => {
    return(
      <button value={num} onClick={handleSeatClick} className={seat === num ? "seat-select" : "seat-neutral"}>Seat {num}</button>
      )
    })
    
  
  const renderSeats = seatNums.map((num) => {
    return (
      <Seat 
        key={num} 
        orders={currentOrders} 
        seatNumber={num} 
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
            {/* <button value={"All"} onClick={handleSeatClick}>All</button> */}
            {renderSeatButtons}
          </div>
          
          <div className="check-detail">
            {renderSeats}
          </div>
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
        <button onClick={addSeatClick}>Add Seat</button>
        <button onClick={handleVoidClick}>Void</button>
        <button onClick={handlePrintClick}>Print Check</button>
        <button onClick={handleSendClick}>Send</button>
        <button onClick={handleExitClick}>Send/Exit</button>
      </div>
    
    </div>
  )
}

export default CheckPage