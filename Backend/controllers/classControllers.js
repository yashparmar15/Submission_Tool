const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Class = require('../models/classModel');
const { Mongoose } = require('mongoose');


const addClass = async (req, res) => {
    const {title, description, code, createdBy, instructorName} = req.body;
    const classExists = await Class.findOne({ code });
    const clas = await Class.findOne({ title });
    if(classExists || clas) {
        res.send("error");
        return;
    }
    const ClassData = await Class.create({
        title,
        description,
        code,
        createdBy,
        instructorName
    });

    if(ClassData) {
        let user = await User.findOne({_id : createdBy})
        let teaching = [...user.teaching];
        teaching.push(ClassData._id);
        let u = await User.findByIdAndUpdate({_id : createdBy}, {teaching : teaching});
        res.send("success");
    } else {
        res.status(400)
        throw new Error('Error Occured')
    }
};


const joinClass = async (req, res) => {
    const {code, userId} = req.body;
    let classExists = await Class.findOne({code : code});
    if(!classExists) {
        res.send("error");
        return;
    }
    let user = await User.findOne({_id : userId});
    let enrolled = [...user.enrolled];
    let alreadyJoined = false;
    for(let i = 0 ; i < enrolled.length ; i++) {
        if(enrolled[i].toString() === classExists._id.toString()) {
            alreadyJoined = true;
            break;
        }
    }
    if(alreadyJoined) {
        res.send("already");
        return;
    }
    let teaching = [...user.teaching];
    for(let i = 0 ; i < teaching.length ; i++) {
        if(teaching[i].toString() === classExists._id.toString()) {
            alreadyJoined = true;
            break;
        }
    }
    if(alreadyJoined) {
        res.send("already");
        return;
    }
    enrolled.push(classExists._id);
    let u = await User.findByIdAndUpdate({_id : userId}, {enrolled : enrolled});
    if(u) {
        res.send("success");
        return;
    }
    res.send("wrong");
};


const enrolledClasses = async (req, res) => {
    let {userId} = req.body;
    let user = await User.findOne({_id : userId});
    let enrolled = [...user.enrolled];
    let enrolledClass = []
    for(let i = 0 ; i < enrolled.length ; i++) {
        let obj = await Class.findOne({_id : enrolled[i]});
        if(obj) {
            let data = {
                title : obj.title,
                code : obj.code,
                description : obj.description,
                id : obj.createdBy,
                intructorName : obj.instructorName
            }
            enrolledClass.push(data);
        }
    }
    res.send(enrolledClass);
};

const teachingClasses = async (req, res) => {
    let {userId} = req.body;
    let user = await User.findOne({_id : userId});
    let teaching = [...user.teaching];
    let teachingClass = []
    for(let i = 0 ; i < teaching.length ; i++) {
        let obj = await Class.findOne({_id : teaching[i]});
        if(obj) {
            let data = {
                title : obj.title,
                code : obj.code,
                description : obj.description,
                id : obj.createdBy,
                instructorName : obj.instructorName
            }
            teachingClass.push(data);
        }
    }
    res.send(teachingClass);
};

const getClassDetails = async (req, res) => {
    let {code} = req.body;
    let classDetail = await Class.findOne({code : code});
    if(!classDetail) {
        res.send("error");
        return;
    }  
    res.send(classDetail);
};

const unenrollClass = async (req, res) => {
    let {id, code} = req.body;
    let user = await User.findOne({_id : id});
    let unenrollingClass = await Class.findOne({code});
    let enrolled = [...user.enrolled];
    let updatedEnrolledClasses = []
    for(let i = 0 ; i < enrolled.length ; i++) {
        if(enrolled[i].toString() !== unenrollingClass._id.toString()) {
            updatedEnrolledClasses.push(enrolled[i]);
        }
    }
    await User.findByIdAndUpdate({_id : id}, {enrolled : updatedEnrolledClasses});
    res.send("success");
};


const removeClass = async (req, res) => {
    let {id, code} = req.body;
    let user = await User.findOne({_id : id});
    let removingClass = await Class.findOne({code});
    let teaching = [...user.teaching];
    let updatedTeachingClasses = []
    for(let i = 0 ; i < teaching.length ; i++) {
        if(teaching[i].toString() !== removingClass._id.toString()) {
            updatedTeachingClasses.push(teaching[i]);
        }
    }
    await User.findByIdAndUpdate({_id : id}, {teaching : updatedTeachingClasses});
    await Class.deleteOne({code});
    res.send("success");
};

const getEnrolledStudents = async (req, res) => {
    let {classId} = req.body;
    let d = await User.find({enrolled : {
        $in : [classId]
    }}).select(["name", "email", "-_id"])
    res.send(d);
};

const getInstructor = async (req,res) => {
    let {instructorId} = req.body;
    let user = await User.findById({_id : instructorId});
    let data = {
        name : user.name,
        email : user.email
    }
    res.send(data);
}






module.exports = {addClass, joinClass, enrolledClasses, teachingClasses, getClassDetails, unenrollClass, removeClass, getEnrolledStudents, getInstructor};