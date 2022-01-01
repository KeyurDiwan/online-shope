const mongoose = require('mongoose');

module.exports = () => {
    //   return mongoose.connect("mongodb://localhost:27017/E-commerse");
    return mongoose.connect(process.env.DB_URI);
    
}
