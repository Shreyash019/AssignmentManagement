const express = require('express');
const router = express.Router();
const teacherController = require('./../controllers/teacherController')
const authToken = require('./../utils/authToken');

router.route('/signin').post(teacherController.teacherSignIn);
router.route('/signup').post(teacherController.teacherSignUp);
//router.route('/updatepassword').put(authToken.protects, teacherController.teacherPasswordUpdate);

router.route('/teacherprofile').get(authToken.teachprotects, teacherController.teacherProfile);
// router.route('/updateprofile').put(authToken.protects, teacherController.teacherProfileUpdate);
router.route('/asigmnthistory').get(authToken.teachprotects, teacherController.asignmntHistory);

//router.route('/').get(authToken.protects, teacherController.getHome);


module.exports = router;