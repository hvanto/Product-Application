const db = require("../database");

// Follow a user.
exports.follow = async (req, res) => {
  const { userId, followUserId } = req.body;
  
  if (!userId || !followUserId) {
    return res.status(400).json({ error: "Missing userId or followUserId" });
  }

  try {
    const follow = await db.userFollows.create({ userId, followUserId });
    res.status(201).json(follow);
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: "Error following user" });
  }
};

// Unfollow a user.
exports.unfollow = async (req, res) => {
    const { userId, followUserId } = req.query;
    
    if (!userId || !followUserId) {
      return res.status(400).json({ error: "Missing userId or followUserId" });
    }
  
    try {
      const follow = await db.userFollows.findOne({ where: { userId, followUserId } });
      if (!follow) {
        return res.status(404).json({ error: "User not followed" });
      }
      await follow.destroy();
      res.json(follow);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      res.status(500).json({ error: "Error unfollowing user" });
    }
  };