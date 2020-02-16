const Bid = require('../models/bid');

const postBid = async (req, res, next) => {
  try {
    const {userId} = req;
    const {projectId} = req.params;
    const {amount} = req.body;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({msg: "No such user exists!"});      
    }
    if(user.balance < amount){
      return res.status(400).json({msg: "Insufficient Funds!"});
    }
    user.balance -= amount;
    await user.save();
    const bid = await Bid.create({
      project: projectId,
      user: userId,
      amount
    });
    const project = await Project.findById(projectId).select('funds bids');
    project.funds = parseInt(project.funds);
    project.funds += amount;
    project.bids.push(bid._id);
    await project.save();
    return res.status(201).json({bid, project, balance: user.balance});  
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const fetchMyBids = async (req, res, next) => {
  try {
    const bids = await Bid.find({user: req.userId}).select("_id amount project createdAt").populate("project", "title picture").sort("-createdAt");
    return res.status(200).json({bids});
  } catch (error) {
    next(error);
  }
}

module.exports = {postBid, fetchMyBids};