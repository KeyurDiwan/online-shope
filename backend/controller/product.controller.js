const Product = require('../models/product.model.js')
const ErrorHandler = require('../utils/errorhandler.js')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures.js');

// create product -- Admin
exports.createProduct = catchAsyncErrors( async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product})
})


// get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
   
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({ success: true, products});
})

// get product details single
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
 const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found..!", 404))
    }

    // await product.remove();
    res.status(200).json({ success : true, product, productCount })
})


// update products -- Admin only
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product Not Found..!", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // runValidators: true,
        // useFindAndModify: false
    }).lean()
        .exec();

    res.status(200).json({ success: true, product })

});

// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found..!", 404))
    }

    await product.remove();
    res.status(200).json({ success: true, message: "Product deleted successfully..!" })
});

