window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

  import ReviewList from "./ReviewList";
  import { getReviews } from "../data/repository";
  import { render, screen } from "@testing-library/react";
  
  let reviews;
let container;

beforeAll(() => {
  reviews = getReviews();
});

beforeEach(() => {
  const utils = render(<ReviewList reviews={reviews} areReviewsVisible={true} />);
  container = utils.container;
});

test("Render reviews", () => {
  expect(container).toBeInTheDocument();
});

//Substanital Testing for Reviews
//We're testing that all review details are correctly displayed on the webpage, as all details are pulled from the mock data but the same data is used in the real environment.
//This includes ensuring that the reviewer's name, content of the review and rating are all displayed correctly. 

test("Render review content", () => {
  expect(screen.getByText(reviews[0].content)).toBeInTheDocument();
});

// Test rendering the username of the review
test("Render review username", () => {
  expect(screen.getByText(reviews[0].user.username)).toBeInTheDocument();
});

// Test rendering review rating
test("Render review rating", () => {
  const starCount = reviews[0].rating;
  const filledStars = screen.getAllByText("★");
  expect(filledStars.length).toBe(starCount);
});

//Ensure if a specified product has 0 reviews, it will not display reviews and correct message will be shown to the user. 
// Test rendering a message when no reviews are present
test("Render no reviews message", () => {
  const emptyReviews = [];
  render(<ReviewList reviews={emptyReviews} areReviewsVisible={true} />);
  expect(screen.getByText("No reviews yet.")).toBeInTheDocument();
});
