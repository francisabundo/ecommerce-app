import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // State hooks to store the values of the input fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  // State to determine whether submit button is enabled or not
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword1('');
    setPassword2('');

    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: 'error',
            title: 'Duplicate email found',
            text: 'Please provide a different email',
          });
        } else {
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password1,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              if (data) {
                Swal.fire({
                  icon: 'success',
                  title: 'Registration successful',
                  text: 'Welcome!',
                });
                navigate('/login');
              }
            });
        }
      });
  }

  useEffect(() => {
    // Validation to enable submit button when all fields are populated and both passwords match
    if (
      firstName !== '' &&
      lastName !== '' &&
      email !== '' &&
      password1 !== '' &&
      password2 !== '' &&
      password1 === password2
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, password1, password2]);

  return user.id ? (
    <Navigate to="/" />
  ) : (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

      <Form onSubmit={(e) => registerUser(e)}>

        <Form.Group className='pb-3' controlId="userFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='pb-3' controlId="userLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='pb-3' controlId="userEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter an email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className='pb-3' controlId="password1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter a password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className='pb-3' controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </Form.Group>
        
        {/* conditional rendering for submit button based on isActive state */}
        {isActive ? (
          <Button variant="danger" type="submit" id="submitBtn" className="mt-2">
            Register
          </Button>
        ) : (
          <Button variant="danger" type="submit" id="submitBtn" className="mt-2" disabled>
            Register
          </Button>
        )}
      </Form>
    </div>
  );
}
