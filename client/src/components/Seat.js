import React from 'react'
import Order from './Order'

function Seat({ orders, seatNumber, onSelected, onDeselected }) {
    
    const seatOrders = orders.filter((order) => {
        if (order.seat_number === seatNumber) {
            return order
        }
    })

    const renderOrders = seatOrders.map((order) => {
        return (
            <Order 
                key={order.id} 
                order={order} 
                onSelected={onSelected} 
                onDeselected={onDeselected} 
            />
        )
    })

    return (
        <div className="seat-div">
            {seatNumber === 0 ? <h4>All</h4> : <h4>Seat {seatNumber}</h4>}
            {renderOrders}
        </div>
    )
}

export default Seat