const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

//    Wrong monodb id error
    if (err.name == 'CastError') {
        const message = "Resource not found..!" + err.path;
        err = new ErrorHandler(message, 400);
    }
   
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

// exports.module = ErrorHandler 