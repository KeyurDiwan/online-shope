const express = require('express');
const app = express();

const errorMiddleware = require('./middleware/error.js')

app.use(express.json());

// import routes 
const product = require('./routes/product.route.js')

app.use('/api/v1', product);

// middleware for error
app.use(errorMiddleware)

module.exports = app