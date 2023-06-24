import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Banner from './components/Banner';

import { UserProvider } from './UserContext';
import ProductView from './pages/ProductView';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import AdminPanel from './pages/AdminPanel';
import CreateProduct from './pages/CreateProduct';
import AllOrders from './pages/AllOrders';
import UpdateProduct from './pages/UpdateProduct';
import AccountPage from './pages/AccountPage';
import MyOrders from './pages/MyOrders';


function App() {

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

    return (

    <UserProvider value={{ user, setUser, unsetUser }}>
 
        <Router>      
        <   AppNavbar />
            <Container className="custom-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {user?.isAdmin && (
                        <Route path="/admin" element={<AdminPanel />} />
                        )}
                    {user?.isAdmin && (
                        <Route path="/admin/createproduct" element={<CreateProduct />} />
                    )}
                    {user?.isAdmin && (
                        <Route path="/admin/allorders" element={<AllOrders />} />
                    )}
                    {user?.isAdmin && (
                        <Route path="/admin/updateproduct/:productId" element={<UpdateProduct />} />
                    )}
                    <Route path="/products/:productId" element={<ProductView />} />
                    <Route path="*" element={<Banner isError={true} />} />
                    <Route path="/products" element={<Products />} />

                    
                    

                    {
                        user.id && !user.isAdmin && (
                            <Route path="/orders/completed" element={<MyOrders />} />
                            )
					}
                    {
                        user.id && !user.isAdmin && (
                            <Route path="/orders/checkout" element={<Checkout />} />
                            )
					}


                    <Route path="/users/details" element={<AccountPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />           
                </Routes>
            </Container>
        </Router>
    </UserProvider>

  );
}

export default App;





