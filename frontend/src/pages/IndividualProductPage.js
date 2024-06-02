// Import necessary modules and components
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

// IndividualProduct component definition
const IndividualProduct = () => {
  // State variables
  const { productId } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = useState(null); // State for product data
  const [reviewContent, setReviewContent] = useState(""); // State for review content
  const [message, setMessage] = useState(""); // State for messages
  const [rating, setRating] = useState(0); // State for rating
  const [remainingChars, setRemainingChars] = useState(100); // State for remaining characters in review
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false); // State for review form visibility
  const [reviews, setReviews] = useState([]); // State for product reviews
  const [areReviewsVisible, setAreReviewsVisible] = useState(false); // State for reviews visibility
  const { user } = useContext(UserContext); // User context
  const isLoggedIn = Boolean(user); // Check if user is logged in
  const [hasUserReviewed, setHasUserReviewed] = useState(false); // State for user review status
  const [refreshReviews, setRefreshReviews] = useState(false); // State to trigger review refresh
  const [editingReview, setEditingReview] = useState(null); // State for editing review
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const [initialReviewContent, setInitialReviewContent] = useState(""); // State for initial review content

  // Cart context
  const { cart, addToCart, decreaseQuantity, increaseQuantity } =
    useContext(CartContext);

  // Function to get product quantity from cart
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

  // Function to handle edit button click
  const handleEditButtonClick = (review) => {
    setEditingReview(review);
    setReviewContent(review.content);
    setRating(review.rating);
    setIsReviewFormVisible(true);
    setInitialReviewContent(review.content);
  };

  // Function to handle cancel review
  const handleCancelReview = () => {
    setIsReviewFormVisible(false);
    setRating(0);
    setReviewContent("");
    setRemainingChars(100);
    setEditingReview(null);
  };

  // Function to handle review content change
  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
    setRemainingChars(100 - e.target.value.length);
  };

  // Function to toggle reviews visibility
  const toggleReviewsVisibility = () => {
    setAreReviewsVisible(!areReviewsVisible);
  };

  // Function to toggle review form visibility
  const toggleReviewFormVisibility = () => {
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/product/select/${productId}`
        );
        setProduct(response.data); // Set product data from response
      } catch (error) {
        console.error("Error fetching product:", error); // Log error if fetching product fails
      }
    };
    fetchProduct(); // Call fetchProduct function
  }, [productId]); // Execute effect when productId changes

  // Fetch reviews data
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/review/product/${productId}`
      );
      setReviews(response.data); // Set reviews data from response

      if (user) {
        const userReview = response.data.find(
          (review) => review.userId === user.userId
        );
        setHasUserReviewed(Boolean(userReview)); // Set user review status
      }

      setRefreshReviews(false);
    };

    fetchReviews(); // Call fetchReviews function
  }, [productId, user, refreshReviews]); // Execute effect when productId, user, or refreshReviews changes

  // Function to handle review submission
  const handleReviewSubmit = async (e, reviewId) => {
    e.preventDefault();

    if (!user) {
      console.log("You must be logged in to leave a review");
      return;
    }

    // Check if reviewContent is empty
    if (!reviewContent.trim()) {
      setErrorMessage("Review can't be empty.");
      return;
    }

    // Check if reviewContent is the same as the initial review content
    if (editingReview && reviewContent === initialReviewContent) {
      setErrorMessage("No changes were made to the review");
      //Timeout error message after 2 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
      return;
    }
    try {
      if (editingReview) {
        const response = await axios.put(
          `http://localhost:4000/api/review/${reviewId}`,
          {
            content: reviewContent,
            rating,
          }
        );

        if (response.status === 200) {
          setReviews((prevReviews) =>
            prevReviews.map((review) =>
              review.reviewId === editingReview.reviewId
                ? { ...review, content: reviewContent, rating }
                : review
            )
          );
          setEditingReview(null);
          setSuccessMessage("Review successfully updated.");
          // Clear the success message after 2 seconds
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
        } else {
          console.error("Error updating review:", response);
        }
      } else {
        const response = await axios.post("http://localhost:4000/api/review", {
          productId,
          userId: user.userId,
          content: reviewContent,
          rating,
          reviewerName: user.username,
        });
        if (response.status === 200) {
          const newReview = {
            productId,
            userId: user.userId,
            content: reviewContent,
            rating,
            reviewerName: user.username,
          };
          setReviews((prevReviews) => [...prevReviews, newReview]);
          setHasUserReviewed(true);
        } else {
          console.error("Error saving review:", response);
        }
      }
      //Clear review form and errors
      setErrorMessage("");
      setRating(0);
      setReviewContent("");
      setRemainingChars(100);
      setIsReviewFormVisible(false);
      setRefreshReviews(true);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };


  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/review/${reviewId}`
        );

        if (response.status === 200) {
          setReviews(reviews.filter((review) => review.reviewId !== reviewId));
          setHasUserReviewed(false);
        } else {
          console.error("Error deleting review:", response);
        }
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card custom-form">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="card-img-container">
                    <img
                      src={`/${product.imgUrl}`}
                      alt={product.productName}
                      className="card-img"
                    />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="text-center mb-4">
                    <h1 className="mb-2 fs-4">{product.productName}</h1>
                  </div>
                  <p>{product.productDescription}</p>
                  <p>Price: ${product.price}</p>
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
                  <div
                    dangerouslySetInnerHTML={{
                      __html: message,
                    }}
                  />
                  <div>
                    {!isReviewFormVisible ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (isLoggedIn) {
                            if (hasUserReviewed) {
                              setMessage(
                                "You have already left a review on this product."
                              );
                            } else {
                              setIsReviewFormVisible(true);
                            }
                          } else {
                            setMessage(
                              "You must be logged in to leave a review. <a href='/login'>Login</a>"
                            );
                          }
                        }}
                      >
                        Leave a review
                      </a>
                    ) : (
                      "Leave a review"
                    )}
                  </div>
                  {errorMessage && (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                  {successMessage && (
                    <div style={{ color: "green" }}>{successMessage}</div>
                  )}
                  <ReviewForm
                    isReviewFormVisible={isReviewFormVisible}
                    user={user}
                    rating={rating}
                    reviewContent={reviewContent}
                    remainingChars={remainingChars}
                    handleReviewContentChange={handleReviewContentChange}
                    onStarClick={onStarClick}
                    handleReviewSubmit={handleReviewSubmit}
                    handleCancelReview={handleCancelReview}
                    isEditMode={!!editingReview}
                    reviewId={editingReview ? editingReview.reviewId : null}
                  />
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
                  <ReviewList
                    reviews={reviews}
                    handleEditButtonClick={handleEditButtonClick}
                    user={user}
                    areReviewsVisible={areReviewsVisible}
                    handleDeleteReview={handleDeleteReview}
                    setEditingReview={setEditingReview}
                  />
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
