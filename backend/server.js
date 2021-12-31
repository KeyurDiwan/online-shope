const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db.js')

// Handling Uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down server due to uncaught exception');
    process.exit(1);
})


// config  
dotenv.config({ path: "backend/config/config.env" });

// connecting db
connectDatabase()


const server = app.listen(process.env.PORT, () => {
    console.log("listeing on port " + process.env.PORT);
})

// unhandled error

process.on('unhandledRejection', err => {
    console.log(`Error: $(err.message).`);
    console.log("shutting down the server due to unhandles promise rejection")
    server.close(() => {
    process.exit(1);
});

})