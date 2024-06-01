import React, { useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";

const ReviewForm = ({
  isReviewFormVisible,
  user,
  rating,
  reviewContent,
  remainingChars,
  handleReviewContentChange,
  onStarClick,
  handleReviewSubmit,
  handleCancelReview,
  isEditMode,
  reviewId,
}) => {
  useEffect(() => {
    if (!isReviewFormVisible) return;
    // You can add any setup or cleanup code here if needed for the review form
  }, [isReviewFormVisible]);

  return (
    isReviewFormVisible && (
      <form onSubmit={(e) => handleReviewSubmit(e, reviewId)}>
        <div className="mb-1">
          {/* <label htmlFor="reviewContent" className="form-label">
            Review:
          </label> */}
          <div>
          <StarRatingComponent
            name="rating"
            starCount={5}
            value={rating}
            onStarClick={onStarClick}
            renderStarIcon={() => <span style={{ fontSize: '20px' }}>★</span>}
          />
        </div>
          <textarea
            id="reviewContent"
            className="form-control"
            value={reviewContent}
            onChange={handleReviewContentChange}
            maxLength="100"
          />
          <div>
            <small>{remainingChars} characters remaining</small>
          </div>
        </div>
        <button type="submit" className="btn custom-button">
          {isEditMode ? "Update Review" : "Submit Review"}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={handleCancelReview}
        >
          Cancel
        </button>
      </form>
    )
  );
};

export default ReviewForm;
