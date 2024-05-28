const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
db.cartLine = require("./models/cartLine.js")(db.sequelize, DataTypes);
// db.userFollows = require("./models/userFollows.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);

// Relate tables.
db.user.hasOne(db.cart, { foreignKey: 'userId' });
db.cart.belongsTo(db.user, { foreignKey: 'userId' });

db.cart.hasMany(db.cartLine, { foreignKey: 'cartId' });
db.cartLine.belongsTo(db.cart, { foreignKey: 'cartId' });

db.cartLine.belongsTo(db.product, { foreignKey: 'productId' });
db.product.hasMany(db.cartLine, { foreignKey: 'productId' });

db.user.hasMany(db.review, { foreignKey: 'userId' });
db.review.belongsTo(db.user, { foreignKey: 'userId' });

db.product.hasMany(db.review, { foreignKey: 'productId' });
db.review.belongsTo(db.product, { foreignKey: 'productId' });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // // Sync schema.
  // await db.sequelize.sync();

  //Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  await db.sequelize.sync({ force: true });
  
  await seedData();
};

const products = [
  {
      productName: 'Apples',
      productDescription: 'Fresh organic apples from local farms.',
      price: 2.99,
      imgUrl: 'apple.png'
  },
  {
      productName: 'Spinach',
      productDescription: 'Tender organic spinach leaves, perfect for salads.',
      price: 3.49,
      imgUrl: 'spinach.png',
      special: true,
      specialPrice: 2.99
  },
  {
      productName: 'Freshly Baked Bread',
      productDescription: 'Warm and crusty artisan bread, straight from the oven.',
      price: 4.99,
      imgUrl: 'bread.png'
  },
  {
      productName: 'Handcrafted Soap',
      productDescription: 'Natural and moisturizing soap made with essential oils.',
      price: 6.99,
      imgUrl: 'soap.png'
  },
  {
      productName: 'Tomato Plant',
      productDescription: 'Healthy and robust tomato plant for your garden.',
      price: 8.99,
      imgUrl: 'tomatoes.png',
      special: true,
      specialPrice: 6.99
  },
  {
      productName: 'Free-Range Chicken',
      productDescription: 'Humanely raised and organic free-range chicken.',
      price: 9.99,
      imgUrl: 'hen.png'
  },
  {
      productName: 'Fresh Cookies',
      productDescription: 'Soft and chewy cookies baked with organic ingredients.',
      price: 3.99,
      imgUrl: 'cookies.png',
      special: true,
      specialPrice: 2.99
  },
  {
      productName: 'Herb Garden Kit',
      productDescription: 'Complete kit for growing your own organic herbs at home.',
      price: 12.99,
      imgUrl: 'growing-plant.png'
  },
  {
      productName: 'Grass-Fed Beef',
      productDescription: 'Lean and flavorful grass-fed beef, perfect for grilling.',
      price: 13.99,
      imgUrl: 'beef-steak.png'
  },
  {
      productName: 'Fresh Orange Juice',
      productDescription: 'Pure and refreshing orange juice, squeezed from ripe oranges.',
      price: 5.49,
      imgUrl: 'juice.png',
      special: true,
      specialPrice: 4.99
  },
  {
      productName: 'Flower Bouquet',
      productDescription: 'Beautiful and fragrant bouquet of fresh-cut flowers.',
      price: 8.99,
      imgUrl: 'flower.png'
  },
];

const users = [
  {
    username: 'isaac',
    email: 'isaac@gmail.com',
    password: 'abc123!'
  },
  {
    username: 'henry',
    email: 'henry@gmail.com',
    password: 'def456!'
  }
];




async function seedData() {
  const count = await db.user.count();

  //Only seed data if necessary.
  // if(count > 0)
  //   return;

  const argon2 = require("argon2");

  // Add users
  for (const user of users) {
    let hash = await argon2.hash(user.password, { type: argon2.argon2id });
    await db.user.create({ username: user.username, email: user.email, password_hash: hash});
  }


  // Create carts for each user
  await db.cart.create({ userId: 1 });
  await db.cart.create({ userId: 2 });

  


  //Add products
  for (const product of products) {
    await db.product.create({
      productName: product.productName,
      productDescription: product.productDescription,
      price: product.price,
      imgUrl: product.imgUrl,
      special: product.special,
      specialPrice: product.specialPrice
    });
  }
  //Add reviews
  await db.review.create({
    reviewId: 1,
    userId: 1,
    productId: 1,
    content: "Great apples!",
    rating: 5,
  });

  }

module.exports = db;
