const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);

    if (!token) {
        return next(new ErrorHandler("Please login to access this..!",401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await User.findById(decodedData._id);

    next();
});

// exports.authorizeRoles = (roles) => {
//     return (req, res, next) => {
//         user = req.user.role;

//          isAllowed = false;
      
//         user.roles.map((role) => {
//       if (roles.includes(role)) {
//         isAllowed = true;
//       }
//         });
        
//    if (!isAllowed)
//       return res.status(401).json({
//         status: "failed",
//         message: " You are not allowed to access this",
//       });

//     next();
//   };
// };
exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
      console.log();
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};