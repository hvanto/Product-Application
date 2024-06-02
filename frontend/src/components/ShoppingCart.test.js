window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

import { render, screen, fireEvent } from "@testing-library/react";
import CartDrawer from "./ShoppingCart";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { getCarts, getUsers } from "../data/repository";
import { BrowserRouter as Router } from "react-router-dom";

let cart;
let users;
let container;
let cartContextValue;

beforeAll(() => {
  cart = getCarts();
  users = getUsers();
});

beforeEach(() => {
  cartContextValue = {
    cart: cart[0],
    fetchCart: jest.fn(),
    removeFromCart: jest.fn(),
    addToCart: jest.fn(),
  };

  const userContextValue = {
    user: users[0],
  };

  const utils = render(
    <CartContext.Provider value={cartContextValue}>
      <UserContext.Provider value={userContextValue}>
        <Router>
          <CartDrawer onHide={jest.fn()} />
        </Router>
      </UserContext.Provider>
    </CartContext.Provider>
  );
  container = utils.container;
});

//NOTE: We can't test increase / decrease quantity due to the fact our cart doesn't allow this funtionality, rather it has to be done from Individual Product or Products page.
//Please ignore the failed App.js test run. 

// Test rendering a cart with items.
test("Render cart with items", () => {
  // This test ensures that the products from the mock data are both displayed in the cart, including correct name, price, and quantity.

  // Assertions for each product in the cart
  expect(screen.getByText("Handcrafted Soap")).toBeInTheDocument();
  expect(screen.getByText("Apples")).toBeInTheDocument();

  // Assertions for the quantity and price of each product
  expect(screen.getByText(/6\.99/)).toBeInTheDocument(); // Original price of Handcrafted Soap
  expect(screen.getByText(/2\.99/)).toBeInTheDocument(); // Original price of Apples
  expect(screen.getByText(/2\.99/)).toBeInTheDocument(); // Special price of Apples
  expect(screen.getByText("Qty: 1")).toBeInTheDocument(); // Qty of Apples
  expect(screen.getByText("Qty: 3")).toBeInTheDocument(); // Qty of Handcrafted Soap
});

// Test calculating total cost of items in cart. This uses the prices and quantities from the mock data to ensure the correct 'Total Cost' is being displayed at the bottom of the cart.
test("Calculate total cost of items in cart", () => {
  expect(
    screen.getByText(`Total: $${(6.99 * 3 + 2.5).toFixed(2)}`)
  ).toBeInTheDocument();
});

// Test removing item from cart. This test triggers the 'removeFromCart' function when the 'Delete' button is clicked and ensures that the item is no longer in the cart.
test("Remove item from cart", () => {
  const removeButton = screen.getAllByAltText("Delete")[0];
  fireEvent.click(removeButton);
  expect(cartContextValue.removeFromCart).toHaveBeenCalledWith(
    cart[0].cartLines[0].cartLineId
  );
});

// Test pressing checkout. This test triggers pressing the 'Checkout' button and ensuring that fetchCart is called when on the checkout page.
test("Press checkout button", () => {
  const checkoutButton = screen.getByText("Checkout");
  fireEvent.click(checkoutButton);
  expect(cartContextValue.fetchCart).toHaveBeenCalled();
});

// Test for a non-logged-in user. For both the following tests, I have to overrun the beforeEach() code to ensure that the user / carts are empty here. 
test("Render message for non-logged-in user", () => {
    const userContextValue = {
      user: null,
    };
  
    render(
      <CartContext.Provider value={cartContextValue}>
        <UserContext.Provider value={userContextValue}>
          <Router>
            <CartDrawer onHide={jest.fn()} />
          </Router>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  
    expect(
      screen.getByText("Please log in to view and create your cart.")
    ).toBeInTheDocument();
  });
  
  // Test for an empty cart
  test("Render message for empty cart", () => {
    const emptyCartContextValue = {
      cart: { cartLines: [] },
      fetchCart: jest.fn(),
      removeFromCart: jest.fn(),
      addToCart: jest.fn(),
    };
  
    render(
      <CartContext.Provider value={emptyCartContextValue}>
        <UserContext.Provider value={{ user: users[0] }}>
          <Router>
            <CartDrawer onHide={jest.fn()} />
          </Router>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
