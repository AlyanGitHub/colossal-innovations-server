const User = require('../../db/model/user');

async function updateUser(req, res) {
  const { userID } = req.params;
  const { username, role } = req.body;

  if (!userID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter user ID' });
  }

  try {
    const updatedUser = await User.findById(userID);
    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'User does not exists' });
    }

    updatedUser.role = role || updatedUser.role;
    updatedUser.username = username || updatedUser.username;

    await updatedUser.save();

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: 'Successfully updated user role',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to update user role',
    });
  }
}

module.exports = updateUser;
