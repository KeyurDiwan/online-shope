const express = require('express');
const { getAllProducts,
    createProduct,
    updateProducts,
    deleteProduct,
    getProductDetails
} = require('../controller/product.controller');

const { isAuthenticatedUser , authorizeRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts)

router.route('/product/new').post(isAuthenticatedUser, createProduct) // add authorizeRoles("admin") after fixing

router.route('/product/:id')
    .put(isAuthenticatedUser, updateProducts) // add authorizeRoles("admin") after fixing
    .delete(isAuthenticatedUser, deleteProduct) // add authorizeRoles("admin") after fixing
    .get(getProductDetails)


module.exports = router;