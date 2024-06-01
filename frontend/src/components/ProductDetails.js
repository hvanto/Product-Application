import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div className="col-md-8">
      <div className="card-img-container">
        <img
          src={`/${product.imgUrl}`}
          alt={product.productName}
          className="card-img"
        />
      </div>
      <div className="text-center mb-4">
        <h1 className="mb-2 fs-4">{product.productName}</h1>
      </div>
      <p>{product.productDescription}</p>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetails;
