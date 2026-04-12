const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // knex instance
require('dotenv').config();

exports.registerUser = async (email, password, name) => {
  // Check if user exists
  const existingUser = await db('users').where({ email }).first();
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Insert user
  const [newUser] = await db('users')
    .insert({ email, password_hash: passwordHash, name })
    .returning(['id', 'email', 'name']);

  return { 
    message: "Registration successful. Please log in.",
    user: newUser 
  };
};

exports.loginUser = async (email, password) => {
  // Check if user exists
  const user = await db('users').where({ email }).first();
  if (!user) {
    throw new Error('Invalid Credentials');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid Credentials');
  }

  // Exclude password_hash to return just the user
  const userData = { id: user.id, email: user.email, name: user.name };
  
  // Create JWT token
  const token = generateToken(userData);

  return { token, user: userData };
};

exports.getUserById = async (id) => {
  const user = await db('users')
    .where({ id })
    .select('id', 'email', 'name', 'created_at')
    .first();

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

// Helper function
function generateToken(user) {
  const payload = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}
