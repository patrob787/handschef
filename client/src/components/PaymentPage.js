import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Order from './Order'
import Calculator from './Calculator'

function PaymentPage() {

  const location = useLocation()
  const navigate = useNavigate()
  const [ check, setCheck ] = useState(location.state)
  const [ orders, setOrders ] = useState(location.state.orders)
  const [ due, setDue ] = useState((check.total + check.tax).toFixed(2))
  const [ amountOwed, setAmountOwed ] = useState(due)
  
  console.log(orders)

  let renderPayment;
  
  function handleCardAuth() {
    const lastFour = prompt("Enter the last four digits of your CC")

    console.log("authorizing", lastFour)
    setDue(due - amountOwed)
    renderPayment =
      <div>
        <p>xxxxxxxx{lastFour}</p>
        <p>${amountOwed}</p>
      </div>
  }
  
  // BOTTOM MENU BUTTONS
  function handleBack() {
    navigate(`/check/${check.id}`, { state: check })
  }

  const renderOrders = orders.map((o) => {
    return <Order order={o} />
  })
 
  
  return (
    <div>
      <div className="order-page">

        <div className="order-info">
          <div>
            <h3>Table {check.table_number}</h3>
            
            <div className="check-detail">
              {renderPayment}
              {renderOrders}
            </div>
          </div>

          <div className="total-detail">
            <div className="total-line">
              <p>Sub-Total:</p>
              <p>${check.total.toFixed(2)}</p>
            </div>
            <div className="total-line">
              <p>Tax:</p>
              <p>${check.tax.toFixed(2)}</p>
            </div>
            <div className="total-line">
              <p>Total:</p>
              <p>${(check.total + check.tax).toFixed(2)}</p>
            </div>
            <div className="total-line">
              <h2>DUE:</h2>
              <h2>${due}</h2>
            </div>
          </div>
        </div>

        <div className="payment-options">
          <button onClick={handleCardAuth}>Card Auth</button>
          <button>Cash</button>
          <button>Split Payment</button>
          <button>Split by Seat</button>
          <button>Apply Discount</button>
          <button>???</button>
        </div>
        <Calculator />
      </div>

      <div className="option-btn-container">
        <button>Close Check</button>
        <button>?</button>
        <button>?</button>
        <button>?</button>
        <button>Edit Checks</button>
        <button>Print Check</button>
        <button>Print Auth</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  )
}

export default PaymentPage