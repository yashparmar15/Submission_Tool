const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Class = require('./classModel')

const userSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
        },
        password : {
            type : String,
            required : true,
        },
        isAdmin : {
            type : Boolean,
            required : true,
            default : false, 
        },
        teaching : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Class'
        },
        enrolled : {
            type : [mongoose.Schema.Types.ObjectId],
            ref : 'Class'
        },
        responses : {
            type : [{
                quesId : mongoose.Schema.Types.ObjectId,
                response : String
            }]
        }
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
  // will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
  
const User = mongoose.model("User", userSchema);
  
module.exports = User;