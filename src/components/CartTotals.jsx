import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../styles/SubTotal.css";

const CartTotals = () => {
  const { total } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState(30);

  const handleShippingChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'nazareth') {
      setShipping(30);
    } else if(selectedOption === 'haifa'){
      setShipping(40);
    } 
    else setShipping(50);
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
          <span className='font-medium'>₪{Math.round(total*0.9)}</span>
        </p>
        {/* SHIPPING */}
        
          <label htmlFor='shippingSelect'>Shipping Area:</label>
          <select id='shippingSelect' onChange={handleShippingChange}>
            <option value='nazareth'>Nazareth area</option>
            <option value='haifa'>Haifa area</option>
            <option value='telaviv'>Tel-Aviv area</option>
          </select>
          <p className='subtotal-text'>
          <span>Shipping</span>
          <span className='font-medium'>₪{shipping}</span>
        </p>
        {/* Order Total */}
        <p className='order-total-text'>
          <span>Order Total</span>
          <span className='font-medium'>₪{Math.round(total*0.9) + shipping}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
