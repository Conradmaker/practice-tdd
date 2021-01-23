const express = require('express');
const productController = require('../../controller/product/product')

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProduct);
router.patch('/:productId', productController.updateProduct);

module.exports = router;
