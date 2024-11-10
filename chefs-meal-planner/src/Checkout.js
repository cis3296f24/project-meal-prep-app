/**
 * Renders the ParkSearch component page.
 * @component
 * @module Checkout
 * @returns {JSX.Element} The rendered ParkSearch component.
 */
import React from 'react';
import CheckoutHome from './Checkout/Components/CheckoutHome.jsx';
import './Style/checkout.css';
function Checkout(){
    return(
    <div className='checkout' >
        <CheckoutHome />  
    </div>
    );
}

export default Checkout;