const express = require('express');
const router = express.Router();
const studentController = require('./../controllers/studentController');
const authToken = require('./../utils/authToken');

router.route('/signin').post(studentController.studentSignIn);
router.route('/signup').post(studentController.studentSignUp);
router.route('/updatepassword').put(authToken.stuprotects, studentController.StudentPasswordUpdate);

router.route('/stuprofile').get(authToken.stuprotects, studentController.StudentProfile);
router.route('/updateprofile').put(authToken.stuprotects, studentController.StudentProfileUpdate);
router.route('/stuAhistory').get(authToken.stuprotects, studentController.stuAhistory);

module.exports = router;