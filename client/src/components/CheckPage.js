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
  const [ seatNums, setSeatNums ] = useState([])
  const [ reset, setReset ] = useState(false)
  
  const { allItems } = useContext(MyContext)

  console.log("page has re-rendered", currentOrders)
  
  useEffect(() => {
    fetch(`/orders/check/${check.id}`)
    .then(resp => resp.json())
    .then(data => {
      setCurrentOrders(data)
      console.log(data)

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
    
    fetch(`/items/${e.target.value}`)
    .then(resp => resp.json())
    .then(items => setMenu(items))
  }

  function handleItemClick(e) {
    const item = allItems.find(i => i.button_name === e.target.value)
    item.seat_number = seat
    
    setCurrentOrders([...currentOrders, item])
    setSeatNums([...seatNums])
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

  function renderOrdersBySeat(number) {
    const ordersToRender = currentOrders.map((order) => {
      if (order.seat_number === number) {
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
      }
    })

    return (<div>{ordersToRender}</div>)
  }

  // BOTTOM MENU BUTTONS

  function addSeatClick() {

    const nextSeat = seatNums.length + 1
    setSeatNums([...seatNums, nextSeat])
  }

  function handleSeatClick(e) {
    console.log(e.target.value)
    setSeat(e.target.value)
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
      <button value={num} onClick={handleSeatClick}>Seat {num}</button>
    )
  })

  // const renderOrders = currentOrders.map((order) => {
  //       return (

  //         Object.keys(order).includes("item") ? 
  //         <Order 
  //           key={order.id} 
  //           order={order.item} 
  //           onSelected={handleOrdersSelected} 
  //           onDeselected={handleOrdersDeselected} 
  //         /> :
  //         <Order 
  //           key={order.id} 
  //           order={order} 
  //           onSelected={handleOrdersSelected} 
  //           onDeselected={handleOrdersDeselected} 
  //         />

  //       )
  // })

  const renderOrders = seatNums.map((num) => {
    return (
      <div>
        <h4>Seat {num}</h4>
        {renderOrdersBySeat(num)}
      </div>
    )
  })
  
  return (
    <div className="check-page">
      
      <div className="order-page">
        <div className="order-info">
          <h3>Table {check.table_number}</h3>
          <div className="seats">
            <button value={"All"} onClick={handleSeatClick}>All</button>
            {renderSeatButtons}
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