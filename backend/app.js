const express = require('express');
const app = express();

app.use(express.json());

// import routes 
const product = require('./routes/product.route.js')

app.use('/api/v1', product);
 module.exports = app