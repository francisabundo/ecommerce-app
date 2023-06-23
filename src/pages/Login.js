import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

    const { user, setUser } = useContext(UserContext)
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);

	function authenticate(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);
            console.log('success')
  
            if(typeof data.access !== "undefined"){

                localStorage.setItem('token', data.access);
                console.log(data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                  icon: 'success',
                  title: 'Login successful!',
                  text: 'Welcome',
                })
            } else {

                Swal.fire({
                  icon: 'error',
                  title: 'Authentication failed',
                  text: 'Please check your login credentials and try again.'
                })
            }
        })

        setEmail('');
        setPassword('');

    }

    const retrieveUserDetails = (token) => {

        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: 'POST',
            headers : {
                Authorization : `Bearer ${ token }`
            },

        }).then(res => res.json())
        .then((data) => {

            setUser({
                id: data._id,
                isAdmin : data.isAdmin
            })

        })
    }

	useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
        (user.id) ?
            <Navigate to="/" />
        :        
            <Form className="mt-5" onSubmit={(e) => authenticate(e)}>
                
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
            			onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
            			onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                { 
                	isActive ? 
    	                <Button variant="danger" type="submit" id="submitBtn" className="mt-2">
    	                    Login
    	                </Button>
    	                : 
    	                <Button variant="danger" type="submit" id="submitBtn" className="mt-2" disabled>
    	                    Login
    	                </Button>
                }
            </Form>
    )
}

