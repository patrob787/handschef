import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './MyProvider'
import CheckCard from './CheckCard'
import "./App.css"

function CheckContainer({ userChecks }) {

  const { user } = useContext(MyContext)

  const checkMap = userChecks.map((check) => {
    if (!check.paid) {
    return <CheckCard key={check.id} check={check} />
    }
  })

  return (
    <div className="check-container">{checkMap}</div>
  )
}

export default CheckContainer