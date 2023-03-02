const express = require('express');
const { getDDO, createDDO, updateDDO, deleteDDO } = require("../controllers/ddo.controller");

const DDORouter = express.Router();

DDORouter.route('/get/:id').get(getDDO);

DDORouter.route('/create').post(createDDO);

DDORouter.route('/update/:id').put(updateDDO);

DDORouter.route('/delete/:id').delete(deleteDDO);

module.exports = DDORouter;