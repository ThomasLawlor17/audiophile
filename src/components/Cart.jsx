import React, { useContext } from 'react'
import { AppContext } from '../App.provider'

const Cart = () => {
    const {cart} = useContext(AppContext)

  return (
    <div>
        <h5>Cart ({cart.length})</h5>
    </div>
  )
}

export default Cart