const authToken = require('./../utils/authToken');
const StudentModel = require('./../models/studentModel');
const bcrypt = require('bcryptjs');


exports.stuAhistory = async (req, res, next)=>{
    res.status(200).json({
        status: 'Success',
    })
}

exports.StudentProfileUpdate = async (req, res, next)=>{
    try{
        const user = req.userAuth;
        if(req.email){
            const email = req.email
            const emailCheck = await StudentModel.findOne({email});
            if(emailCheck){
                return res.send('Email already taken');
            }
        }

        const studentProfile = await StudentModel.findByIdAndUpdate(user, req.body,{
            new: true,
            runValidators: true
        })
          
        res.status(200).json({
        status: 'success',
        data: {
            studentProfile
        }
        });
            
    } catch(err){
        res.status(400).send(err);
    }
}


exports.StudentPasswordUpdate = async (req, res, next)=>{
    const { password } = req.body;
    try{
        const user = req.userAuth;
        // Checking if user is updating password
        if(password){
            const upPassword = await bcrypt.hash(password, 12);
            await StudentModel.findByIdAndUpdate(user, 
                {password: upPassword},
                {new: true, runValidators: true}
            );
            res.json({
                status: "success",
                data: "Password has been changed successfully",
              });
            } else {
              return res.send("Please provide password field");
            }
    } catch(err){
        res.status(400).send(err);
    }
}


exports.StudentProfile = async (req, res, next)=>{
    try{
        let uid = req.userAuth;
        const studentHome = await StudentModel.findById(uid);
        res.status(200).json({
            status: 'Success',
            data: {
                studentHome
            }
        })
    } catch(err){
        return res.send(err);
    }
}



exports.studentSignIn = async (req, res, next)=>{
    try{
        const {email, password} = req.body;
        let signinStu;
        if (!email || !password){
            console.log('Please provide email and password.')
            return res.status(400).send('Please provide email and password.')
        }
        signinStu = await StudentModel.findOne({email}).select('+password') // Password {select: false}, so '+password'
    
        if(!signinStu || !await signinStu.correctPassword(password, signinStu.password)){
            console.log(`Student doestn't exist`)
            return res.status(400).send(`Student doestn't exist`);
        }
        // const checkPassword = signinStu.password;
        const token = authToken.signToken(signinStu._id);
        res.status(201).json({
            status: 'Success',
            msg: 'Login Successful.',
            token,
        });
    } catch(err){
        return res.send(err);
    }    
}

exports.studentSignUp = async (req, res, next)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            console.log(`Please provide correct details`)
            return res.send(`Please provide correct details`);
        }
        // console.log('Details :: ', req.body);
        const signupStu = await StudentModel.create({
            name,
            email,
            password
        });
        const token = authToken.signToken(signupStu._id);
        // console.log(signupStu);
        res.status(201).json({
            status: 'Success',
            token,
            data: {
                signupStu
            }
        })
    } catch(err){
        let email = req.body.email;
        const checkUser = await StudentModel.findOne({email});
        if(checkUser.email==email){
            return res.send('User already exist');
        }
        return res.send(err);
    }
}

