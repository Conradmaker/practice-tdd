const Product = require('../../models/Products');

const createProduct = async(req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

module.exports = { createProduct };
