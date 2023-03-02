const express = require('express');
const { getPrograms, createProgram, updateProgram, updatePrograms, deleteProgram, updateProgramClient } = require('../controllers/programs.controller');
const { isLogedIn } = require("../middlewares/authMiddleware.js");

const programRouter = express.Router();

programRouter.route('/get/:id').get(isLogedIn, getPrograms);

programRouter.route('/create').post(isLogedIn, createProgram);

programRouter.route('/updateAll').put(isLogedIn, updatePrograms);

programRouter.route('/update').put(isLogedIn, updateProgram);

programRouter.route('/updateClient').put(isLogedIn, updateProgramClient);

programRouter.route('/delete').delete(isLogedIn, deleteProgram);

module.exports = programRouter;