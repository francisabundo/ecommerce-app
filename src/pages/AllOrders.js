import { useEffect, useState } from 'react';
export default function AllOrders() {
  const [orders, setOrders] = useState([]);

  
  const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/all`,{
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${ localStorage.getItem('token') }`
            }
        }
    )
      .then(response => response.json())
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error('Error retrieving orders:', error);
        console.log(data)
      });
  }, []);

  

  return (
    <div className="container all-orders-page" style={{ minHeight: '100vh' }}>
      <h2 className="my-5">All Orders</h2>

      {orders.map(order => (
        <div key={order._id} className="card mb-3">
          <div className="card-header">
            <h5>Order ID: {order._id}</h5>
            {order.orderItems.map(orderItem => (
              <div key={orderItem.product}>
                <p>User ID: {order.userId}</p>
                <h5>Order Items:</h5>
                <p>Product: {orderItem.name}</p>
                <p>Quantity: {orderItem.quantity}</p>
                <p>Price: ${orderItem.price}</p>
                <h4>Total: $ {Number(orderItem.quantity) * Number(orderItem.price)}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
