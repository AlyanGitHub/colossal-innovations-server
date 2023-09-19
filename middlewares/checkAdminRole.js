const User = require('../db/model/user');

async function checkAdminRole(req, res, next) {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter userID',
    });
  }

  try {
    // Find the user by username
    const user = await User.findById(userID);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'User does not exist',
      });
    }

    if (user.role === 'user') {
      return res.status(403).json({
        success: false,
        data: {},
        message: `User ${user.username} does not have admin privileges`,
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        data: {},
        message: `User ${user.username} does not have admin privileges`,
      });
    }

    if (user.role === 'admin') {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'There was an issue with permissions',
    });
  }
}

module.exports = checkAdminRole;
