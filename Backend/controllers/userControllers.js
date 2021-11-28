const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser = asyncHandler(async (req, res) => {   // registering the user
    const {name, email, password} = req.body;

    const userExists = await User.findOne({ email });

    if(userExists) {
        res.send("User Already Exists");
        return;
        // throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Error Occured')
    }
});

const authUser = asyncHandler(async (req, res) => {    // signing in the user
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    } else {
        res.send("Error");
    }
    
});

const saveResponse = async (req, res) => {     // saving the responses of user of quiz question
    const {quesId, userId, response} = req.body;
    let user = await User.findById({_id : userId});
    let responses = [...user.responses];
    let data = {
        quesId : quesId,
        response : response
    }
    responses.push(data);
    await User.findByIdAndUpdate({_id : userId}, {responses : responses});
}

module.exports = {registerUser , authUser, saveResponse}; 