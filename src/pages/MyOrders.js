import React, { useEffect, useState } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({ id : null, isAdmin : null });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
      localStorage.clear();
  }

const token = localStorage.getItem('token');
  
  useEffect(() => {

   
      // Fetch user's completed orders from the backend API
      fetch('http://localhost:4000/orders/completed', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          setOrders(data);
          console.log(data);
        })
        .catch(error => console.error('Error retrieving orders:', error));
    
  }, []);

  return (
    <div className="container">
      <h1 className="my-5">My Orders</h1>

      {orders.map(order => (
        <div key={order._id} className="card mb-3">
          <div className="card-header">
            <h2 className="card-title">Order ID: {order._id}</h2>
            <p className="card-text">User ID: {order.userId}</p>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {order.orderItems.map(item => (
                <li key={item._id} className="list-group-item">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                  <p>Subtotal: ${item.subTotal}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
