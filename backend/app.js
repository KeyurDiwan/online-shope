const express = require('express');
const app = express();
// const cookieParser = require('cookie-parser');

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require( 'path' );
const fileUpload = require( "express-fileupload" );
const errorMiddleware = require('./middleware/error.js')

app.use(express.json());

// app.use(express.urlencoded({ extended: true}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());


// import routes 
const product = require('./routes/product.route.js')
const user = require('./routes/user.route.js');
const order = require('./routes/order.route.js');



app.use('/api/v1', product);
app.use( '/api/v1', user );
app.use( '/api/v1', order );

// middleware for error
app.use(errorMiddleware)

module.exports = app