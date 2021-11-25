const Post = require('../models/postModel');
const Class = require('../models/classModel');
const User = require('../models/userModel')

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

module.exports = {createPost}; 