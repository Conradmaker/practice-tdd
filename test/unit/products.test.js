const productController = require('../../controller/product/product')
const productModel = require('../../models/Products')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')
const allProducts = require('../data/all-products.json')

//productModel.create가 직접영향을 받으면 안되기 때문에 fn을 사용해 mock을 만든어준다.
productModel.create = jest.fn();
productModel.find = jest.fn();
productModel.findById = jest.fn();
productModel.findByIdAndUpdate = jest.fn();
productModel.findByIdAndRemove = jest.fn();

let req
let res
let next
const productId = '5dsdmmfkdasdasd'
const updatedProduct = {name:"updated name",description:'updated desc',price:2000}
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe('Product Controller Create', () => {
  beforeEach(()=>{
    req.body = newProduct;
  })
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });
  
  it('should call ProductModel.create',()=>{
    productController.createProduct(req,res,next);
    expect(productModel.create).toBeCalledWith(newProduct)
  })

  it('shoud return 201 status code',async()=>{
    await productController.createProduct(req,res,next);
    expect(res.statusCode).toBe(201);
    expect(res._isJSON()).toBeTruthy()
    //res._isEndCalled  .send 넘길때
    //res._isJSON  .json() 넘길때
  })

  it('should return json body in response',async()=>{
      productModel.create.mockReturnValue(newProduct)
      await productController.createProduct(req,res,next);
      expect(res._getJSONData()).toStrictEqual(newProduct)
  })

  it('shoud handle errors',async()=>{
    const errorMsg = {message:'name property missing'};
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.create.mockReturnValue(rejectedPromise);
    await productController.createProduct(req,res,next);
    expect(next).toBeCalledWith(errorMsg);
  })
});


describe('Product controller read all',()=>{
  it('should have a getProducts function',()=>{
      expect(typeof productController.getProducts).toBe('function')
  })

  it('should call ProductModel.find({})',async()=>{
    await productController.getProducts(req,res,next);
    expect(productModel.find).toHaveBeenCalledWith({});
  })
  
  it('should return 200 response',async()=>{
    await productController.getProducts(req,res,next);
    expect(res.statusCode).toBe(200)
  })

  it('should return json body in response',async()=>{
    productModel.find.mockReturnValue(allProducts)
    await productController.getProducts(req,res,next);
    expect(res._getJSONData()).toStrictEqual(allProducts)
  })

  it('should handle errors',async()=>{
    const errorMsg = {message:"Error finding product data"}
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.find.mockReturnValue(rejectedPromise);
    await productController.getProducts(req,res,next);
    expect(next).toHaveBeenCalledWith(errorMsg);
  })
})

describe('Product controller read by id',()=>{
  it('should have a getProductbyId',()=>{
    expect(typeof productController.getProduct).toBe('function')
  })

  it('should call productModel.findById',async()=>{
    req.params.productId = productId
    await productController.getProduct(req,res,next)
    expect(productModel.findById).toBeCalledWith(productId)
  })

  it('should return json body and response code 200',async()=>{
    productModel.findById.mockReturnValue(newProduct);
    await productController.getProduct(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newProduct);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it('should return 404 when item does not exist',async()=>{
    productModel.findById.mockReturnValue(null)
    await productController.getProduct(req,res,next)
    expect(res.statusCode).toBe(404)
    expect(res._isEndCalled).toBeTruthy()
  })

  it('should handle Error',async()=>{
    const errorMsg = {message:'error'}
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.findById.mockReturnValue(rejectedPromise);
    await productController.getProduct(req,res,next);
    expect(next).toHaveBeenCalledWith(errorMsg); 
  })
})

describe('Product controller update',()=>{
  it('should have an updateProduct function',()=>{
    expect(typeof productController.updateProduct).toBe('function')
  })
  it('should call findByIdAndUpdate',async()=>{
    req.params.productId = productId;
    req.body = updatedProduct
    await productController.updateProduct(req,res,next);
    expect(productModel.findByIdAndUpdate).toBeCalledWith(productId,{name:"updated name",description:'updated desc',price:2000},{new:true})
  })
  it('should return json body and response code 200',async()=>{
    req.params.productId = productId;
    req.body = updatedProduct
    productModel.findByIdAndUpdate.mockReturnValue(updatedProduct);
    await productController.updateProduct(req,res,next);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(updatedProduct)
  })

  it('should handle 404 when item doesnt exist',async()=>{
    productModel.findByIdAndUpdate.mockReturnValue(null);
    await productController.updateProduct(req,res,next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  })
  it('should handle 404 when item doesnt exist',async()=>{
    const errorMsg = {message:''};
    const rejectedPromise = Promise.reject(errorMsg)
    productModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)
    await productController.updateProduct(req,res,next);
    expect(next).toBeCalledWith(errorMsg)
  })

})

describe('Product controller Delete',()=>{
  it('should have a delete function',()=>{
    expect(typeof productController.deleteProduct).toBe('function')
  })
  it('should call ProductModel.findByIdAndRemove',async()=>{
    req.params.productId = productId;
    await productController.deleteProduct(req,res,next);
    expect(productModel.findByIdAndRemove).toBeCalledWith(productId)
  })
  it('should return 200 response',async()=>{
    let deletedProduct = {
      name:'deleted product',
      description:'deleted desc'
    }
    productModel.findByIdAndRemove.mockReturnValue(deletedProduct)
    await productController.deleteProduct(req,res,next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(deletedProduct);
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should handle 404 when item doesnt exist',async()=>{
    productModel.findByIdAndRemove.mockReturnValue(null);
    await productController.deleteProduct(req,res,next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy()
  })

  it('should handle errors',async()=>{
    const errorMsg = {message:'something wrong to delete'};
    const rejectedPromise = Promise.reject(errorMsg);
    productModel.findByIdAndRemove.mockReturnValue(rejectedPromise)
    await productController.deleteProduct(req,res,next);
    expect(next).toBeCalledWith(errorMsg)
  })
})
