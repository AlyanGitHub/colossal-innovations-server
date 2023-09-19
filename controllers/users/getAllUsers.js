const User = require('../../db/model/user');

async function getAllUsers(req, res) {
  try {
    const users = await User.aggregate([
      {
        $project: {
          userID: '$_id', // Rename _id to userID
          username: 1,
          role: 1,
          registration_date: 1
        }
      },
      {
        $project: {
          password: 0, // Exclude password field
          _id: 0
        }
      }
    ]);

    if (users.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No users found' });
    }

    return res.status(200).json({
      success: true,
      data: users,
      message: 'Successfully retrieved all users'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Failed to retrieve users' });
  }
}

module.exports = getAllUsers;
