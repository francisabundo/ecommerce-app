import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function ProductView() {
  // const [user, setUser] = useState({ id : null, isAdmin : null });
  const { user } =  useContext(UserContext);
  const { productId} = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(productId)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        const data = await response.json();
        
        setProduct(data);
        console.log(data);
        console.log(user);

      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [productId]);

  const navigate = useNavigate();
  const userContext = useContext(UserContext);


   const handleCheckout = () => {
    navigate('/orders/checkout', { state: { product } });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="single-product my-5">
      {product && (
        <div>
          
          <img src={product.image} alt={product.name} />
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className='price'>$ {product.price}</p>
        </div>
      )}


      {(user.id && !user.isAdmin) ? (
        <Button variant="danger" onClick={handleCheckout}>
          Checkout
        </Button>
      ) 
        :
      (user.isAdmin) ? (null)
      : (
        <Button variant="secondary" onClick={handleLogin}>
          Login to Order
        </Button>


      )}
    </div>
  );
}


