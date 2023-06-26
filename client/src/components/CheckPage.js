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
  const [ seatNums, setSeatNums ] = useState([1])
  const [ reset, setReset ] = useState(false)
  const [ checkTotal, setCheckTotal ] = useState(0)
  
  const { allItems } = useContext(MyContext)
  // console.log(check)
  
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

        const prices = data.map(i => i.item.price)
        const total = prices.reduce((a, c) => a + c, 0)
        
        setCheckTotal(total)
      }
    })
  }, [reset])
  
  function handleCatClick(e) {
    const catItems = allItems.filter((i) => {
      return i.category === e.target.value
    })
    setMenu(catItems)
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
    console.log(itemsSelected)
    setItemsSelected([...itemsSelected, item])
  }
  
  function handleOrdersDeselected(item) {
    setItemsSelected(itemsSelected.filter((i) => {
        if (i.id !== item.id) {
          return i
        }
    }))
  }

  // function deselectAll(e) {
  //   if (
  //     e.target.parentNode.className !== "order-row order-select" &&
  //     e.target.parentNode.className !== "order-row" &&
  //     e.target.parentNode.className !== "seat-div"
  //     ) {
  //         const selected = document.querySelectorAll(".order-select")
          
  //         selected.forEach((i) => {
  //           i.classList.remove("order-select")
  //         })
  //         setItemsSelected([])
          
  //   }
  // }

  
  // BOTTOM MENU BUTTONS
  
  function addSeatClick() {
    
    const nextSeat = seatNums.length + 1
    setSeatNums([...seatNums, nextSeat])
    setSeat(nextSeat)
  }
  
  function handleSeatClick(e) {
    
    setSeat(parseInt(e.target.value))
  }

  function handleRepeat() {
    if (itemsSelected.length > 0) {
      itemsSelected.forEach((i) => {
        if (Object.keys(i).includes("item")) {

          const itemCopy = {
            id: i.item.id,
            name: i.item.name,
            price: i.item.price,
            seat_number: i.seat_number,
            staged: true
          }
          
          setCurrentOrders([...currentOrders, itemCopy])
        } else {
          
          const itemCopy = {
            id: i.id,
            name: i.name,
            price: i.price,
            seat_number: i.seat_number,
            staged: true
          }
          
          setCurrentOrders([...currentOrders, itemCopy])
        }
        
      })
    } else {
      console.log("Nothing to repeat")
    }
  }
  
  function handleVoidClick() {
    setCurrentOrders(currentOrders.filter((o) => {
      if (!itemsSelected.find((i) => {
        return i.name === o.name && i.seat_number === o.seat_number
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
    
    let prices = [];

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

        prices.push(order.price)

      }
    })

    if (prices.length > 0) {
      const priceUpdate = prices.reduce((a, c) => a + c, check.total)
      const updateTax = priceUpdate * 0.08875
  
      fetch(`/checks/${check.id}`, {
        method: "PATCH",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          total: priceUpdate.toFixed(2),
          tax: updateTax.toFixed(2) 
        })
      })
      .then(resp => resp.json())
      .then(data => setCheck(data))
    }
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
          <div>
            <h3>Table {check.table_number}</h3>
            
            <div className="seats">
              {/* <button value={"All"} onClick={handleSeatClick}>All</button> */}
              {renderSeatButtons}
            </div>
            
            <div className="check-detail">
              {renderSeats}
            </div>
          </div>

          <div className="order-total">
            <p>Total:</p>
            <p>${checkTotal.toFixed(2)}</p>
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
        <button onClick={handleRepeat}>Repeat</button>
        <button onClick={handleVoidClick}>Void</button>
        <button onClick={handlePrintClick}>Print Check</button>
        <button onClick={handleSendClick}>Send</button>
        <button onClick={handleExitClick}>Send/Exit</button>
      </div>
    
    </div>
  )
}

export default CheckPage