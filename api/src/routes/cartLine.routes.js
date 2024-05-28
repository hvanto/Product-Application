module.exports = (express, app) => {
    const cartLineController = require("../controllers/cartLine.controller.js");
    const router = express.Router();


    router.post('/cartLine', cartLineController.addProductToCart);
    router.get('/cartLine/:id', cartLineController.getCartLineById);
    router.delete('/cartLine/:id', cartLineController.removeProductFromCart);
    router.put('/cartLine/:id', cartLineController.updateProductQuantityInCart);

    app.use("/api/cartLine", router);

};