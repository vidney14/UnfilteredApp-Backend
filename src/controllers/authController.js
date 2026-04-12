const authManager = require('../managers/authManager');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Provide basic validation here
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide email, password, and name' });
    }

    // Call the manager layer
    const authData = await authManager.registerUser(email, password, name);
    res.status(201).json(authData);
  } catch (err) {
    if (err.message === 'User already exists') {
      return res.status(400).json({ error: err.message });
    }
    console.error('Registration Error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Call the manager layer
    const authData = await authManager.loginUser(email, password);
    res.status(200).json(authData);
  } catch (err) {
    if (err.message === 'Invalid Credentials') {
      return res.status(400).json({ error: err.message });
    }
    console.error('Login Error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    // Call the manager layer
    const user = await authManager.getUserById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(404).json({ error: err.message });
    }
    console.error('GetMe Error:', err.message);
    res.status(500).send('Server error');
  }
};
