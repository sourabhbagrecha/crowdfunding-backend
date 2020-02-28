const express = require('express');
const router = express.Router();

const userRoutes = require("./api/user");
const projectRoutes = require("./api/project");
const biddingRoutes = require("./api/bid");
const emailRoutes = require("./util/emailer");
const adminRoutes = require("./admin");

router.use("/api/user", userRoutes);
router.use("/api/project", projectRoutes);
router.use("/api/bid", biddingRoutes);
router.use("/util/email", emailRoutes);
router.use("/admin", adminRoutes);

module.exports = router;