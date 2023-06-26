import React, { useState } from 'react'

function Order({ order, onSelected, onDeselected }) {
  const [ selected, setSelected ] = useState(false)


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


  return (
    <div className={order.staged ? "order-staged" : "order-row"} onClick={handleOrderClick}>
      <p>{Object.keys(order).includes("item") ? order.item.name : order.name}</p>
      <p>${Object.keys(order).includes("item") ? order.item.price : order.price}</p>
    </div>
  )
}

export default Order