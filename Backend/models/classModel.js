const mongoose = require('mongoose');
const User = require('./userModel');
const Post = require('./postModel');

const classSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            unique : true
        },
        description : {
            type : String,
        },
        posts : {
            type : [Post.schema]
        }
    }
)

const Class = mongoose.model("Class", classSchema);
  
module.exports = Class;