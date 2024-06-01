import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewList = ({
  reviews,
  handleEditButtonClick,
  user,
  areReviewsVisible,
  handleDeleteReview,
}) => {
  const [followedUsers, setFollowedUsers] = useState([]);

  const handleFollow = async (followUserId) => {
    if (followedUsers.includes(followUserId)) {
      // Unfollow user
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/userFollows/unfollow?userId=${user.userId}&followUserId=${followUserId}`
        );
        if (response.status === 200) {
          setFollowedUsers(followedUsers.filter((id) => id !== followUserId));
        } else {
          console.error("Error unfollowing user:", response);
        }
      } catch (error) {
        console.error("Error unfollowing user:", error);
      }
    } else {
      try {
        console.log("followUserId", followUserId);
        console.log("user", user);
        const response = await axios.post(
          "http://localhost:4000/api/userFollows/follow",
          {
            userId: user.userId,
            followUserId,
          }
        );
        if (response.status === 201) {
          setFollowedUsers([...followedUsers, followUserId]);
        } else {
          console.error("Error following user:", response);
        }
      } catch (error) {
        console.error("Error following user:", error);
      }
    }
  };

  useEffect(() => {
    const fetchFollows = async () => {
      if (!user) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:4000/api/userFollows/following?userId=${user.userId}`
        );
        if (response.status === 200) {
          setFollowedUsers(response.data.map((follow) => follow.followUserId));
        } else {
          console.error("Error fetching followed users:", response);
        }
      } catch (error) {
        console.error("Error fetching followed users:", error);
      }
    };

    if (user) {
      fetchFollows();
    }
  }, [user]);

  if (!areReviewsVisible) return null;

  return (
    <div className="mt-2">
      <h4>Reviews</h4>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="list-group">
          {reviews.map((review) => (
            <li key={review.reviewId} className="list-group-item">
              <div>
                <strong>{review.user.username}</strong>
                <div>
                  {Array(review.rating)
                    .fill()
                    .map((_, index) => (
                      <span key={index}>&#9733;</span>
                    ))}
                  {Array(5 - review.rating)
                    .fill()
                    .map((_, index) => (
                      <span key={index}>&#9734;</span>
                    ))}
                </div>
                <p style={{ marginBottom: "2px" }}>{review.content}</p>
                {user && user.userId === review.userId && (
                  <div>
                    <button
                      onClick={() => handleEditButtonClick(review)}
                      className="btn custom-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.reviewId)}
                      className="btn btn-danger ms-2"
                    >
                      Delete
                    </button>
                  </div>
                )}
                {user && user.userId !== review.userId && (
                  <button
                    onClick={() => handleFollow(review.userId)}
                    className="btn btn-primary ms-2"
                  >
                    {followedUsers.includes(review.userId)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
