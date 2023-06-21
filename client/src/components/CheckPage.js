import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function CheckPage() {
  const location = useLocation()
  const [ check, setCheck ] = useState(location.state)

  return (
    <div>
      <h1>Table {check.table_number}</h1>
    </div>
  )
}

export default CheckPage