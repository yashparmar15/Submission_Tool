const mongoose = require('mongoose');
const Question = require('./questionModel');

const postSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        description : {
            type : String
        },
        marks : {
            type : Number,
            default : 0
        },
        type : {
            type : String,
        },
        deadline : {
            type : String,
            default : ""
        },
        startTime : {
            type : String,
            default : ""
        },
        timeAlloted : {
            type : Number,
            default : 0
        },
        questions : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Question'
        },
        comments : {
            type : [{
                name : String,
                comment : String
            }],
            default : []
        },
        uploadedAssignments : {
            type : [{
                userId : String,
                file : String,
                name : String,
                email : String,
                marks : Number,
                key : String
            }]
        }
    }
)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;