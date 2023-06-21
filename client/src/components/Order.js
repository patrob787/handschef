import React, { useState } from 'react'

function Order({ order }) {
  const [ selected, setSelected ] = useState(false)

  function handleOrderClick(e) {
    let node;
    
    if (e.target.nodeName === "P") {
      console.log(e.target.parentNode.children[0].innerText)
      node = e.target.parentNode
      
      !selected ? node.classList.add("test-select") : node.classList.remove("test-select")
      
    } else {
      console.log(e.target.children[0].innerText)
      node = e.target
      
      !selected ? node.classList.add("test-select") : node.classList.remove("test-select")
      
    }
    setSelected(!selected)
    
  }

  return (
    <div className="order-row" onClick={handleOrderClick}>
      <p>{order.name}</p>
      <p>${order.price}</p>
    </div>
  )
}

export default Order