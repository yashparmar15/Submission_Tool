const mongoose = require('mongoose');
const User = require('./userModel');
const Post = require('./postModel');

const classSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
        },
        description : {
            type : String,
        },
        code : {
            type : String,
            unique : true
        },
        createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        },
        posts : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Post',
            default : []
        },
    }
)

const Class = mongoose.model("Class", classSchema);
  
module.exports = Class;