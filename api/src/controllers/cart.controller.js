const db = require("../database");

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Check if a cart already exists for the user
    let cart = await db.cart.findOne({ where: { userId } });
    if (cart) {
      return res.status(400).json({ error: "Cart already exists for this user" });
    }

    // Create a new cart for the user
    cart = await db.cart.create({ userId });

    res.status(201).json(cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Get all cart items for a specific cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Try to find a cart for the user
    let cart = await db.cart.findOne({
      where: { userId },
      include: {
        model: db.cartLine,
        include: {
          model: db.product
        }
      }
    });

    // If no cart is found, create a new one
    if (!cart) {
      cart = await db.cart.create({ userId });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Add a product to the cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.body.userId; 
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    // Find or create a cart for the user
    let cart = await db.cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await db.cart.create({ userId });
    }

    // Find or create a cart line for the product in the user's cart
    let cartLine = await db.cartLine.findOne({ where: { cartId: cart.cartId, productId } });
    if (cartLine) {
      // Update the quantity if the product is already in the cart
      cartLine.quantity += quantity;
      await cartLine.save();
    } else {
      // Create a new cart line if the product is not in the cart
      cartLine = await db.cartLine.create({ cartId: cart.cartId, productId, quantity });
    }

    res.status(200).json(cartLine);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

// Update the quantity of a product in the cart
exports.updateCartItem = async (req, res) => {
  try {
    const { cartLineId, quantity } = req.body;

    // Find the cart line item
    const cartLine = await db.cartLine.findByPk(cartLineId);
    if (!cartLine) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update the quantity
    cartLine.quantity = quantity;
    await cartLine.save();

    res.json(cartLine);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { cartLineId } = req.params;

    // Find the cart line item
    const cartLine = await db.cartLine.findByPk(cartLineId);
    if (!cartLine) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Delete the cart line item
    await cartLine.destroy();

    res.json({ message: 'Cart item removed' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
