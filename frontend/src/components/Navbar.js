import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Offcanvas } from 'react-bootstrap'; // Import Offcanvas
import CartDrawer from './ShoppingCart'; // Import CartDrawer component

function Navbar() {
    const [showCart, setShowCart] = useState(false); // State to control Offcanvas visibility
    const location = useLocation(); // Get the current location

    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Check if user is logged in

    const handleCloseCart = () => setShowCart(false); // Function to hide Offcanvas
    const handleShowCart = () => setShowCart(true); // Function to show Offcanvas

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
                        {isLoggedIn ? (
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
                            <div className="d-flex align-items-center"> {/* Wrap shopping cart with text in a div */}
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
