import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { UserContext } from '../context/UserContext';


const IndividualProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [remainingChars, setRemainingChars] = useState(100);
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [areReviewsVisible, setAreReviewsVisible] = useState(false);
  const { user, loginUser } = useContext(UserContext);

    const handleCancelReview = () => {
      setIsReviewFormVisible(false);
      setRating(0);
      setReviewContent('');
      setRemainingChars(100);
    };

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
        const response = await axios.get(`http://localhost:4000/api/product/select/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`http://localhost:4000/api/review/${productId}`);
      setReviews(response.data);
    };
  
    fetchReviews();
  }, [productId]);

  // Function to handle form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // If the user is not logged in, show a message or redirect to the login page
      console.log('You must be logged in to leave a review');
      return;
    }

    console.log('Submitting review:', reviewContent, rating, productId, user.userId, user.username);

    try {
      const response = await axios.post('http://localhost:4000/api/review', {
        productId,
        userId: user.userId,
        content: reviewContent,
        rating,
        reviewerName: user.username 
      });

    if (response.status === 200) {
      // If the review was successfully saved, add it to the reviews state
      setReviews(prevReviews => [...prevReviews, response.data]);
      // Clear the review form
      setRating(0);
      setReviewContent('');
      setRemainingChars(100);
      setIsReviewFormVisible(false);
    } else {
      console.error('Error saving review:', response);
    }
  } catch (error) {
    console.error('Error saving review:', error);
  }
};

  const navigate = useNavigate();  
  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    //navigate('/login');
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
                  <img src={`/${product.imgUrl}`} alt={product.productName} className="card-img" />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="text-center mb-4">
                    <h1 className="mb-2 fs-4">{product.productName}</h1>
                  </div>
                  <p>{product.productDescription}</p>
                  <p>Price: ${product.price}</p>
                  <button className="btn custom-button mt-3">
                    Add to Cart
                  </button>
                  {!isReviewFormVisible && (
                      <div>
                        <a href="#" onClick={toggleReviewFormVisibility}>
                          Leave a review
                        </a>
                      </div>
                    )}
                  <div>
                    <a href="#" onClick={toggleReviewsVisibility}>
                      {areReviewsVisible ? 'Hide reviews' : 'See reviews'}
                    </a>
                  </div>
                  {isLoggedIn ? (
                  isReviewFormVisible && (
                    <form onSubmit={handleReviewSubmit} className="mt-2">
                      <h3 className="mb-2">Write a Review</h3>
                      <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="rating" style={{ marginRight: '5px' }}>Rating:</label>
                        <StarRatingComponent 
                          name="rating" 
                          starCount={5}
                          value={rating}
                          onStarClick={onStarClick}
                          renderStarIcon={() => <span style={{ fontSize: '20px' }}>★</span>}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="reviewContent" className="mb-1">Your Review:</label>
                        <textarea
                          id="reviewContent"
                          className="form-control"
                          value={reviewContent}
                          onChange={handleReviewContentChange}
                          maxLength={100}
                          onClick={() => setRemainingChars(100 - reviewContent.length)}
                        ></textarea>
                        <div style={{ height: '1.5em' }}>
                          {remainingChars < 100 && (
                            <small className="form-text text-muted">
                              {remainingChars} characters remaining
                            </small>
                          )}
                        </div>
                      </div>
                      <button type="submit" className="btn custom-button mt-2" style={{ marginRight: '10px' }}>
                        Submit Review
                      </button>
                      <button type="button" className="btn custom-button mt-2" onClick={handleCancelReview}>
                        Cancel Review
                      </button>
                    </form>
                  )
                ) : (
                  isReviewFormVisible && (
                    <div className="mt-2">
                      <p>You must be logged in to leave a review.</p>
                      <button className="btn btn-primary" onClick={handleLogin}>
                        Log In
                      </button>
                    </div>
                  )
                )}
                {areReviewsVisible && reviews.length === 0 ? (
                  <p>No reviews yet. Be the first to write a review!</p>
                ) : (
                  areReviewsVisible && reviews.map((review, index) => (
                    <div key={index} className="mb-3">
                      <div>Rating: {review.rating} / 5</div>
                      <div>{review.content}</div>
                      <div>Reviewed by: {review.user.username}</div>
                    </div>
                  ))
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
