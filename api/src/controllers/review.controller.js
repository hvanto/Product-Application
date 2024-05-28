// const db = require("../database");

// // Select all reviews from the database.
// exports.all = async (req, res) => {
//   const reviews = await db.review.findAll();

//   // Can use eager loading to join tables if needed, for example:
//   // const posts = await db.post.findAll({ include: db.user });

//   // Learn more about eager loading here: https://sequelize.org/master/manual/eager-loading.html

//   res.json(reviews);
// };

// // Create a review in the database.
// exports.create = async (req, res) => {
//   const reviews = await db.review.create({
//     text: req.body.text,
//     username: req.body.username
//   });

//   res.json(reviews);
// };


const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  const reviews = await db.review.findAll({
    include: [
      { model: db.product, attributes: ['productName'] },
      { model: db.user, attributes: ['username'] }
    ]
  });

  res.json(reviews);
};

// Create a review in the database.
exports.create = async (req, res) => {
  const review = await db.review.create({
    rating: req.body.rating,
    content: req.body.content,
    productId: req.body.productId,
    userId: req.body.userId
  });

  res.json(review);
};

// Select all reviews for a specific product from the database.
exports.allForProduct = async (req, res) => {
  const reviews = await db.review.findAll({
    where: { productId: req.params.productId },
    include: [
      { model: db.product, attributes: ['productName'] },
      { model: db.user, attributes: ['username'] }
    ]
  });

  res.json(reviews);
};