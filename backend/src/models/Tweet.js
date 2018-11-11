const mongoose = require('mongoose')

const TweetSchema = new mongoose.Schema({
    author: String,
    content: String,
    likes: {
        type: Number,
        //Para quando criar um tweet deixar ele com zero automaticamente
        default: 0,
    },
    //data de criação do tweet 
    createdAt: {
        type: Date,
        //default: hora atual
        default: Date.now,
    },
})

module.exports = mongoose.model('Tweet', TweetSchema)