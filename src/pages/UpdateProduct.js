import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
  });

  const [user, setUser] = useState({ id: null, isAdmin: null });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
    localStorage.clear();
  }

  const token = localStorage.getItem('token');


  useEffect(() => {
    // Fetch the product data from the API endpoint
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [productId]);

  const handleChange = event => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdate = event => {
    event.preventDefault();

    // Send the updated product data to the API endpoint
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product updated:', data);
        Swal.fire('Success', 'Product updated successfully!', 'success');
      })
      .catch(error => {
        console.error('Error updating product:', error);
        Swal.fire('Error', 'Failed to update product. Please use a different name.', 'error');
      });
  };

  return (
    <div className="update-product-page my-5" style={{ minHeight: '100vh' }}>
      <h2>Update Product</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="my-5" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
