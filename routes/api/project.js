const express = require("express");
const router = express.Router();

const Project = require("../../models/project");

const validateProjectInput = require("../../validation/project");

router.post("/project", (req, res) => {

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

router.get("/allProjects", (req, res) => {
    Project.find({}, (err, projects) => {
        if(err) {
            res.status(400).json("Something went wrong");
            next();
        }
        res.json(projects);
    });
});

router.get("/project/:id", (req, res) => {
    Project.findById(req.params.id).then(
        doc=> {
            if(!doc) {
                return res.status(404).json({id: "Id Not found"});
            }
            return res.status(200).json(doc);
        }).catch(err => res.status(400).json(err));
});




module.exports = router;