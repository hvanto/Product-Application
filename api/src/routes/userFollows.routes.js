module.exports = (express, app) => {
    const controller = require("../controllers/userFollows.controller.js");
    const router = express.Router();
  
    // Follow a user.
    router.post("/follow", controller.follow);

    // Unfollow a user.
    router.delete("/unfollow", controller.unfollow);

    // Add routes to server.
    app.use("/api/userFollows", router);
  };