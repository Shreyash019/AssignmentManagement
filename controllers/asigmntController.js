const AssigmntModel = require('./../models/asigmntModel');
const TeacherModel = require('./../models/teacherModel');
const StudentModel = require('./../models/studentModel');


exports.getAllAsigmnt = async (req, res, next)=>{
    let createdBy = req.userAuth;
    try{
        const allAssignment = await AssigmntModel.find({createdBy});
        res.status(200).json({
            status: 'Success',
            results: allAssignment.length,
            data: {
                allAssignment,
            }
        });
    } catch(err){
        return res.status(200).send(err);
    }

};


exports.getSingleAsigmnt = async (req, res, next)=>{
    let id = req.params.id;
    let createdBy = req.userAuth;
    try{
        const singleAssignment = await AssigmntModel.findById({_id: id, createdBy: createdBy});
        if(!singleAssignment){
            return res.send(`Assignment doesn't exist`);
        }
        res.status(200).json({
            status: 'Success',
            data: {
                singleAssignment,
            }
        });
    } catch(err){
        return res.status(200).send(err);
    }

};


exports.createSingleAsigmnt = async (req, res, next)=>{
    const {name, summary} = req.body;
    try{
        // Finding teacher
        const createTeach = await TeacherModel.findById(req.userAuth);
        // Creating a assignment
        const newAssign = await AssigmntModel.create({
            name, 
            summary,
            createdBy: createTeach._id
        });
        // Pushing to teacher's assignment creation array
        createTeach.assignmntCreated.push(newAssign);
        await createTeach.save();
        res.status(201).json({
            status: 'Success',
            data: {
                newAssign
            }
        })
    } catch(err){
        return res.status(200).send(err);
    }
};


exports.updateSingleAsigmnt = async (req, res, next)=>{
    let id = req.params.id;
    let createdBy = req.userAuth;
    console.log(createdBy)
    try{
        const checkTeach = await AssigmntModel.findById({_id: id, createdBy: createdBy});
        console.log(checkTeach)
        if(checkTeach.createdBy.toString() !==req.userAuth.toString()){
            return res.status(400).send(`You don't have permission to update the blog.`)
        }
        const updateAssign= await AssigmntModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(201).json({
            status: 'Success',
            data: {
                updateAssign
            }
        });
    } catch(err){
        return res.send(err);
    }
};

exports.deleteSingleAsigmnt = async (req, res, next)=>{
    let id = req.params.id;
    let createdBy = req.userAuth;
    console.log(createdBy);
    try{
        const checkTeach = await AssigmntModel.findById({_id: id, createdBy: createdBy});
        if(checkTeach.createdBy.toString() !==req.userAuth.toString()){
            return res.status(400).send(`You don't have permission to update the blog.`)
        }
        let deleteSingleAssignment;
        deleteSingleAssignment = await AssigmntModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: {
                deleteSingleAssignment,
            }
        })
    } catch(err){
        return res.send(err);
    }

};

