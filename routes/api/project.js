const express = require("express");
const router = express.Router();

const Project = require("../../models/project");

const validateProjectInput = require("../../validation/project");
const projectController = require("../../controllers/project");
const isAuth = require("../../middlewares/isAuth");

router.post("/new", isAuth, projectController.addNewProject);

router.get("/fetch-all", isAuth, projectController.fetchAll);

router.post("/add-dummy-data", projectController.addDummyData);

router.get("/:id", isAuth, projectController.getProject);

module.exports = router;