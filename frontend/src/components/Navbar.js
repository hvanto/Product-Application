import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas } from 'react-bootstrap';
import CartDrawer from './ShoppingCart';
import { UserContext } from '../context/UserContext';

function Navbar() {
    const [showCart, setShowCart] = useState(false);
    const location = useLocation();

    // Check if user is logged in
    const { loggedIn } = useContext(UserContext);

    // Function to open and close cart
    const handleCloseCart = () => setShowCart(false); 
    const handleShowCart = () => setShowCart(true);

    // Function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    // Render the Navbar component
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#739072" }}>
            <div className="container-fluid">
                {/* Navbar Brand */}
                <div className="col-4">
                    <div className="navbar-brand">
                        <Link className="nav-link" to="/">
                            <img src="/logo.png" alt="Logo" style={{ width: '100px', height: 'auto' }} /> 
                        </Link>
                    </div>
                </div>
                
                {/* Navbar Links */}
                <div className="col-4 d-flex justify-content-center">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${isActive('/')}`} to="/">
                            Groceries   
                        </Link>
                        <Link className={`nav-link ${isActive('/products')}`} to="/products" style={{ marginLeft: "20px", marginRight: "20px" }}>
                            Products
                        </Link>
                        <Link className={`nav-link ${isActive('/seminars')}`} to="/seminars" style={{ marginRight: "20px" }}>
                            Seminars
                        </Link>
                        <Link className={`nav-link ${isActive('/backyardfarm')}`} to="/backyardfarm">
                            DIY
                        </Link>
                    </div>
                </div>
                
                {/* User Profile and Shopping Cart */}
                <div className="col-4">
                    <div className="navbar-nav ms-auto justify-content-end align-items-center">
                        {/* User Profile Link */}
                        {loggedIn ? ( // Check if user is logged in
                        <Link className="nav-link" to="/profile">
                            <div className="d-flex align-items-center"> 
                                <img src="/profile.png" alt="Profile" style={{ width: '30px', height: '30px', marginRight: '5px' }} />
                                Your Profile
                            </div>
                        </Link>
                        ) : (
                            <Link className="nav-link" to="/login">
                                <img src="/profile.png" alt="Profile" style={{ width: '30px', height: '30px' }} />
                            </Link>
                        )}
                        {/* Shopping Cart Link */}
                        <Link onClick={handleShowCart}>
                            <div className="d-flex align-items-center">
                                <img src="/cart.png" alt="Shopping Cart" style={{ width: '30px', height: '30px' }} />
                            </div>
                        </Link>

                        {/* Offcanvas for Cart */}
                        <Offcanvas show={showCart} placement='end'>
                            <CartDrawer onHide={handleCloseCart} />
                        </Offcanvas>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
