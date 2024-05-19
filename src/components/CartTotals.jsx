import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import "../styles/SubTotal.css";
import { setShipping } from '../features/cart/cartSlice';

const CartTotals = () => {
  const dispatch = useDispatch();
  const { total, shipping } = useSelector((state) => state.cart);
  // const { shipping } = useSelector((state) => state.cart);

  // const [shipping, setShipping] = useState(0);

  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'pickUpFromStore') {
      dispatch(setShipping(0));
    } else if (selectedOption === 'nazareth') {
      dispatch(setShipping(35));
    }
    else dispatch(setShipping(50));;
  };

  return (
    <div className='card cart-totals-card'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='subtotal-text'>
          <span>Subtotal</span>
          <span className='font-medium'>₪{Math.round(total)}</span>
        </p>
        <p className='subtotal-text'>
          <span>Total after 10% discount</span>
          <span className='font-medium'>₪{Math.round(total * 0.9)}</span>
        </p>
        {/* SHIPPING */}

        <label htmlFor='shippingSelect'>Shipping Area:</label>
        <select id='shippingSelect' onChange={handleShippingChange}>
          <option value='pickUpFromStore'>Pick up from store</option>
          <option value='nazareth'>Other area</option>
          <option value='jerusalim'>Jerusalim area and West bank</option>
        </select>
        <p className='subtotal-text'>
          <span>Shipping</span>
          <span className='font-medium'>₪{shipping}</span>
        </p>
        {/* Order Total */}
        <p className='order-total-text'>
          <span>Order Total</span>
          <span className='font-medium'>₪{Math.round(total * 0.9) + shipping}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
