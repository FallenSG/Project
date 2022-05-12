// const dns = require('dns')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config()

const host = process.env.HOST
const port = process.env.PORT || 3000;
const db = process.env.DB

const app = express()

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', require('./routes/index'))

//connect to mongodb
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Couldn't connect to MongoDB"));


app.listen(port, host, (err) => {
    if(err) console.error(err);
    console.log(`Listening on ${host}:${port}`)
})

// dns.resolve('fallen.com', 'A', (err, records) => {
//     console.log(records);
// })