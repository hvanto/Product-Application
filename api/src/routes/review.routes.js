module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all reviews.
  router.get("/", controller.all);

  // Create a new review.
  router.post("/", controller.create);

  // Select all reviews for a specific product.
  router.get("/:productId", controller.allForProduct);

  // Add routes to server.
  app.use("/api/review", router);
};
