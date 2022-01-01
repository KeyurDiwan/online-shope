const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name..!"],
        maxlength: [30, "Name can not be exceed 30 characters"],
        minlength: [4, "Name can not be less than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "please enter your email..!"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minlength: [8, "Please enter at least 8 characters"],
        select: false,
    },
    avatar:
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: 'user',
    },
    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();  
    }
    this.password = await bcryptjs.hash(this.password, 10)
})

// JWT TOKEN

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
    })

}


// compare password

userSchema.methods.comparePassword = async function (enteredPassword){
return  bcryptjs.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', userSchema)