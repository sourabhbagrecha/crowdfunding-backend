const express = require("express");
const router = express.Router();

const Project = require("../../models/project");
const User = require("../../models/User");
const Bid = require("../../models/bid");

router.post("/bid", async (req, res) => {
  try {
    const {userId} = req;
    const {projectId} = req.params;
    const {amount} = req.body;
    const user = User.findById(userId).select('balance');
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
    project.funds += amount;
    project.bids.push(bid._id);
    await project.save();
    return res.status(201).json({bid, project});  
  } catch (error) {
    console.log(error);
    next(error);
  }
});