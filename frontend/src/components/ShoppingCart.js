import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

// CartDrawer component
const CartDrawer = ({ onHide }) => {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

  // Fetch the cart data
  useEffect(() => {
    fetchCart();
  }, []);

  // Calculate the total cost
  useEffect(() => {
    const total = cart.cartLines.reduce((total, item) => {
      const price = item.product.special
        ? item.product.specialPrice
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
    setTotalCost(total);
  }, [cart]);

  // Function to handle checkout
  const handleCheckout = () => {
    onHide();
  };

  // Drawer
  return (
    <Offcanvas show={true} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ paddingTop: "0" }}>
        {cart.cartLines.filter((item) => item.quantity > 0).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {/* Map through the cart items and display them */}
            {cart.cartLines.map(item => (
              item.quantity > 0 && (
                <div key={item.cartLineId} className="list-group-item d-flex align-items-center mb-2">
                  {/* Display the item image */}
                  <div className="item-image me-2">
                    <img src={item.product.imgUrl} alt={item.product.productName} style={{ height: '100px' }} />
                  </div>
                  {/* Display the item name*/}
                  <div className="item-details flex-grow-1 me-2">
                    <div className="item-name">{item.product.productName}</div>
                    <div className="item-price text-muted small">
                      {/* Display the item price */}
                      {item.product.special ? (
                        <p className="card-text"><s>${item.product.price}</s> ${item.product.specialPrice}</p>
                      ) : (
                        <p className="card-text">${item.product.price}</p>
                      )}
                    </div>
                    <div className="item-details flex-grow-1 me-2">
                      <div className="item-name">
                        {item.product.productName}
                      </div>
                      <div className="item-price text-muted small">
                        {item.product.special ? (
                          <p className="card-text">
                            <s>${Number(item.product.price).toFixed(2)}</s> 
                           ${Number(item.product.specialPrice).toFixed(2)}
                          </p>
                        ) : (
                          <p className="card-text">
                            ${Number(item.product.price).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="item-quantity text-muted small me-2">
                      Qty: {item.quantity}
                    </div>
                    <div className="item-total">
                      $
                      {item.product.special
                        ? Number(item.product.specialPrice).toFixed(2)
                        : (Number(item.product.price) * item.quantity).toFixed(
                            2
                          )}
                    </div>{" "}
                    <button
                      className="btn btn-sm"
                      onClick={() => removeFromCart(item.cartLineId)}
                    >
                      <img
                        src="/binLogo.png"
                        alt="Delete"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </button>
                  </div>
                  {/* Display the item quantity*/}
                  <div className="item-quantity text-muted small me-2">Qty: {item.quantity}</div>

                  {/* Display the item total price*/}
                  <div className="item-total">${(item.product.special ? item.product.specialPrice : item.product.price) * item.quantity}</div>

                  {/* Remove item from cart button */}
                  <button className="btn btn-sm" onClick={() => removeFromCart(item.cartLineId)}>
                    <img src="/binLogo.png" alt="Delete" style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              )
            ))}
            {/* Display the total cost */}
            <div className="d-flex justify-content-center">               
              <div>Total: ${totalCost.toFixed(2)}</div>
            </div>
            {/* Checkout button */}
            <div className="d-flex justify-content-center">
              <Link to="/checkout">
                <button
                  className="btn custom-button mt-2"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartDrawer;
