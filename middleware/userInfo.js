const userModel = require('../models/userModel');

module.exports.userInfo = async (req, res, next) => {
  const token = req.user;
  console.log(token);

  try {
    const user = await userModel.findOne({ email: token.email });
    req.user = user;
    next();
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};