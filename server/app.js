const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('dotenv').config().parsed

const secret = config.SECRET
const host = config.HOST
const port = config.PORT || 3000;
const db = config.DB

const app = express()

app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//routing setup
app.use('/', require('./routes/index'));

//connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Couldn't connect to MongoDB"));


app.listen(port, host, (err) => {
    if(err) console.error(err);
    console.log(`Listening on ${host}:${port}`)
})
