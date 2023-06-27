import React, { useState } from 'react'
import "./Calc.css"

function Calculator({ calc, onCalc }) {
    // const [ value, setValue ] = useState("")
    console.log(calc)
    function onCalcClick(e){
        if (e.target.value === "clear") {
            onCalc("")
        } else if (e.target.value === "back") {
            onCalc(calc.slice(0, -1))
        } else if (e.target.value !== "clear" || e.target.value !== "back") {
            onCalc(calc + e.target.value)
        }
    }
    
    return (
        <div className="calc-container">
            <div className="calc-head">
                <div className="calc-display">{calc}</div>
                <button value={"clear"} onClick={onCalcClick}>Clear</button>
                <button value={"back"} onClick={onCalcClick}>Back</button>
            </div>
            <div className="calc-buttons">
                <button value="7" onClick={onCalcClick}>7</button>
                <button value="8" onClick={onCalcClick}>8</button>
                <button value="9" onClick={onCalcClick}>9</button>
                <button value="4" onClick={onCalcClick}>4</button>
                <button value="5" onClick={onCalcClick}>5</button>
                <button value="6" onClick={onCalcClick}>6</button>
                <button value="1" onClick={onCalcClick}>1</button>
                <button value="2" onClick={onCalcClick}>2</button>
                <button value="3" onClick={onCalcClick}>3</button>
                <button value="00" onClick={onCalcClick}>00</button>
                <button value="0" onClick={onCalcClick}>0</button>
                <button value="." onClick={onCalcClick}>.</button>
            </div>
        </div>
    )
}

export default Calculator