const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db.js')
const cloudinary = require('cloudinary');

// Handling Uncaught exceptions
process.on( 'uncaughtException', ( err ) => {
    console.log( `Error: ${ err.message }` );
    console.log( 'shutting down server due to uncaught exception' );
    process.exit( 1 );
} );


// config  
dotenv.config({ path: "backend/config/config.env" });

// connecting db
connectDatabase()

cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const server = app.listen(process.env.PORT, () => {
    console.log("listeing on port " + process.env.PORT);
})

// unhandled error

process.on('unhandledRejection', err => {
    console.log(`Error: $(err.message)`);
    console.log("shutting down the server due to unhandles promise rejection")
    server.close(() => {
    process.exit(1);
});

})