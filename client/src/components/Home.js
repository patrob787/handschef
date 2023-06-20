import React from 'react'
import CheckContainer from './CheckContainer'

function Home() {
  return (
    <div className="home-container">
      <CheckContainer />
      <div className="option-container">
        <button>New Check</button>
        <button>All Open Checks</button>
        <button>Menu</button>
        <button>Options</button>
        <button>Report</button>
        <button>Admin Portal</button>
      </div>
    </div>
  )
}

export default Home