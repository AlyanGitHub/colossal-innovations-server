const User = require('../../db/model/user');
const bcrypt = require('bcrypt');

async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter username and password',
    });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'User does not exist',
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'You have entered wrong password',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
      message: 'Successfully logged in',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to login!',
    });
  }
}

module.exports = login;
