const Post = require('../models/postModel');
const Class = require('../models/classModel');
const User = require('../models/userModel');
const { isValidObjectId } = require('mongoose');
const Question = require('../models/questionModel');

const createPost = async (req, res) => {
    const {classId, title, description, marks, type, deadline} = req.body;
    let post = await Post.create({
        title,
        description,
        marks,
        type,
        deadline
    })

    let classUpdate = await Class.findByIdAndUpdate({_id : classId}, {$push : {
        posts : post._id
    }})
    res.send("Success");
};

const fetchPosts = async (req, res) => {
    const {classId} = req.body;
    let classData = await Class.findOne({_id : classId});
    let posts = [...classData.posts];
    let data = []
    for(let i = 0 ; i < posts.length ; i++) {
        data.push(await Post.findOne({_id : posts[i]}).select(["title","startTime","deadline","type"]));
    }
    data.reverse();
    res.send(data);

};

const fetchPost = async (req, res) => {
    const {postId,classCode} = req.body;
    let classExists = await Class.findOne({classCode});
    if(!classExists) {
        res.send("error");
        return;
    }
    if(isValidObjectId(postId.toString())) {
        let postData = await Post.findOne({_id : postId});
        if(postData) {
            let data = {
                title : postData.title,
                description : postData.description,
                marks : postData.marks,
                type : postData.type,
                deadline : postData.deadline,
                startTime : postData.startTime,
                timeAlloted : postData.timeAlloted,
                questions : postData.questions,
                comments : postData.comments
            }
            res.send(data);
        } else {
            res.send("error");
        }
        return;
    }
    res.send("error");
};

const isInstructor = async (req, res) => {
    const {classCode, userId} = req.body;
    let classData = await Class.findOne({classCode});
    if(classData.createdBy.toString() === userId.toString()) {
        res.send(true);
    } else {
        res.send(false);
    }
};

const addComment = async (req, res) => {
    const {postId, comments} = req.body;
    await Post.findOneAndUpdate({_id : postId}, {comments : comments});
    res.send("success");
}

const checkEnrolled = async (req, res) => {
    const {userId, classCode} = req.body;
    let classId = await Class.findOne({code : classCode}).select("_id");
    let user = await User.findOne({_id : userId, enrolled : {
        $in : [classId._id]
    }});
    let userteaching = await User.findOne({_id : userId, teaching : {
        $in : [classId._id]
    }});
    if(!user && !userteaching)
        res.send("error");
    else
        res.send("success");
}

const uploadAssignment = async (req, res) => {
    let file = req.files.file;
    const {userId,postId, name, email, marks} = req.body;
    file.mv('public/documents/' + userId + postId + file.name, function(err){
        if(err) {
            res.send("error");
        } 
    });
    let post = await Post.findOne({_id : postId});
    let uploadedAssignments = [...post.uploadedAssignments];
    uploadedAssignments = uploadedAssignments.filter((assign) => (assign.userId !== userId));
    uploadedAssignments.push({
        userId : userId,
        file : userId + postId + file.name,
        name : name,
        email : email,
        marks : marks,
        key : userId
    });
    await Post.findByIdAndUpdate({_id : postId}, {uploadedAssignments : uploadedAssignments});
    res.send("success");
}


const getAssignments = async (req, res) => {
    const {postId} = req.body;
    let post = await Post.findById({_id : postId});
    let uploadedAssignments = [...post.uploadedAssignments]
    res.send(uploadedAssignments);
}

const saveMarks = async (req, res) => {
    const {uploadedAssignments, postId} = req.body;
    let post = await Post.findByIdAndUpdate({_id : postId}, {uploadedAssignments : uploadedAssignments});
    if(post)
        res.send("saved");
    else
        res.send("error");
}

const getSubmittedDetails = async (req,res) => {
    const {userId, postId} = req.body;
    let post = await Post.findById({_id : postId});
    let users = [...post.uploadedAssignments];
    let user = users.filter((data) => (data.userId === userId));
    res.send(user);
}

const createQuiz = async (req, res) => {
    const {data, classId, postId} = req.body;
    const {title, description, startTime, timeAlloted, questions} = data;
    let type = "Quiz";
    let post = null;
    if(postId === ""){
        post = await Post.create({
            title,
            description,
            type,
            startTime,
            timeAlloted
        });
        await Class.findByIdAndUpdate({_id : classId}, {$push : {
            posts : post._id
        }})
    } else {
        post = await Post.findByIdAndUpdate({_id : postId}, {
            title,
            description,
            startTime,
            timeAlloted
        })
    }
    let postQuestions = [];
    for(let i = 0 ; i < questions.length ; i++) {
        let question = await Question.create(questions[i]);
        postQuestions.push(question);
        await Post.findByIdAndUpdate({_id : post._id}, {questions : postQuestions});
    }
    res.send(post._id);
}



module.exports = {createPost, fetchPosts, fetchPost, isInstructor, addComment, checkEnrolled, uploadAssignment, getAssignments, saveMarks, getSubmittedDetails, createQuiz}; 