import React from 'react'
import "./Popup.css"

function Popup(props) {
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            {props.children}
            <button className="popup-close" onClick={() => props.onClose()}>X</button>
        </div>
    </div>
  ) : null
}

export default Popup