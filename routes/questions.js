const express = require('express');
const router = express.Router();


router.post('/add', require('../controllers/questions_controller').add);
router.post('/get',require('../controllers/questions_controller').getQuestion);

module.exports = router;