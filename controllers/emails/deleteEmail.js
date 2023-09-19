const Email = require('../../db/model/email');

async function deleteEmail(req, res) {
  const { emailID } = req.params;

  if (!emailID) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter email ID' });
  }

  try {
    const email = await Email.deleteOne({ _id: emailID });

    if (email.deletedCount === 0) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Email does not exist' });
    }

    return res.status(200).json({
      success: true,
      data: {},
      message: 'Successfully deleted email'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete email' });
  }
}

module.exports = deleteEmail;
