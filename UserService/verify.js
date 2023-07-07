const bcrypt = require('bcrypt');
const { User } = require('./models');

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
      res.status(200).json({ message: 'Password matched', rights: user.Rights });
    } else {
      // Passwords do not match
      res.status(401).json({ error: 'Invalid password'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to verify password', message: error.message });
  }
};

module.exports = { verifyPassword };
