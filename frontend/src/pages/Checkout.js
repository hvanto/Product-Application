import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Checkout = () => {
  // All of the state variables
  const { cart, clearCart, fetchCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [creditCardError, setCreditCardError] = useState(null);
  const [expiryDateError, setExpiryDateError] = useState(null);
  const [cvvError, setCvvError] = useState(null);
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

  // Function to validate credit card number using the Luhn algorithm
  function isValidCreditCardNumber(cardNumber) {
    const cleanedCardNumber = cardNumber.replace(/\D/g, "");
    if (cleanedCardNumber.length !== 16 || isNaN(cleanedCardNumber)) {
      return "Invalid Card Number. Please enter 16 digits.";
    }
    return null;
  }

  // Function to validate expiry date
  function isValidExpiryDate(expiryDate) {
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return "Invalid Expiry Date. Please enter in the format MM/YY.";
    }

    // Split the expiry date into month and year
    const [month, year] = expiryDate
      .split("/")
      .map((part) => parseInt(part, 10));
    if (month < 1 || month > 12) {
      return "Invalid Expiry Date. Month must be between 01 and 12.";
    }

    // Creating a new date object to compare with the expiry date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    // Check if the card has expired
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return "Card has expired.";
    }

    return null;
  }

  // function to validate CVV (must be 3 digits and only numbers)
  function isValidCvv(cvv) {
    if (cvv.length !== 3 || isNaN(cvv)) {
      return "CVV must be exactly 3 digits.";
    }
    return null;
  }

  // Handle checkout logic
  const handleCheckout = () => {
    const cardNumberError = isValidCreditCardNumber(creditCardNumber);
    const expiryDateError = isValidExpiryDate(expiryDate);
    const cvvValidationError = isValidCvv(cvv); // Validate CVV

    setCreditCardError(cardNumberError);
    setExpiryDateError(expiryDateError);
    setCvvError(cvvValidationError); // Set error state for CVV

    if (!cardNumberError && !expiryDateError && !cvvValidationError) {
      setOrderConfirmed(true);
      clearCart();
      alert('Order Confirmed!')
      setCreditCardNumber("");
      setCvv("");
      setExpiryDate("");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1 className="fs-4 text-center mt-2 mb-3">Order Summary</h1>
          <>
            <div>
              {/* Display all items in the cart */}
              {(cart?.cartLines || []).map(
                (item) =>
                  item.quantity > 0 && (
                    <div
                      key={item.product.productId}
                      className="d-flex align-items-center mb-3"
                    >
                      {/* Display the item image, name, quantity, price and total price */}
                      <img
                        src={`http://localhost:3000/${item.product.imgUrl}`}
                        alt={item.product.productName}
                        style={{
                          width: "50px",
                          height: "auto",
                          marginRight: "10px",
                        }}
                      />
                      <div className="specials-text">
                        <h2 className="fs-6 mb-1">
                          {item.product.productName}
                        </h2>
                        <p
                          className="fs-7 mb-0" 
                          style={{ fontWeight: "lighter", fontSize: "0.8rem" }} 
                        >
                          Quantity: {item.quantity}
                          <br />
                          {item.product.special ? (
                            <span
                              className="card-text"
                              style={{ fontSize: "0.8rem", marginBottom: "0" }}
                            >
                              <s>${Number(item.product.price).toFixed(2)}</s> $
                              {Number(item.product.specialPrice).toFixed(2)}
                            </span>
                          ) : (
                            <span
                              className="card-text"
                              style={{ fontSize: "0.8rem", marginBottom: "0" }}
                            >
                              ${Number(item.product.price).toFixed(2)}
                            </span>
                          )}
                          <br />
                          Total Item Price: $
                          {item.product.special
                            ? (
                                Number(item.product.specialPrice) *
                                item.quantity
                              ).toFixed(2)
                            : (
                                Number(item.product.price) * item.quantity
                              ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
              )}
            </div>
            {/* Display the total cost */}
            <div className="total-cost mt-3">
              <p className="fs-6 mb-1" style={{ fontWeight: "bold" }}>
                Total Cost: ${totalCost.toFixed(2)}
              </p>
            </div>
          </>
        </div>
        <div className="col-md-6">
          {/* Display the payment form */}
          <h1 className="fs-4 text-center mt-2 mb-3">Payment Details</h1>
          <form>
            <div className="mb-3">
              {/* Display the credit card form */}
              <label htmlFor="creditCardNumber" className="form-label">
                Credit Card Number
              </label>
              <input
                type="text"
                className={`form-control ${
                  creditCardError ? "is-invalid" : ""
                }`}
                id="creditCardNumber"
                value={creditCardNumber}
                onChange={(e) => setCreditCardNumber(e.target.value)}
              />
              {creditCardError && (
                <div className="invalid-feedback">{creditCardError}</div>
              )}
            </div>
            {/* Display the expiry date form */}
            <div class="mb-3">
              <label htmlFor="expiryDate" class="form-label">
                Expiry Date
              </label>
              <input
                type="text"
                className={`form-control ${
                  expiryDateError ? "is-invalid" : ""
                }`}
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              {expiryDateError && (
                <div class="invalid-feedback">{expiryDateError}</div>
              )}
            </div>
            {/* Display the CVV form */}
            <div className="mb-3">
              <label htmlFor="cvv" class="form-label">
                CVV
              </label>
              <input
                type="text"
                className={`form-control ${cvvError ? "is-invalid" : ""}`}
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
              {cvvError && (
                <div className="invalid-feedback">{cvvError}</div>
              )}
            </div>
            <button
              type="button"
              className="btn custom-button mt-2"
              onClick={handleCheckout}
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
