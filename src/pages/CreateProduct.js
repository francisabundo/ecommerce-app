import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function CreateProduct() {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    image: '',
    images: [],
    price: 0,
    brand: '',
    isActive: true,
    description: ''
  });

  const [user, setUser] = useState({ id : null, isAdmin : null });

  // Function for clearing localStorage on logout
  const unsetUser = () => {
      localStorage.clear();
  }

const token = localStorage.getItem('token');

  const handleChange = event => {
    const { name, value } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Send the product data to the API endpoint
    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${ localStorage.getItem('token') }`
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product created:', data);
        Swal.fire('Success', 'Product created successfully!', 'success');
      })
      .catch(error => {
        console.error('Error creating product:', error);
        Swal.fire('Error', 'Failed to create product. Name must be unique.', 'error');
      });
  };

  return (
    <div className="create-product-page my-5" style={{ minHeight: '100vh' }}>
      <h2 className='text-center mb-5'>Create Product</h2>

      <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>

        <Form.Group controlId="name">
          <Form.Label>Name <em>(required)</em> :</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category <em>(required)</em> :</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="text"
            placeholder='/images/p10.jpg'
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price <em>(required)</em> :</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="brand">
          <Form.Label>Brand <em>(required)</em> :</Form.Label>
          <Form.Control
            type="text"
            name="brand"
            value={product.brand}
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

        <Button className='my-5' variant="danger" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}
