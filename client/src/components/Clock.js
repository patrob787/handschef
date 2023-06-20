import React, { useState, useEffect } from 'react'

function Clock() {
    const [ date, setDate ] = useState(new Date())

    function refreshClock() {
      setDate(new Date())
    }
  
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000)
      return function cleanUp() {
        clearInterval(timerId)
      }
    }, [])

  return (
    <div>
        <p>DATE: {date.toLocaleDateString()}</p>
        <p>TIME: {date.toLocaleTimeString()}</p>
    </div>
  )
}

export default Clock