import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function AdminPanel() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [products, setProducts] = useState([]);
  

  const [user, setUser] = useState({ id : null, isAdmin : null });

    // Function for clearing localStorage on logout
    const unsetUser = () => {
        localStorage.clear();
    }

const token = localStorage.getItem('token');

  // Retrieve list of all products (available or unavailable)
  useEffect(() => {

    if (isAdmin) {
      fetch(`${process.env.REACT_APP_API_URL}/products/all`,{
        method: 'GET',
        headers : {
            Authorization : `Bearer ${ localStorage.getItem('token') }`
        }}
      )
        .then(response => response.json())
        .then(products => {
          setProducts(products);
          console.log(products);
        })
        .catch(error => console.error('Error retrieving products:', error));
    }
 
}, [isAdmin]);

const archiveProduct = (productId, isActive) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to change the status of this product.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      const newStatus = !isActive; // Toggle the status
      fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archive`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: newStatus }),
      })
        .then(response => response.json())
        .then(updatedProduct => {
          const updatedProducts = [...products];
          const productIndex = updatedProducts.findIndex(product => product.id === updatedProduct.id);
          if (productIndex !== -1) {
            updatedProducts[productIndex] = updatedProduct;
            setProducts(updatedProducts);
            console.log('Product status updated:', updatedProduct);
            Swal.fire('Success', 'Product status updated successfully.', 'success').then(() => {
              window.location.reload(); 
            });
          }
        })
        .catch(error => console.error('Error updating product status:', error));
    }
  });
};


  return (

    <div>
          <h1 className="mt-3 text-center">Admin Dashboard</h1>

          <Link to="/admin/createproduct" ><Button className="mt-5" variant='danger'>Create New Product</Button></Link>
          <Link className='px-4' to="/admin/allorders" ><Button className="mt-5" variant='secondary'>View All Orders</Button></Link>

          <h2 className="my-5">All Products</h2>

      <Table variant="secondary" striped  >
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan={2}>Update Products</th>
          </tr>
        </thead>
        <tbody>
            {products.map((product, slug) => (
              <tr key={slug}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>$ {product.price}</td>
                  <td>{product.isActive ? 'Active' : 'Inactive'}</td>
                  <td>

                  <Link to={`/admin/updateProduct/${product._id}`} className='px-4'>
                    <Button variant='danger'>Edit</Button>
                  </Link>

                  </td>
                <td>
                <Button variant='secondary' onClick={() => archiveProduct(product._id, product.isActive)}>
                  Archive
                </Button>
                </td>

              </tr>

              ))}
        </tbody>
    </Table>


    </div>
  );
}




