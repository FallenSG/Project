const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const config = require('dotenv').config().parsed

const secret = config.SECRET
const host = config.HOST
const port = config.PORT || 3000;
const db = config.DB

const app = express()

app.set('view engine', 'pug');
// app.use(express.static(path.resolve(__dirname, '../client/build')));
app.set('views', './views');
app.use(express.static('public'))
app.use('/bookCover', express.static('bookCover'))

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// passport setup
require('./config-passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

//routing setup
app.use('/', require('./routes/index'));

//connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Couldn't connect to MongoDB"));


app.listen(port, host, (err) => {
    if (err) console.error(err);
    console.log(`Listening on ${host}:${port}`)
})