const User = require('../models/user.model.js');
const ErrorHandler = require('../utils/errorhandler.js')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtTokens.js');

// Register user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "sample url",
            url: "profile url",
        }
    });

    
   sendToken(user,201,res);
});

// login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // check if password and bot entered

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Emial and password both"), 400);

    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid username or password",401))
    }

    const isPasswordMatch = await  user.comparePassword(password);

     if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid usernam or password",401))
    }

    sendToken(user,200,res);
})


// Logout user

exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged Out..!"
    })

})