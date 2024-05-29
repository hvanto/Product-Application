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

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findOne({
    where: { email: req.query.email }
  });

  if (user === null) {
    res.status(401).send("Invalid email or password");
    return;
  }

  const valid = await argon2.verify(user.password_hash, req.query.password);

  if (valid) {
    res.json(user);
  } else {
    res.status(401).send("Invalid email or password");
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash
  });

  res.json(user);
};

