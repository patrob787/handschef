import React from 'react'

function CheckCard({ check }) {
  
  return (
    <div className="check-card">
      <h1>{check.table_number}</h1>
      <p>Check #: {check.id}</p>
      <p>${check.total.toFixed(2)}</p>
    </div>
  )
}

export default CheckCard