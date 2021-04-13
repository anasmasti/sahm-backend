const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const AdminRouter = require('./routes/admin.js')
const BenefitedRouter = require('./routes/benifited.js')
const HomeRouter = require('./routes/home.js')
const GiverRouter = require('./routes/giver.js')
const mongoose = require('mongoose')

const app = express()
const url = require('./config/db.config.js')
const port = process.env.PORT || 5000

//Use body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Use Cors
app.use(cors({
    origin: '*',
    methods: [
        'GET', 'POST', 'PUT', 'DELETE'
    ],
    allowedHeaders: 'Content-Type, X-Requested-With, Accept, Origin, Authorization'
}))

//Connection with database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to MongoDB");
}).catch(err => {
    console.log('Could not connect. Exiting now...', err);
    process.exit();
});

//Home router
app.use('/', HomeRouter);
//Admin router
app.use('/api/admin', AdminRouter);
//Benefited router
app.use('/api/benefited', BenefitedRouter);
//Giver router
app.use('/api/giver', GiverRouter);


app.listen(port, console.log("app run on port: " + port))