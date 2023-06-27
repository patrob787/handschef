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
  const [ calcValue, setCalcValue ] = useState("")
  const [ payments, setPayments ] = useState([])
  
  console.log(orders)

  function handleCalcValue(value) {
    setCalcValue(value)
  }
  
  function handleCardAuth() {
    const lastFour = prompt("Enter the last four digits of your CC")

    console.log("authorizing", lastFour)

    if (parseFloat(calcValue) && parseFloat(calcValue) > 0) {
      setDue((due - parseFloat(calcValue)).toFixed(2))
      
      const newPayment = {card: `x${lastFour}`, charge: calcValue}
      setPayments([...payments, newPayment])
    } else {
      setDue((due - due).toFixed(2))
      
      const newPayment = {card: `x${lastFour}`, charge: due}
      setPayments([...payments, newPayment])
    }
    setCalcValue("")
  }
  
  // BOTTOM MENU BUTTONS
  function handleBack() {
    navigate(`/check/${check.id}`, { state: check })
  }

  const renderOrders = orders.map((o) => {
    return <Order order={o} />
  })
 
  const renderPayments = payments.map((p) => {
    return(
      <div class="payment">
        <p>Authorized {p.card}</p>
        <p>${parseFloat(p.charge).toFixed(2)}</p>
      </div>
    )
  })
  
  return (
    <div>
      <div className="order-page">

        <div className="order-info">
          <div>
            <h3>Table {check.table_number}</h3>
            
            <div className="check-detail">
              {renderOrders}
              {renderPayments}
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
        <Calculator calc={calcValue} onCalc={handleCalcValue} />
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