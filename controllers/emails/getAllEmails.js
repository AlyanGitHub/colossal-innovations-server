const Email = require('../../db/model/email');

async function getAllEmails(req, res) {
  try {
    const emails = await Email.find({});

    if (emails.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No emails found' });
    }

    return res.status(200).json({
      success: true,
      data: emails,
      message: 'Successfully retrieved all emails'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Failed to retrieve emails' });
  }
}

module.exports = getAllEmails;
