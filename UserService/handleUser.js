const bcrypt = require('bcrypt');
const { User } = require('./models');

// Add a new user
const addUser = async (req, res) => {
  try {
    const { FirstName, LastName, UserPassWord, Email, Rights } = req.body;

    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(UserPassWord, saltRounds);
    const hashedPasswordStudent = await bcrypt.hash('salasana', saltRounds);

    const user = await User.create({
      FirstName: FirstName,
      LastName: LastName,
      UserPassWord: Rights === 1 ? hashedPasswordStudent : hashedPassword, // Store the hashed password
      Email: Email,
      Rights: Rights
    });
    
    res.status(201).json({userID: user.UserID});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user', message: error.message });
  }
};

// Update an existing user
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, UserPassWord, Email, Rights } = req.body;

    // Check if the user has "Rights" equal to 1
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If "Rights" is equal to 1, don't change the password, otherwise hash the new password if provided
    let hashedPassword;
    if (Rights === 1) {
      hashedPassword = user.UserPassWord; // Keep the existing hashed password
    } else if (UserPassWord) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(UserPassWord, saltRounds);
    }

    await User.update(
      {
        FirstName: FirstName,
        LastName: LastName,
        UserPassWord: hashedPassword || user.UserPassWord, // Store the hashed password if provided, otherwise use the original password
        Email: Email,
        Rights: Rights
      },
      { where: { UserID: id } }
    );

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit user' });
  }
};


// Delete a user
const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { UserID: id } });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove user' });
  }
};

// Get all users or single user
const getUsers = async (req, res) => {
  try {
    const userID = req.query.userID;

    if (userID) {
      const user = await User.findByPk(userID);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    }

    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};



module.exports = { addUser, editUser, removeUser, getUsers };
