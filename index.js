const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const UserRouter = require('./routes/user/userCrud.js')
const HomeRouter = require('./routes/home.js')
const ActionRouter = require('./routes/action.js')
const ContactRouter = require('./routes/contact.js')
const mongoose = require('mongoose')
const http = require('http')
const helmet = require('helmet')
const dotenv = require('dotenv')

const app = express()
const server = http.createServer(app)
// const io = require('socket.io')(server, {
//     cors: {
//         origin: "http://localhost:4200",
//         methods: ["GET", "POST"]
//     }
// })

// Config variables
const DB_URL = process.env.DB_URL || require('./config/db.config.js')
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || '192.168.11.100'

// Dotenv config
dotenv.config()

//use body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Cors config
app.use(cors({
    origin: '',
    credentials: true,
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ],
    allowedHeaders: 'Content-Type, X-Requested-With, Accept, Origin, Authorization'
}))

//Connection with database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch(err => {
    console.log('Could not connect. Exiting now...', err);
    process.exit();
});

//check if new user on my app on rel time
// io.on('connection', (socket) => {
//     console.log('a new user connected');
//     //listen on chat event
//     socket.on('chat', (data) => {
//         console.log('user send msg: ', data);
//         //send the message to client
//         io.emit('get_message', data)
//     });
//     socket.on('typing', () => {
//         console.log('typing..');
//     });
// })

//Helmet security
app.use(helmet());

// Main route
app.use('/', HomeRouter); //home router
app.use('/api/user', UserRouter); //User router
app.use('/api/action', ActionRouter); //action router
app.use('/api/contact', ContactRouter); //Contact router

//run the server
server.listen(port, host, console.log(`app is listening on: http://${HOST}:${PORT}`))