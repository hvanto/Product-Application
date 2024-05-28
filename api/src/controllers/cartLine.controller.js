const db = require("../database");

exports.addProductToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    try {
      const cartLine = await db.cartLine.create({ cartId, productId, quantity });
      res.status(201).json(cartLine);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.removeProductFromCart = async (req, res) => {
    const { id } = req.params;
    try {
      const cartLine = await db.cartLine.findOne({ where: { id } });
      if (cartLine) {
        await cartLine.destroy();
        res.status(200).json({ message: 'Product removed from cart' });
      } else {
        res.status(404).json({ message: 'CartLine not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateProductQuantityInCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
      const cartLine = await db.cartLine.findOne({ where: { id } });
      if (cartLine) {
        cartLine.quantity = quantity;
        await cartLine.save();
        res.status(200).json(cartLine);
      } else {
        res.status(404).json({ message: 'CartLine not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };