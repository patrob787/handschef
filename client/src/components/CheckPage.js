import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function CheckPage() {
  const location = useLocation()
  const [ check, setCheck ] = useState(location.state)

  return (
    <div className="check-page">
      <div className="order-info">
        {"Order info goes here"}
      </div>
    </div>
  )
}

export default CheckPage