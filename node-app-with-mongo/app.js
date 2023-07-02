const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
require('dotenv').config()
var cors = require('cors')
app.use(cors())
let mongoose = require('mongoose');
let dbConfig = require('./database/db');


// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
        useNewUrlParser: true
    }).then(() => {
        console.log('Database sucessfully connected!')
    },
    error => {
        console.log('Could not connect to database : ' + error)

    }
)

const routes = require('./routes/web');

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json('server is running successfully!')
})


app.listen('8000', () => {
    console.log('Server is running on port: 8000')
})

