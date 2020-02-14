const express = require("express");
const router = express.Router();

const Project = require("../../models/project");
const User = require("../../models/user");
const Bid = require("../../models/bid");

const isAuthenticated = require("../../middlewares/isAuth");

router.post("/:projectId", isAuthenticated, async (req, res, next) => {
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
    console.log({user});
    await user.save();
    const bid = await Bid.create({
      project: projectId,
      user: userId,
      amount
    });
    const project = await Project.findById(projectId).select('funds bids');
    project.funds += amount;
    project.bids.push(bid._id);
    await project.save();
    return res.status(201).json({bid, project});  
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;