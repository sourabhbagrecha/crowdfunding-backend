const addNewProject = async (req, res) => {
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
}

const fetchAll = async (req, res, next) => {
  try {
    const projects = await Project.find().select("title brief picture");
    return res.status(200).json({projects});
  } catch (error) {
    next(error);
  }
}

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).select("title brief picture description");
    if(!project) throw new Error("Project Not Found!")
    res.status(200).json({project});
  } catch (error) {
    next(error);
  }
}

module.exports = {addNewProject, fetchAll, getProject};