import React from 'react'
import { useNavigate } from 'react-router-dom'

function CheckCard({ check }) {

  const navigate = useNavigate()
  
  function handleCardClick() {
    navigate(`check/${check.id}`, { state: check })
  }
  console.log(check)
  return (
    <div className="check-card" onClick={handleCardClick}>
      <h1>{check.table_number}</h1>
      <p>Check #: {check.id}</p>
      <p>Server: {check.user.first_name}</p>
      <p>${check.total.toFixed(2)}</p>
    </div>
  )
}

export default CheckCard