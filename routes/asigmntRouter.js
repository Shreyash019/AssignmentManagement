const express = require('express');
const router = express.Router();
const asigmntController = require('../controllers/asigmntController')
const authToken = require('./../utils/authToken');

// // Student
// router.route('/student')
//     .get(authToken.stuprotects, asigmntController.getAllAsigmnt)
//     .post(authToken.stuprotects, asigmntController.createSingleAsigmnt)
// router.route('/student/:id')
//     .get(authToken.stuprotects, asigmntController.getSingleAsigmnt)
//     .put( authToken.stuprotects, asigmntController.updateSingleAsigmnt)
//     .delete(authToken.stuprotects, asigmntController.deleteSingleAsigmnt)


// Teacher
router.route('/teacher')
    .get(authToken.teachprotects, asigmntController.getAllAsigmnt)
    .post(authToken.teachprotects, asigmntController.createSingleAsigmnt)
router.route('/teacher/:id')
    .get(authToken.teachprotects, asigmntController.getSingleAsigmnt)
    .put( authToken.teachprotects, asigmntController.updateSingleAsigmnt)
    .delete(authToken.teachprotects, asigmntController.deleteSingleAsigmnt)



module.exports = router;