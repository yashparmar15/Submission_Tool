const mongoose = require('mongoose');

const questionSchema = mongoose.Schema(
    {
        question : {
            type : String,
            required : true,
        },
        description : {
            type : String,
        },
        options : {
            type : [String]
        },
        marks : {
            type : Number
        },
        answer : {
            type : String
        }
    }
)

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;