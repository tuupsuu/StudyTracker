const { User } = require('./models');

// Add a new user
const addUser = async (req, res) => {
  try {
    const { FirstName, LastName, UserPassWord, Email, Rights } = req.body;
    const user = await User.create({
      FirstName: FirstName,
      LastName: LastName,
      UserPassWord: UserPassWord,
      Email: Email,
      Rights: Rights
    });
    res.status(201).json(user);
    }catch (error) {
      console.error(error); // Log the error to the console for debugging purposes
      res.status(500).json({ error: 'Failed to add user', message: error.message });
    }
    
};

// Update an existing user
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { FirstName, LastName, UserPassWord, Email, Rights } = req.body;
    await User.update(
      {
        FirstName: FirstName,
        LastName: LastName,
        UserPassWord: UserPassWord,
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

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    // console.log(users); // Add this line to log the retrieved users
    res.status(200).json(users);
  } catch (error) {
    console.log(error); // Add this line to log any errors
    res.status(500).json({ error: 'Failed to get users' });
  }
};

module.exports = { addUser, editUser, removeUser, getUsers };
