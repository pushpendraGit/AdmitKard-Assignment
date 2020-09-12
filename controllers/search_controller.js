const Question = require('../models/question');
//this is the function that does all the searching in the DB and returns the result
module.exports.search = async function (req, res) {
    mytags = req.body.query.split(' ');
    console.log('c tags ', mytags);
    try {
        console.log(req.body.query);
        let queryRes = await Question.find(
            {
                $or: [{ query: { $regex: req.body.query, $options: 'ig' } },
                { tags: { $in: mytags } }]
            }
        );
        if (queryRes != undefined) {
            return res.json({
                message: 'success',
                data: queryRes
            })
        }
        else {
            return res.json({
                message: 'empty'
            })
        }
    } catch (error) {
        return res.json({
            message: 'empty'
        })
    }
}