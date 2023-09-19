const User = require('../../db/model/user');

async function deleteUser(req, res) {
  const { userID } = req.params;

  if (!userID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter user ID' });
  }

  try {
    const user = await User.deleteOne({ _id: userID });

    if (user.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'User does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted user',
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete user' });
  }
}

module.exports = deleteUser;
