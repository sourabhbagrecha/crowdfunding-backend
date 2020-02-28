const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.get("/results", isAuth, isAdmin, adminController.getResults);
router.get("/results/project/:projectId", isAuth, isAdmin, adminController.getProjectResult);

module.exports = router;