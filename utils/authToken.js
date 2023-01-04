const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const StudentModel = require('./../models/studentModel');
const TeacherModel = require('./../models/teacherModel');

exports.signToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.stuprotects = async (req, res, next)=>{
    // 1) Getting Token and check of it's there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).send('You are not logged in')
    }
    
    // 2) Verification token
    //console.log('CHeck')
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log('auth id:: ',decoded.id);
    req.userAuth = decoded.id;
    // 3) Check if  user still exists
    const currentUser = await StudentModel.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).send('The user belonging to this token does no longer exist.')
    } else {
        next()
    }

    // // 4) CHeck if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return res.status(401).send('User recently changed password! Please log in again.');
    // }
    return req.userAuth;
}

exports.teachprotects = async (req, res, next)=>{
    // 1) Getting Token and check of it's there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token){
        return res.status(401).send('You are not logged in')
    }
    
    // 2) Verification token
    //console.log('CHeck')
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log('auth id:: ',decoded.id);
    req.userAuth = decoded.id;
    // 3) Check if  user still exists
    const currentUser = await TeacherModel.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).send('The user belonging to this token does no longer exist.')
    } else {
        next()
    }

    // // 4) CHeck if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return res.status(401).send('User recently changed password! Please log in again.');
    // }
    return req.userAuth;
}