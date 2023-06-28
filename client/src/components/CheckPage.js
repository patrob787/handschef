import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MyContext } from './MyProvider'
import Seat from './Seat'

function CheckPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [ check, setCheck ] = useState(location.state)
  // const [ menu, setMenu ] = useState([])
  const [ currentOrders, setCurrentOrders ] = useState([])
  const [ itemsSelected, setItemsSelected ] = useState([])
  
  const [ seat, setSeat ] = useState(1)
  const [ seatNums, setSeatNums ] = useState([0, 1])
  
  const [ reset, setReset ] = useState(false)
  const [ checkTotal, setCheckTotal ] = useState(0)

  const [ itemBtns, setItemBtns ] = useState([])
  const [ toggleMod, setToggleMod ] = useState(false)
  const [ stagedItem, setStagedItem ] = useState({})
  const [ modMessage, setModMessage ] = useState("")
  
  const { allItems } = useContext(MyContext)
  
  console.log(currentOrders)

  useEffect(() => {
    fetch(`/orders/check/${check.id}`)
    .then(resp => resp.json())
    .then(data => {
      setCurrentOrders(data)
      
      if (data.length > 0) {
        const nums = data.map(i => i.seat_number)
        const reduced = nums.reduce((a, c) => {
          if (a > c) {
            return a
          } else {
            return c
          }
        }, 0)

        const numArray = []
        let i = reduced;
        
        while (i > -1) {
          numArray.push(i)
          i--
        }
        
        setSeatNums(numArray.sort())
        
        const prices = data.map(i => i.item.price)
        const total = prices.reduce((a, c) => a + c, 0)
        
        setCheckTotal(total)
      }
    })
  }, [reset])
  
  // HANDLES CATEGORY BUTTON RENDERS AND CLICKS
  function handleCatClick(e) {
    const catItems = allItems.filter((i) => {
      return i.category === e.target.value
    })
    
    setItemBtns(catItems)
    setToggleMod(false)
  }
  
  const categories = Array.from(new Set(allItems.map(item => item.category)))
  
  const catBtns = categories.map((cat) => {
    return <button className="cat-btn" value={cat} onClick={handleCatClick}>{cat}</button>
  })
  
  // HANDLES ITEM CLICKS AND BUTTONS
  function handleItemClick(e) {
    if (!toggleMod) {
      const item = allItems.find(i => i.button_name === e.target.value)
      
      if (item.item_mods.length > 0) {
        let subItems = []
        
        item.item_mods.forEach((sub) => {
          subItems.push(sub.sub_item)
        })

        setItemBtns(subItems)
        setToggleMod(true)
      }

      const itemCopy = {
        id: item.id,
        name: item.name,
        price: item.price,
        seat_number: seat,
        modifiers: [],
        staged: true
      }
      
      setCurrentOrders([...currentOrders, itemCopy])
      setStagedItem(itemCopy)
    
    } else {
      console.log(stagedItem)
      
      const parentItem = allItems.find(i => i.id === stagedItem.id)
      const mod = parentItem.item_mods.find(m => m.sub_item.button_name === e.target.value)
      
      const modifier = {
        id: mod.sub_item.id,
        name: mod.sub_item.name,
        message: modMessage
      }
      stagedItem.modifiers.push(modifier)
      console.log(stagedItem)
      const modifiedOrders = currentOrders.slice(0, -1)
      modifiedOrders.push(stagedItem)
      
      setCurrentOrders(modifiedOrders)
    }
    
  }
  
  const itemButtons = itemBtns.map((i) => {
    return <button className="item-btn" value={i.button_name} onClick={handleItemClick}>{i.button_name}</button>
  })
  
  // HANDLES MOD BUTTONS AND MOD CLICK
  function handleModClick(e) {
    setModMessage(e.target.value)
  }
  const modOptions = ["No", "On Side", "Extra"]

  const modButtons = modOptions.map((o) => {
    return <button value={o} className="mod-btn" onClick={handleModClick}>{o}</button>
  })

  //HANDLES SELECTING AND DESELECTING ORDERS ON DOM
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
  
  function handlePay() {
    navigate(`/payment/check/${check.id}`, { state: check })
  }
  
  function addSeatClick() {
    
    const nextSeat = seatNums.length
    setSeatNums([...seatNums, nextSeat])
    setSeat(nextSeat)
    setToggleMod(false)
    setItemBtns([])
  }
  
  function handleSeatClick(e) {
    
    setSeat(parseInt(e.target.value))
    setToggleMod(false)
    setItemBtns([])
  }
  
  function handleRepeat() {
    if (itemsSelected.length > 0) {
      itemsSelected.forEach((i) => {
        if (Object.keys(i).includes("item")) {

          const itemCopy = {
            id: i.item.id,
            name: i.item.name,
            price: i.item.price,
            seat_number: seat,
            staged: true
          }
          
          setCurrentOrders([...currentOrders, itemCopy])
        } else {
          
          const itemCopy = {
            id: i.id,
            name: i.name,
            price: i.price,
            seat_number: seat,
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
    setItemBtns([])
    setToggleMod(false)
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
          // setReset(!reset)
          console.log(order)
          if (order.modifiers.length > 0) {
            order.modifiers.forEach((m) => {
              fetch("/modifiers", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                  order_id: data.id,
                  sub_item_id: m.id,
                  message: m.message
                })
              })
              .then(resp => resp.json())
              .then(data => console.log(data))
            })
          }
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
    setItemBtns([])
    setToggleMod(false)
  }
  
  function handleExitClick() {
    handleSendClick()
    navigate("/")
  }
  
  
  const renderSeatButtons = seatNums.map((num) => {
    return(
      <button value={num} onClick={handleSeatClick} className={seat === num ? "seat-select" : "seat-neutral"}>{num === 0 ? "All" : `Seat ${num}`}</button>
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
  
  // COMPONENT IS DOWN HERE!

  return (
    <div className="check-page">
      <div className="order-page">
        
        <div className="order-info">
          <div>
            <h3>Table {check.table_number}</h3>
            
            <div className="seats">
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
          <div>
            { toggleMod ? modButtons : null }
          </div>
          {itemButtons}
        </div>
        
        <div className="menu-btn-container">
          {catBtns}
        </div>
      </div>

      <div className="option-btn-container">
        <button onClick={handlePay}>Pay</button>
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