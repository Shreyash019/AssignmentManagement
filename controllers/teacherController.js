const authToken = require('./../utils/authToken');
const TeacherModel = require('./../models/teacherModel');
const bcrypt = require('bcryptjs');


exports.asignmntHistory = ((req, res)=>{
    res.send(`This is teacher created assignment page.`)
});


exports.teacherPasswordUpdate = async (req, res, next)=>{
    const { password } = req.body;
    try{
        const user = req.userAuth;
        // Checking if user is updating password
        if(password){
            const upPassword = await bcrypt.hash(password, 12);
            await TeacherModel.findByIdAndUpdate(user, 
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

exports.teacherProfileUpdate = async (req, res, next)=>{
    try{
        const user = req.userAuth;
        if(req.email){
            const email = req.email
            const emailCheck = await TeacherModel.findOne({email});
            if(emailCheck){
                return res.send('Email already taken');
            }
        }

        const teacherProfile = await TeacherModel.findByIdAndUpdate(user, req.body,{
            new: true,
            runValidators: true
        })
          
        res.status(200).json({
        status: 'success',
        data: {
            teacherProfile
        }
        });
            
    } catch(err){
        return res.send(err);
    }
}


exports.teacherProfile = async(req, res, next)=>{
    try{
        let uid = req.userAuth;
        const teacherHome = await TeacherModel.findById(uid);
        res.status(200).json({
            status: 'Success',
            data: {
                teacherHome
            }
        })
    } catch(err){
        return res.send(err);
    }
}



exports.teacherSignIn = async (req, res)=>{
    try{
        const {email, password} = req.body;
        let signTeach;
        if (!email || !password){
            console.log('Please provide email and password.')
            return res.status(400).send('Please provide email and password.')
        }
        signTeach = await TeacherModel.findOne({email}).select('+password');
        
        if(!signTeach || !await signTeach.correctPassword(password, signTeach.password)){
            return res.status(201).send(`User doesn't exist.`)
        }

        const token = authToken.signToken(signTeach._id);
        res.status(201).json({
            status: 'Success',
            msg: 'Login Successful.',
            token,
        });
    } catch(err){
        return res.send(err);
    }

}

exports.teacherSignUp = async(req, res)=>{
    try{    
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            console.log(`Please provide correct details`)
            return res.send(`Please provide correct details`);
        }
        const teachSignUp = await TeacherModel.create({
            name,
            email,
            password
        });
        const token = authToken.signToken(teachSignUp._id)
        res.status(201).json({
            status: 'Success',
            token,
            data: {
                teachSignUp
            }
        });

    } catch(err){
        let email = req.body.email;
        const checkUser = await TeacherModel.findOne({email});
        if(checkUser.email==email){
            return res.send('User already exist');
        }
        return res.send(err);
    }
}

