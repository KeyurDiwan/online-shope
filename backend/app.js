const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const errorMiddleware = require('./middleware/error.js')

app.use(express.json());

// app.use(express.urlencoded({ extended: true}))

app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// import routes 
const product = require('./routes/product.route.js')
const user = require('./routes/user.route.js');



app.use('/api/v1', product);
app.use('/api/v1', user)

// middleware for error
app.use(errorMiddleware)

module.exports = app