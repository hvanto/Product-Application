const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  res.json(user);
};

// Checks if the user exists and the password is correct.
exports.login = async (req, res) => {
  const user = await db.user.findOne({
    where: {
      email: req.body.email,
    },
  });

  console.log("login user controller" + user);

  if (user === null) {
    res.status(404).send("User not found.");
    return;
  }

  const valid = await argon2.verify(user.password_hash, req.body.password);

  if (!valid) {
    res.status(401).send("Invalid password.");
    return;
  }

  res.json(user);
};

exports.update = async (req, res) => {
  try {
    console.log("update user controller", req.body);
    // Find the user to update.
    const user = await db.user.findByPk(req.params.id);

    // Update the user.
    user.username = req.body.username;
    user.email = req.body.email;
    user.password_hash = req.body.password_hash;

    // Save the updated user.
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Error updating user");
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
  });

  res.json(user);
};

// Delete a user from the database.
exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  await user.destroy();

  res.json(user);
};

