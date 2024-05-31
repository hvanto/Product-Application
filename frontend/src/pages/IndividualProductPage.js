import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import StarRatingComponent from "react-star-rating-component";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

const IndividualProduct = () => {
  // All of the state variables
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [remainingChars, setRemainingChars] = useState(100);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [areReviewsVisible, setAreReviewsVisible] = useState(false);
  const { user, loginUser } = useContext(UserContext);
  const isLoggedIn = Boolean(user);
  const [hasUserReviewed, setHasUserReviewed] = useState(false);
  const { cart, addToCart, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);

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

  const handleCancelReview = () => {
    setIsReviewFormVisible(false);
    setRating(0);
    setReviewContent("");
    setRemainingChars(100);
  };

  // Function to handle review content change
  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
    setRemainingChars(100 - e.target.value.length);
  };

  const toggleReviewsVisibility = () => {
    setAreReviewsVisible(!areReviewsVisible);
  };

  const toggleReviewFormVisibility = () => {
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/select/${productId}`
        );
        setProduct(response.data);
        // Catch for error in fetching product
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  // Fetch the reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/review/product/${productId}`
      );
      setReviews(response.data);

      // Check if the user has already left a review
      if (user) {
        const userReview = response.data.find(
          (review) => review.userId === user.userId
        );
        setHasUserReviewed(Boolean(userReview));
      }
    };

    fetchReviews();
  }, [productId, user]);

  // Function to handle form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // If the user is not logged in, show a message or redirect to the login page
      console.log("You must be logged in to leave a review");
      return;
    }

    console.log(
      "Submitting review:",
      reviewContent,
      rating,
      productId,
      user.userId,
      user.username
    );

    try {
      const response = await axios.post("http://localhost:4000/api/review", {
        productId,
        userId: user.userId,
        content: reviewContent,
        rating,
        reviewerName: user.name,
      });

      if (response.status === 200) {
        // If the review was successfully saved, add it to the reviews state
        setReviews((prevReviews) => [...prevReviews, response.data]);
        // Clear the review form
        setRating(0);
        setReviewContent("");
        setRemainingChars(100);
        setIsReviewFormVisible(false);
        setHasUserReviewed(true);
      } else {
        console.error("Error saving review:", response);
      }
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/review/${reviewId}`
      );

      if (response.status === 200) {
        setReviews(reviews.filter((review) => review.id !== reviewId));
        setHasUserReviewed(false);
      } else {
        console.error("Error deleting review:", response);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const navigate = useNavigate();
  // Function to handle login
  const handleLogin = () => {
    //loginUser();
    navigate("/login");
  };

  // Loading message for product
  if (!product) {
    return <div>Loading...</div>;
  }

  // Function to handle star rating
  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };

  const handleFollow = async (userIdToFollow) => {};

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card custom-form">
            <div className="card-body">
              <div className="row">
                {/* Product image */}
                <div className="col-md-4">
                  <div className="card-img-container">
                    <img
                      src={`/${product.imgUrl}`}
                      alt={product.productName}
                      className="card-img"
                    />
                  </div>
                </div>

                {/* Product details */}
                <div className="col-md-8">
                  {/* Product name */}
                  <div className="text-center mb-4">
                    <h1 className="mb-2 fs-4">{product.productName}</h1>
                  </div>

                  {/* Product description */}
                  <p>{product.productDescription}</p>

                  {/* Product price */}
                  <p>Price: ${product.price}</p>
                  {/* Add to cart buttons */}
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
                  {!isReviewFormVisible && !hasUserReviewed && (
                    <div>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsReviewFormVisible(true);
                        }}
                      >
                        Leave a review
                      </a>
                    </div>
                  )}
                  <div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleReviewsVisibility();
                      }}
                    >
                      {areReviewsVisible ? "Hide reviews" : "See reviews"}
                    </a>
                  </div>
                  {isLoggedIn ? (
                    !hasUserReviewed ? (
                      isReviewFormVisible && (
                        <form onSubmit={handleReviewSubmit} className="mt-2">
                          <h3 className="mb-2">Write a Review</h3>
                          <div
                            className="form-group"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <label
                              htmlFor="rating"
                              style={{ marginRight: "5px" }}
                            >
                              Rating:
                            </label>
                            <StarRatingComponent
                              name="rating"
                              starCount={5}
                              value={rating}
                              onStarClick={onStarClick}
                              renderStarIcon={() => (
                                <span style={{ fontSize: "20px" }}>★</span>
                              )}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="reviewContent" className="mb-1">
                              Your Review:
                            </label>
                            <textarea
                              id="reviewContent"
                              className="form-control"
                              value={reviewContent}
                              onChange={handleReviewContentChange}
                              maxLength={100}
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn custom-button mt-2"
                            style={{ marginRight: "10px" }}
                          >
                            Submit Review
                          </button>
                          <button
                            type="button"
                            className="btn custom-button mt-2"
                            onClick={handleCancelReview}
                          >
                            Cancel Review
                          </button>
                        </form>
                      )
                    ) : (
                      <div>
                        <p>You have already reviewed this product.</p>
                        {reviews.map((review, index) => {
                          if (
                            review.user &&
                            review.user.username === user.username
                          ) {
                            return (
                              <div key={index} className="mb-3">
                                <div>Rating: {review.rating} / 5</div>
                                <div>{review.content}</div>
                                <div>Reviewed by: {review.user.username}</div>
                                {user && user.userId === review.userId && (
                                  <button
                                    onClick={() =>
                                      handleDeleteReview(review.reviewId)
                                    }
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )
                  ) : (
                    isReviewFormVisible && (
                      <div className="mt-2">
                        <p>You must be logged in to leave a review.</p>
                        <Link to="/login" className="btn custom-button">
                          Log In
                        </Link>
                      </div>
                    )
                  )}
                  {areReviewsVisible && reviews.length === 0 ? (
                    <p>
                      No reviews yet. Be the first to{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsReviewFormVisible(true);
                        }}
                      >
                        write a review!
                      </a>
                    </p>
                  ) : (
                    areReviewsVisible &&
                    reviews.map((review, index) => {
                      if (
                        review.user &&
                        user &&
                        review.user.username === user.username
                      ) {
                        return null;
                      }
                      return (
                        <div key={index} className="mb-3">
                          <div>Rating: {review.rating} / 5</div>
                          <div>{review.content}</div>
                          <div>
                            Reviewed by: {review.user.username}
                            {/* {review.user && (
                              <button
                                className="btn btn-small btn-primary"
                                onClick={() => handleFollow(review.user.userId)}
                              >
                                Follow
                              </button>
                            )} */}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
