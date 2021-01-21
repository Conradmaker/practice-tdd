const express = require('express');
const { welcome } = require('../../controller/product/product');

const router = express.Router();

router.get('/', welcome);

module.exports = router;
