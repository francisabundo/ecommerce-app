import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {

    const [user, setUser] = useState({ id : null, isAdmin : null });

    // Function for clearing localStorage on logout
    const unsetUser = () => {
        localStorage.clear();
    }

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: 'POST',
            headers : {
                Authorization : `Bearer ${ localStorage.getItem('token') }`
            }
        }).then(res => res.json())
        .then((data) => {

            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            })
        })

    }, []);

    console.log(product);

    console.log(typeof product);

    const { _id, name, description, price } = product;

    return (

            <div className='product' key={product._id}>
                <Link to={`/products/${product._id}`}>
                    <img src={product.image} alt={product.name}/>
                </Link>

                <div className="product-info text-center my-3"> 
                    <Link style={{ textDecoration: 'none' } } to={`/products/${product._id}`}>
                        <p>{product.name}</p>
                    </Link>
                    
                    <p><strong>$ {product.price}</strong></p>

                    <Link to={`/products/${product._id}`}>
                        <Button variant='danger' >View details</Button>
                    </Link>
                </div>
            </div>

        
    )
}