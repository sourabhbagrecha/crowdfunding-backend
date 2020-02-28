const User = require("../models/user");

module.exports = async (req, res, next) => {
  const {userId} = req;
  const user = await User.findById(userId).select('isAdmin').lean();
  if(!user.isAdmin){
    return res.status(400).json({msg: "Unauthorized request! Only for admins."});
  }
  next();
};