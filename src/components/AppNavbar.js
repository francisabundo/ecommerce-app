// import { useState } from 'react';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext	from '../UserContext';

export default function AppNavbar() {

	// already a global state
	// const [user, setUser] = useState(localStorage.getItem("email"));
	// console.log(user);

	const { user } = useContext(UserContext);
	console.log(user);

	return (

		<Navbar bg="danger" variant="dark" expand="lg">
			<Container fluid>

			<header>
				<Navbar.Brand as={ NavLink } to="/">Audio Asia</Navbar.Brand>
			</header>
				<Navbar.Toggle aria-controls="basic-navbar-nav"/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={ NavLink } to="/">Home</Nav.Link>
						{
							(user.isAdmin) ?
							<Nav.Link as={ NavLink } to="/admin">Admin</Nav.Link>
							: null
							
						}
						
						<Nav.Link as={ NavLink } to="/products">Products</Nav.Link>
						{
							(user.id) ?
								<Nav.Link as={ NavLink } to="/logout">Logout</Nav.Link>
								:
								<>
									<Nav.Link as={ NavLink } to="/login">Login</Nav.Link>
									<Nav.Link as={ NavLink } to="/register">Register</Nav.Link>
								</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>



	)
}