import React, { useState } from 'react'

function Order({ order, onSelected, onDeselected }) {
  const [ selected, setSelected ] = useState(false)
  // const [ modifiers, setModifiers ] = useState([])


  function handleOrderClick(e) {
    let node;
    
    if (e.target.nodeName === "P") {
      
      node = e.target.parentNode
      
      !selected ? node.classList.add("order-select") : node.classList.remove("order-select")
      
    } else {
      
      node = e.target
      
      !selected ? node.classList.add("order-select") : node.classList.remove("order-select")
      
    }
    !selected ? onSelected(order) : onDeselected(order)
    setSelected(!selected)
    
  }
  
  
  function renderModifiers() {
    if (order.modifiers.length > 0) {
      const mods = order.modifiers.map((m) => {
        if (Object.keys(m).includes("sub_item")) {
          return (
            <div className={order.staged ? "order-staged" : "order-row"}>
              <p></p>
              <p className={selected ? "order-select" : null}>{`${m.message} ${m.sub_item.name}`}</p>
              <p></p>
            </div>
          )
        } else{
          return (
            <div className={order.staged ? "order-staged" : "order-row"}>
              <p></p>
              <p className={selected ? "order-select" : null}>{`${m.message} ${m.name}`}</p>
              <p></p>
            </div>
          )
        }
        
      })
      // setModifiers(mods)
      return mods
    }
  }


  return (
    <div>
      <div className={order.staged ? "order-staged" : "order-row"} onClick={handleOrderClick}>
        <p>{Object.keys(order).includes("item") ? order.item.name : order.name}</p>
        <p>${Object.keys(order).includes("item") ? order.item.price : order.price}</p>
      </div>
      {renderModifiers()}
    </div>
  )
}

export default Order