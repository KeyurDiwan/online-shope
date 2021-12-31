const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product name..!"],
        trim:true
    },
    description: {
        type: String,
        required: [true, "please enter product description..!"]
   
    },
     price: {
        type: Number,
         required: [true, "please enter product price..!"],
        maxlength:[8, "price cannot exceed 8 characters"]
    },
    images: [
        {
            public_id: {
            type: String,
            required: true
        },
         url: {
            type: String,
            required: true
         },
       }
    ],
    
    category: {
        type: String,
        required: [true, "please enter product category..!"],

    },
    stock: {
        type: Number,
        required: [true, "please enter product stock..!"],
        maxlength: [4, "stock can not exceed 4 characters"],
        default:1,
    },
    numOfReviews: {
        type: Number,
        default : 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }

        }
    ],
    createdAt: {
        type: Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);