import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from './MyProvider'
import CheckCard from './CheckCard'
import "./App.css"
import { UNSAFE_DataRouterStateContext } from 'react-router-dom'

function CheckContainer({ userChecks }) {

  const { user } = useContext(MyContext)

  const checkMap = userChecks.map((check) => {
    return <CheckCard key={check.id} check={check} />
  })

  return (
    <div className="check-container">{checkMap}</div>
  )
}

export default CheckContainer