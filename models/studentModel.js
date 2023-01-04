const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const studentModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validato: [validator.isEmail, 'Please enter valid email address']
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
        default: 'Student'
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
    assignmntSubmited: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
    ],
});

studentModel.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

studentModel.methods.correctPassword = async function(candidatePassword, studentPassword){
    return await bcrypt.compare(candidatePassword, studentPassword)
}

const StudentModel = mongoose.model('StudentModel', studentModel);
module.exports = StudentModel;