import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Checkout() {
  const location = useLocation();
  const product = location.state.product;
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    const orderData = {
      productId: product._id,
      quantity: quantity
    };

    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    fetch(`${process.env.REACT_APP_API_URL}/orders/checkout`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(orderData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Order created:', data);
        // Display success message using SweetAlert2
        Swal.fire('Success', 'Order created successfully!', 'success');
      })
      .catch(error => {
        console.error('Error creating order:', error);
        // Display error message using SweetAlert2
        Swal.fire('Error', 'Failed to create order.', 'error');
      });
  };

  return (
    <div className="checkout-page text-center mt-5">
      <h2>Checkout</h2>
      <p>Product: {product.name}</p>
      <p>Price: $ {product.price}</p>
      <form>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
          />
        </label>
        <Button variant="danger" onClick={handleOrder}>
          Place Order
        </Button>
      </form>
    </div>
  );
}

