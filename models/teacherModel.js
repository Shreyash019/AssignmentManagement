const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const teacherModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        default: 'Teacher'
    },
    joined: {
        type: String,
        default: Date.now()
    },
    about: {
        type: String,
        require: false,
        default: ''
    },
    assignmntCreated: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
    ],
});

teacherModel.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

teacherModel.methods.correctPassword = async function(candidatePassword, teacherPassword){
    return await bcrypt.compare(candidatePassword, teacherPassword);
}

const TeacherModel = mongoose.model('TeacherModel', teacherModel);
module.exports = TeacherModel;