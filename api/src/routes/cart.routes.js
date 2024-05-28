module.exports = (express, app) => {
    const cartController = require("../controllers/cart.controller.js");
    const router = express.Router();

    router.get('/:userId', cartController.getCart);
    router.post('/add', cartController.addToCart);
    router.put('/update', cartController.updateCartItem);
    router.delete('/remove/:cartLineId', cartController.removeFromCart);
    router.post('/create', cartController.createCart);
  
    app.use("/api/cart", router);
  };
  