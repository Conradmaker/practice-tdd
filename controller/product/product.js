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
    next(e)
  }
}

const getProduct = async(req,res,next)=>{
  try {
    const product = await Product.findById(req.params.productId)
    if(!product){
      return res.status(404).send(null)
    }
    res.status(200).json(product)
  } catch (e) {
    next(e)
  }
}

const updateProduct = async(req,res,next)=>{
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId,req.body,{new:true})
    if(!product){
      return res.status(404).send()
    }
    res.status(200).json(product)
  } catch (e) {
    next(e)
  }
}

const deleteProduct =async(req,res,next)=>{
  try {
    const product = await Product.findByIdAndRemove(req.params.productId);
    if(!product){
      return res.status(404).send('없어요 해당하는 아이디는');
    }
    res.status(200).json(product)
  } catch (e) {
    next(e)
  }
}

module.exports = { createProduct,getProducts,getProduct,updateProduct,deleteProduct };
