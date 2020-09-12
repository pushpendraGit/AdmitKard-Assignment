//importing our required modules
const express = require('express');
const port = process.env.PORT || 5000;
const db = require('./config/mongoose');
const app = express();
const bodyParser = require('body-parser');

//setting up middlewares
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use('/', require('./routes'));


//starting our app on port
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})