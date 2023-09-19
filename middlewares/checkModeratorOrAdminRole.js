const User = require('../db/model/user');

async function checkModeratorOrAdminRole(req, res, next) {
  const { userID } = req.body;

  if (!userID) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter userID'
    });
  }

  try {
    const user = await User.findById(userID);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'User does not exist'
      });
    }

    if (user.role === 'user') {
      return res.status(403).json({
        success: false,
        data: {},
        message: `User ${user.username} does not have moderator or admin privileges`
      });
    }

    if (user.role !== 'admin' && user.role !== 'moderator') {
      return res.status(403).json({
        success: false,
        data: {},
        message: `User ${user.username} does not have moderator or admin privileges`
      });
    }

    if (user.role === 'admin' || user.role === 'moderator') {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'There was an issue with permissions'
    });
  }
}

module.exports = checkModeratorOrAdminRole;
