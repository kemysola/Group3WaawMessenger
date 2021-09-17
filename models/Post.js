const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    
    users: {
        type: mongoose.Types.ObjectId,
        ref:'user'
    },
    
    posts:{
        type: String
    },

    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }],

    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'like'
    }]
},{timestamps:true});

const Post = mongoose.model('post', postSchema);

module.exports = Post;