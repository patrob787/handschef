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
            Object.keys(order).includes("item") ? 
                <Order 
                    key={order.id} 
                    order={order.item} 
                    onSelected={onSelected} 
                    onDeselected={onDeselected} 
                /> :
                <Order 
                    key={order.name} 
                    order={order} 
                    onSelected={onSelected} 
                    onDeselected={onDeselected} 
                />
            )
    })

    return (
        <div className="seat-div">
            <h4>Seat {seatNumber}</h4>
            {renderOrders}
        </div>
    )
}

export default Seat