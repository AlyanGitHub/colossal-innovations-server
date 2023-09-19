const User = require('../../db/model/user');
const bcrypt = require('bcrypt');

async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter username and password',
    });
  }

  // Check if the username already exists in the database
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Username already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: 'user',
    });

    return res.status(201).json({
      success: true,
      data: newUser,
      message: 'Successfully created user',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Failed to create user!' });
  }
}

module.exports = register;
