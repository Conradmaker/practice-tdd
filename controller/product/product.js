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

const getProducts = async(req,res,next)=>{
  try {
    const products = await Product.find({})
    res.status(200).json(products)
  } catch (e) {
    console.error(e)
    next(e)
  }
}

module.exports = { createProduct,getProducts };
