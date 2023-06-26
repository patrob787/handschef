import React from 'react'
import "./Calc.css"

function Calculator() {
  return (
    <div className="calc-container">
        <div className="calc-head">
            <div className="calc-display"></div>
            <button>Clear</button>
            <button>Back</button>
        </div>
        <div className="calc-buttons">
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>00</button>
            <button>0</button>
            <button>.</button>
        </div>
    </div>
  )
}

export default Calculator