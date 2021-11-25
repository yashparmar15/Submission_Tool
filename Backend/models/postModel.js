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
            required : true,
        },
        type : {
            type : String,
        },
        deadline : {
            type : String
        },
        startTime : {
            type : Date
        },
        timeAlloted : {
            type : Number
        },
        questions : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Question'
        }
    }
)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;