const express = require("express");
const router = express.Router();

const Project = require("../../models/project");

const validateProjectInput = require("../../validation/project");

router.post("/new", (req, res) => {

    // Form validation
    const { errors, isValid } = validateProjectInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    // Add the project

    Project.findOne({ title: req.body.title}).then(project => {
        if (project) {
            return res.status(400).json( { title: "Project Title exists" });
        } else {
            const newProject = new Project ({
                title: req.body.title,
                brief: req.body.brief,
                description: req.body.description,
                picture: req.body.picture
            });

            newProject.save().then(project => res.json(project)).catch(err => console.log(err));
        }
    });

    
});

router.get("/fetch-all", async (req, res) => {
    const projects = await Project.find();
    console.log(projects);
    res.status(200).json({projects});
});

router.get("/:id", async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        console.log(project);
        if(!project) throw new Error("Project Not Found!")
        res.status(200).json({project});
    } catch (error) {
        next(error);
    }
});


module.exports = router;