const productController = require('../../controller/product/product')
const productModel = require('../../models/Products')
const httpMocks = require('node-mocks-http')
const newProduct = require('../data/new-product.json')

//productModel.create가 직접영향을 받으면 안되기 때문에 fn을 사용해 mock을 만든어준다.
productModel.create = jest.fn();

let req
let res
let next

beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
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
});