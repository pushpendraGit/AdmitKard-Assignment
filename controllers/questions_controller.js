const Question = require('../models/question');

//this function adds a new question in the data base
module.exports.add = async function (req, res) {
    console.log(req.body);
    if (req.body.query === undefined || req.body.query.length < 10 || req.body.tags.length == 0 || req.body.tags === undefined || req.body.topic.length == 0 || req.body.topic === undefined) {
        return res.json({
            message: 'invalid'
        })
    }

    try {
        let newQuest = await Question.create(req.body);
        if (newQuest) {
            return res.json({
                message: 'success',
                data: newQuest
            })
        }
        else return res.json({
            message: 'error'
        })
    }
    catch (error) {
        return res.send({
            message: 'error'
        })
    }
}

//this function fetches the question from the db and returns them as json 
module.exports.getQuestion = async function (req, res) {
    try {
        let questions = await Question.find({});
        if (questions) {
            return res.send({
                message: 'success',
                data: questions
            });
        }
        else return res.send({
            message: 'empty',
        })
    } catch (err) {
        console.log(err);
        return res.send({
            message: 'error',
        })
    }
}