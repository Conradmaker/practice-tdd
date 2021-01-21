const express = require('express');
const productController = require('../../controller/product/product')

const router = express.Router();

router.post('/', productController.createProduct);

module.exports = router;
