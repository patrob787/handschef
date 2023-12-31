import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Calculator from './Calculator'

function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [ check, setCheck ] = useState(location.state)
  const [ orders, setOrders ] = useState(location.state.orders)
  
  const [ due, setDue ] = useState((check.total + check.tax).toFixed(2))
  const [ calcValue, setCalcValue ] = useState("")
  const [ payments, setPayments ] = useState([])
  
  const [ split, setSplit ] = useState([])
  const [ paymentCount, setPaymentCount ] = useState(0)
  const [ ofPayment, setOfPayment ] = useState(0)

  const [ selectedPayment, setSelectedPayment ] = useState(null)
  
  console.log(check)

  useEffect(() => {
    fetch(`/checks/${check.id}`)
    .then(resp => resp.json())
    .then(data => {
      setCheck(data)
      setDue((data.total + data.tax).toFixed(2))
      setOrders(data.orders)
    })
  },[])

  function handleCalcValue(value) {
    setCalcValue(value)
  }

  useEffect(() => {
    if (split.length > 0) {
      setDue(split[0])
      console.log(split)
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

    if (split.length > 1) {
      split.shift()
      setDue(split[0])
      setPaymentCount(paymentCount + 1)
    } else {
      setDue(0)
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
      setCalcValue("")
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

  function handleVoidPayment() {
    const filteredPayments = payments.filter((p) => {
      return p.card !== selectedPayment.card
    })
    setDue(parseFloat(due) + parseFloat(selectedPayment.charge))
    setPayments(filteredPayments)
  }
  
  function handleBack() {
    navigate(`/check/${check.id}`, { state: check })
  }

  const renderOrders = orders.map((o) => {
    return (
    <div className="order-row">
      <p>{o.item.name}</p>
      <p>${o.item.price}</p>
    </div>
    )
  })

  function onSelectPayment(e) {
    let selectPayment;
    
    if (!selectedPayment) {
      selectPayment = payments.find((p) => {
        return e.target.innerText.includes(p.card) || e.target.innerText.includes(p.charge)
      })
      setSelectedPayment(selectPayment)
    } else {
      selectPayment = selectedPayment
      setSelectedPayment(null)
    }
    
    let node;
    
    if (e.target.nodeName === "P") {
      
      node = e.target.parentNode
      
      selectedPayment !== selectPayment ? node.classList.add("order-select") : node.classList.remove("order-select")
      
    } else {
      
      node = e.target
      
      selectedPayment !== selectPayment ? node.classList.add("order-select") : node.classList.remove("order-select")
      
    }
  }
 
  const renderPayments = payments.map((p) => {
    return(
      <div class="payment" onClick={onSelectPayment}>
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
              <h2>{due >= 0 ? "DUE:" : "CHANGE:"}</h2>
              {split.length > 0 ? <h2>${due} / {paymentCount} of {ofPayment}</h2> : <h2>${Math.abs(due)}</h2>}
            </div>
          </div>
        </div>

        <div className="payment-options">
          <button onClick={handleCardAuth}>Card Auth</button>
          <button onClick={handleCash}>Cash</button>
          <button onClick={handleSplitPay}>Split Payment</button>
          <button>Split by Seat</button>
          <button>Add Gratuity</button>
          <button>Cash Tip</button>
          <button>Apply Discount</button>
        </div>
        
        <div className="payment-calc">
          <Calculator calc={calcValue} onCalc={handleCalcValue} />
        </div>
      </div>

      <div className="option-btn-container">
        <button onClick={handleCloseCheck}>Close Check</button>
        <button onClick={handleVoidPayment}>Void Payment</button>
        <button>Edit Checks</button>
        <button>Print Check</button>
        <button>Print Auth</button>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  )
}

export default PaymentPage