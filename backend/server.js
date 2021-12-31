const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db.js')
// config  
dotenv.config({ path: "backend/config/config.env" });

// connecting db
connectDatabase()


app.listen(process.env.PORT, () => {
    console.log("listeing on port " + process.env.PORT);
})