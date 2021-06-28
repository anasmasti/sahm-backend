const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt =require("jsonwebtoken");
const helmet = require('helmet')
const dotenv = require('dotenv')
const SecrectKeyVerify = require('./Middleware/api_key.verification')

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet())

//import routes 
const giverRoute = require('./routes/giver');
app.use('/giver', SecrectKeyVerify, giverRoute);



const actionRoute = require('./routes/action/actions');
app.use('/actions',actionRoute);



const login = require('./routes/login');
app.use('/login',login);
const users = require('./routes/Users/users');
app.use('/users/users',users);

//  ROUTE
app.get('/',(req,res)=>{
    res.send('welcome home');
});



// Connect to DB 
mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true} , ()=> console.log('connected to db'))


//listen to server 
app.listen(3000,'192.168.11.134');
// app.listen(3001);