import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar() {
  const { user } = useContext(UserContext);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const navbarHeight = document.querySelector('nav').offsetHeight;

      if (scrollPosition >= navbarHeight) {
        setIsNavbarScrolled(true);
      } else {
        setIsNavbarScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      className={`app-navbar ${isNavbarScrolled ? 'scrolled' : ''}`}
      bg={isNavbarScrolled ? 'light' : 'danger'}
      variant={isNavbarScrolled ? 'light' : 'dark'}
      expand="lg"
      sticky="top"
    >
      <Container fluid>
        <header>
          <Navbar.Brand as={NavLink} to="/">
            Audio Asia
          </Navbar.Brand>
        </header>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            {user.isAdmin && (
              <Nav.Link as={NavLink} to="/admin">
                Admin
              </Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>

            {user.id && !user.isAdmin && (
              <Nav.Link as={NavLink} to="/orders/completed">
                My Orders
              </Nav.Link>
            )}

            {user.id && (
              <Nav.Link as={NavLink} to="/users/details">
                My Account
              </Nav.Link>
            )}

            {user.id ? (
              <Nav.Link as={NavLink} to="/logout">
                Logout
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
