const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');


const app = express();
dotenv.config({ path: 'config.env' })
const port = process.env.PORT || 8000;

//Logging requests
app.use(morgan('dev'));

//MongoDB connection
connectDB();

// Parser request to bodyparser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')

//Load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// Load Router
app.use('/', require('./server/routes/router'))



app.listen(port, () => console.log(`listening on http://localhost:${port}`));