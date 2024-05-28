const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
  try {
    if (req.query.special === 'true') {
      // Fetch special products only
      const products = await db.product.findAll({ where: { special: true } });
      return res.json(products);
    } else {
      // otherwise, fetch all products
      const products = await db.product.findAll();
      return res.json(products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Select one product from the database.
exports.one = async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await db.product.findByPk(productId);
      
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(product);
  } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Create a product in the database.
exports.create = async (req, res) => {
  try {
    // Validate input data
    if (!req.body.productName || !req.body.productDescription || !req.body.price || !req.body.imgUrl) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create the product
    const product = await db.product.create({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      price: req.body.price,
      imgUrl: req.body.imgUrl,
      special: req.body.special,
      specialPrice: req.body.specialPrice, 
    });

    // Respond with the created product
    res.status(201).json(product);
  } catch (error) {
    // Handle errors
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}