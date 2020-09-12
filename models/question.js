const mongoose = require('mongoose');

let QuestionSchema = mongoose.Schema({
    query: String,
    tags: [],
    topic: String
})

let Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;