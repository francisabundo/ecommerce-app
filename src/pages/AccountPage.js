import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

export default function AccountPage() {
  const [user, setUser] = useState({ id: null, name: '', email: ''});

  const unsetUser = () => {
    localStorage.clear();
  }

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(user => {
        setUser(user);
        console.log(user);
      })
      .catch(error => console.error('Error retrieving user info:', error));
  }, []);

  return (
    <div className='my-5'>
      <h1>Account Page</h1>
      <Table className='my-5' striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Administrator</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user._id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
