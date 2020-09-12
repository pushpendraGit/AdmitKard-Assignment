const express = require('express');
const router = express.Router();


router.post('/search',require('../controllers/search_controller').search);
router.use('/questions',require('./questions'));


module.exports = router;