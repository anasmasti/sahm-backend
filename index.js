const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const AdminRouter = require('./routes/admin.js')
const BenefitedRouter = require('./routes/benifited.js')
const HomeRouter = require('./routes/home.js')
const GiverRouter = require('./routes/giver.js')
const mongoose = require('mongoose')
const http = require('http');


const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
})
const url = require('./config/db.config.js')
const port = process.env.PORT || 5000

//use body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//use Cors
app.use(cors({
    origin: '*',
    credentials: true,
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ],
    allowedHeaders: 'Content-Type, X-Requested-With, Accept, Origin, Authorization'
}))

//Ccnnection with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch(err => {
    console.log('Could not connect. Exiting now...', err);
    process.exit();
});

//check if new user on my app on rel time
io.on('connection', (socket) => {
    console.log('a new user connected');
    //listen on chat event
    socket.on('chat', (data) => {
        console.log('user send msg: ', data);
        //send the message to client
        io.emit('get_message', data)
    });
    socket.on('typing', () => {
        console.log('typing..');
    });
});

//nome router
app.use('/', HomeRouter);
//admin router
app.use('/api/admin', AdminRouter);
//benefited router
app.use('/api/benefited', BenefitedRouter);
//giver router
app.use('/api/giver', GiverRouter);

//run the server
server.listen(port, console.log("app is listening on http://localhost:" + port))