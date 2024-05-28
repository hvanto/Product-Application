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

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if(user === null || await argon2.verify(user.password_hash, req.query.password) === false)
    // Login failed.
    res.json(null);
  else
    res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    // Validate input data
    if (!req.body.username || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Hash the password
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

        // Log the length of the hash
        console.log('Hash length:', hash.length);

    // Create the user
    const user = await db.user.create({
      username: req.body.username,
      email: req.body.email,
      password_hash: hash
    });

    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    // Handle errors
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};

