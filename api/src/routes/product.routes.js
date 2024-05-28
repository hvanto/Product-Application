module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();

    // Select all products.
    router.get("/", controller.all);

    // Select a single product with id.
    router.get("/select/:id", controller.one);

    app.use("/api/product", router);

};