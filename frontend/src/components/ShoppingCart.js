import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartDrawer = ({ onHide }) => {
  const { cart, fetchCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  useEffect(() => {
    if (!cart || !cart.cartLines) {
      return;
    }
    //Calculate the total cost
    const total = cart.cartLines.reduce((total, item) => {
      const price = item.product.special
        ? item.product.specialPrice
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
    setTotalCost(total);
  }, [cart]);

  const handleCheckout = () => {
    onHide();
  };

  return (
    <Offcanvas show={true} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ paddingTop: "0" }}>
        {!user ? (
          <p>Please log in to view and create your cart.</p>
        ) : !cart || !cart.cartLines || cart.cartLines.filter((item) => item.quantity > 0).length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {(cart?.cartLines || []).map(
              (item) =>
                item.quantity > 0 && (
                  <div
                    key={item.cartLineId}
                    className="list-group-item d-flex align-items-center mb-2"
                  >
                    <div className="item-image me-2">
                      <img
                        src={`http://localhost:3000/${item.product.imgUrl}`}
                        alt={item.product.productName}
                        style={{ height: "100px" }}
                      />
                    </div>
                    <div className="item-details flex-grow-1 me-2">
                      <div className="item-name">
                        {item.product.productName}
                      </div>
                      <div className="item-price text-muted small">
                        {item.product.special ? (
                          <p className="card-text">
                            <s>${Number(item.product.price).toFixed(2)}</s>$
                            {Number(item.product.specialPrice).toFixed(2)}
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
                )
            )}
            <div className="d-flex justify-content-center">
              <div>Total: ${totalCost.toFixed(2)}</div>
            </div>
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
