import React from 'react';

const CartButtons = ({ getProductQuantity, product, user, addToCart, decreaseQuantity, increaseQuantity }) => {
  return (
    <div>
      {getProductQuantity(product.productId) === 0 ? (
        <button
          className="btn custom-button mt-1"
          onClick={() => {
            if (user) {
              addToCart(product.productId, 1);
            } else {
              alert("Please log in to add items to the cart.");
            }
          }}
        >
          Add to Cart
        </button>
      ) : (
        <>
          <button
            className="btn custom-button mt-1"
            onClick={() => decreaseQuantity(product.productId)}
          >
            -
          </button>
          <span className="mx-2 mt-1">
            {getProductQuantity(product.productId)}
          </span>
          <button
            className="btn custom-button mt-1"
            onClick={() => increaseQuantity(product.productId)}
          >
            +
          </button>
        </>
      )}
    </div>
  );
};

export default CartButtons;