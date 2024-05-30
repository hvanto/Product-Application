module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all reviews.
  router.get("/", controller.all);

  // Create a new review.
  router.post("/", controller.create);

  // Select all reviews for a specific product.
  router.get("/product/:productId", controller.allForProduct);

  // Delete a specific review.
  router.delete("/:reviewId", controller.delete);

  // Add routes to server.
  app.use("/api/review", router);
};
