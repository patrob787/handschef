import React, { useEffect, useState } from 'react'
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
  
  const [ split, setSplit ] = useState([])
  const [ payments, setPayments ] = useState([])
  const [ paymentCount, setPaymentCount ] = useState(0)
  const [ ofPayment, setOfPayment ] = useState(0)
  
  console.log(orders)

  function handleCalcValue(value) {
    setCalcValue(value)
  }

  useEffect(() => {
    if (split.length > 0) {
      setDue(split[0])
    } 
  }, [split])

  
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

  function handleCash() {
    if (parseFloat(calcValue) && parseFloat(calcValue) > 0) {
      setDue((due - parseFloat(calcValue)).toFixed(2))
      
      const newPayment = {card: "CASH", charge: calcValue}
      setPayments([...payments, newPayment])
    } else {
      setDue((due - due).toFixed(2))
      
      const newPayment = {card: "CASH", charge: due}
      setPayments([...payments, newPayment])
    }
    setCalcValue("")
  }

  function handleSplitPay() {
    let payments = []
    let total = due
    let split = calcValue

    if (parseFloat(calcValue) && parseFloat(calcValue) > 0) {
      while (split > 0) {
        
        let payment = (total / split)

        if ((total - payment) < 0) {
          payment = payment - .01
        }

        payments.push(payment.toFixed(2))
        total = total - payment.toFixed(2)
        split--
      }

      setSplit(payments)
      setPaymentCount(1)
      setOfPayment(payments.length)
    }
  }
  
  // BOTTOM MENU BUTTONS
  function handleCloseCheck() {
    if (parseFloat(due) === 0) {
      fetch(`/checks/${check.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          paid: true
        })
      })
      .then(resp => resp.json())
      .then(() => {navigate("/")})
    } else {
      alert(`There is still $${due} remaining on this check`)
    }
  }
  
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
              {split.length > 0 ? <h2>${due} / {paymentCount} of {ofPayment}</h2> : <h2>${due}</h2>}
            </div>
          </div>
        </div>

        <div className="payment-options">
          <button onClick={handleCardAuth}>Card Auth</button>
          <button onClick={handleCash}>Cash</button>
          <button onClick={handleSplitPay}>Split Payment</button>
          <button>Split by Seat</button>
          <button>Apply Discount</button>
          <button>Add Gratuity</button>
        </div>
        <Calculator calc={calcValue} onCalc={handleCalcValue} />
      </div>

      <div className="option-btn-container">
        <button onClick={handleCloseCheck}>Close Check</button>
        <button>Void Payment</button>
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