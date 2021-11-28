const Post = require('../models/postModel');
const Class = require('../models/classModel');
const User = require('../models/userModel');
const { isValidObjectId } = require('mongoose');
const Question = require('../models/questionModel');

const createPost = async (req, res) => {         // creating post
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

const fetchPosts = async (req, res) => {      // fetching all posts of given class
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

const fetchPost = async (req, res) => {         // fetching all useful information of particular post
    const {postId,classCode} = req.body;
    let classExists = await Class.findOne({classCode});
    if(!classExists) {
        res.send("error");
        return;
    }
    if(isValidObjectId(postId.toString())) {  // checking whether given Id is valid ID of not
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
                endTime : postData.endTime,
                questions : postData.questions,
                comments : postData.comments,
                completedBy : postData.completedBy,
                totalMarks : postData.totalMarks
            }
            res.send(data);
        } else {
            res.send("error");
        }
        return;
    }
    res.send("error");
};

const isInstructor = async (req, res) => {     // cheching whether current user is intructor of the class or not
    const {classCode, userId} = req.body;
    let classData = await Class.findOne({classCode});
    if(classData.createdBy.toString() === userId.toString()) {
        res.send(true);
    } else {
        res.send(false);
    }
};

const addComment = async (req, res) => {    // for adding comments in assignments
    const {postId, comments} = req.body;
    await Post.findOneAndUpdate({_id : postId}, {comments : comments});
    res.send("success");
}

const checkEnrolled = async (req, res) => {  // for checking current user is enrolled in the class or not
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

const uploadAssignment = async (req, res) => {    // for uploading assignment
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


const getAssignments = async (req, res) => {    // for getting uploaded assignment details
    const {postId} = req.body;
    let post = await Post.findById({_id : postId});
    let uploadedAssignments = [...post.uploadedAssignments]
    res.send(uploadedAssignments);
}

const saveMarks = async (req, res) => {       // for saving assignment marks
    const {uploadedAssignments, postId} = req.body;
    let post = await Post.findByIdAndUpdate({_id : postId}, {uploadedAssignments : uploadedAssignments});
    if(post)
        res.send("saved");
    else
        res.send("error");
}

const getSubmittedDetails = async (req,res) => { // fetching submitted details of all students
    const {userId, postId} = req.body;
    let post = await Post.findById({_id : postId});
    let users = [...post.uploadedAssignments];
    let user = users.filter((data) => (data.userId === userId));
    res.send(user);
}

const createQuiz = async (req, res) => {     // for creating quiz
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

const getQuestions = async (req,res) => {      // for fetching all questions of quiz
    const {postId} = req.body;
    let questions = [];
    let postQuestions = await Post.findById({_id : postId}).select("questions");
    let questionIds = postQuestions.questions;
    for(let i = 0 ; i < questionIds.length ; i++) {
        let questionInfo = await Question.findById({_id : questionIds[i]})
                                    .select(["question","description","options","marks"])
        questions.push(questionInfo);
    }
    res.send(questions);
}

const completedQuiz = async (req, res) => {       // for checking whether current use is already completed the quiz or not
    const {userId, postId} = req.body;
    const post = await Post.findOne({_id : postId});
    let completedBy = [...post.completedBy];
    completedBy.push({
        id : userId,
        score : -1
    });
    await Post.findByIdAndUpdate({_id : postId}, {completedBy : completedBy});
    res.send("success");
}

const gradeQuiz = async (req, res) => {  // for grading the quiz
    const {postId} = req.body;
    let post = await Post.findById({_id : postId});
    let questionsIds = [...post.questions];
    let questions = [];
    for(let i = 0 ; i < questionsIds.length ; i++) {
        let question = await Question.findById({_id : questionsIds[i]});
        questions.push(question);
    }
    let users = [...post.completedBy];
    let studentMarks = [];
    for(let i = 0 ; i < users.length ; i++) {
        let score = 0;
        let total = 0;
        let user = await User.findById({_id : users[i].id});
        let responses = [...user.responses];
        for(let j = 0 ; j < questions.length ; j++) {
            total += questions[j].marks;
            for(let k = 0 ; k < responses.length ; k++) {
                if(questions[j]._id.toString() === responses[k].quesId.toString()) {
                    if(questions[j].answer === responses[k].response) {
                        score += questions[j].marks;
                    }
                }
            }
        }
        let data = {
            name : user.name,
            email : user.email,
            score : score,
            total : total,
            key : user._id
        }
        studentMarks.push(data);
        users[i].score = score;
        await Post.findByIdAndUpdate({_id : postId}, {completedBy : users, totalMarks : total});
    }
    res.send(studentMarks);
}

module.exports = {createPost, fetchPosts, fetchPost, isInstructor, addComment, 
                    checkEnrolled, uploadAssignment, getAssignments, saveMarks, 
                    getSubmittedDetails, createQuiz, getQuestions, completedQuiz,
                    gradeQuiz}; 