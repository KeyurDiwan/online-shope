const express = require('express');
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProductDetails } = require('../controller/product.controller');
const router = express.Router();

router.route('/products').get(getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').put(updateProducts).delete(deleteProduct).get(getProductDetails)


module.exports =router;