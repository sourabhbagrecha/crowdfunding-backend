const express = require("express");
const router = express.Router();

const Project = require("../../models/project");
const User = require("../../models/user");
const Bid = require("../../models/bid");

const isAuthenticated = require("../../middlewares/isAuth");
const bidController = require("../../controllers/bid");

router.post("/edit/:bidId", isAuthenticated, bidController.editBid);
router.post("/:projectId", isAuthenticated, bidController.postBid);
router.get("/fetch-all", isAuthenticated, bidController.fetchMyBids);
router.get("/:bidId", isAuthenticated, bidController.getBid);

module.exports = router;