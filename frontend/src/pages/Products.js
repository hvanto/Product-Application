import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const { cart, fetchCart, addToCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  
  // Fetch products from the backend API
  useEffect(() => {
    axios.get('http://localhost:4000/api/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Get the quantity of a product in the cart
  const getProductQuantity = (productId) => {
    let quantity = 0;
  
    if (cart && cart.cartLines) {
      cart.cartLines.forEach((cartLine) => {
        if (cartLine.productId === productId) {
          quantity = cartLine.quantity;
        }
      });
    }
  
    return quantity;
  };

  return (
    <div>
      <h1 className="fs-4 text-center mt-2 mb-3">Our Products</h1>
      <div className="specials-grid mx-5">
        {products.map((product) => (
          <div key={product.productId} className="specials-item mb-3">
            <Link to={`/products/${product.productId}`} className="product-link">
              <img src={product.imgUrl} alt={product.productName} />
            </Link>
            <div className="specials-text">
              <Link to={`/products/${product.productId}`} className="product-link">
                <h2 className="fs-6 mb-1">{product.productName}</h2>
              </Link>
              <p className="fs-6 mb-1" style={{ fontWeight: 'lighter', marginBottom: '0' }}>
                {product.special ? (
                  <>
                    <p className="card-text"><s>${product.price}</s> ${product.specialPrice}</p>
                  </>
                ) : (
                  <p className="card-text">${product.price}</p>
                )}
              </p>
              {getProductQuantity(product.productId) === 0 ? (
                <button
                  className="btn custom-button mt-1"
                  onClick={() => addToCart(product.productId, 1)}
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
                  <span className='mx-2 mt-1'>{getProductQuantity(product.productId)}</span>
                  <button
                    className="btn custom-button mt-1"
                    onClick={() => increaseQuantity(product.productId)}
                  >
                    +
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p>No products available.</p>}
    </div>
  );
};

export default Products;

