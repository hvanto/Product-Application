import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer mt-3 py-3" style={{ backgroundColor: "#D2E3C8" }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/facebook" className="nav-link" >Facebook</Link></li>
                            <li><Link to="/instagram" className="nav-link">Instagram</Link></li>
                            <li><Link to="/twitter" className="nav-link">Twitter</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/storelocator" className="nav-link">Store Locator</Link></li>
                            <li><Link to="/about" className="nav-link">Our Story</Link></li>
                            <li><Link to="/contact" className="nav-link">Get in Touch</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Our Main Office:</h5>
                        <ul className="list-unstyled">
                            <li>123 Soil Street, Melbourne, VIC 3000</li>
                            <li>Phone (123) 456-7890</li>
                            <li>Email: info@soilgrocer.com</li>
                            </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
