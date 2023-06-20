import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './MyProvider'
import "./App.css"

function CheckContainer({ userChecks }) {

  const { user } = useContext(MyContext)

  const checkMap = userChecks.map((check) => {
    return <h1 key={check.id}>{check.table_number}</h1>
  })

  return (
    <div className="check-container">{checkMap}</div>
  )
}

export default CheckContainer