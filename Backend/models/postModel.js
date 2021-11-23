const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {

    }
)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;