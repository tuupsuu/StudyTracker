require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./models');
const secretKey = process.env.SECRET_KEY;
const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp
const expirationTime = currentTime + 3600; // Add 3600 seconds (1 hour)
const payload = {
  exp: expirationTime,
  // Other custom claims or rules can be added here
};



// Verify password
const verifyPassword = async (req, res) => {
  try {
    const { userID, password } = req.body;

    // Retrieve the user from the database
    const user = await User.findOne({ where: { UserID: userID } });

    if (!user) {
      // User not found
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.UserPassWord);

    if (passwordMatch) {
      // Passwords match

      // Generate a JWT token
      const token = jwt.sign({ userID: user.UserID, rights: user.Rights, exp: expirationTime }, secretKey);

      res.status(200).json({ message: 'Password matched', rights: user.Rights, token: token, id: user.UserID });
    } else {
      // Passwords do not match
      res.status(401).json({ error: 'Invalid password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify password', message: error.message });
  }
};

module.exports = { verifyPassword };
