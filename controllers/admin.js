const Project = require('../models/project');

const getResults = async (req, res, next) => {
  try {
    const projects = await Project.find().select('title funds picture').sort({'funds': -1});
    res.status(200).json({projects});
  } catch (error) {
    next(error);
  }
};

const getProjectResult = async (req, res, next) => {
  try {
    const {params: {id}} = req;
    const project = await Project.findById(id).populate('bids');
  } catch (error) {
    next(error);
  }
}

module.exports = {getResults, getProjectResult};