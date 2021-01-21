const Error = require('../../models/ErrorLog');
const Product = require('../../models/Products');

const createProduct = async(req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    //await Error.create({message:e._message,info:e.errors.name})
    next(e);
  }
  
};

module.exports = { createProduct };
