const request = require('supertest');
const app = require('../../app');
const newProduct = require('../data/new-product.json')

let firstProduct;
describe('POST /api/products',()=>{
    it("should created",async()=>{
        const response = await request(app)
            .post('/api/products')
            .send(newProduct)
            
            expect(response.statusCode).toBe(201);
            expect(response.body.name).toContain(newProduct.name);
            expect(response.body.description).toContain(newProduct.description);
    })

    it('should return 500',async()=>{
        const response = await request(app)
            .post('/api/products')
            .send({name:'name'})

            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({message:"Product validation failed: description: Path `description` is required."})
    })
})

describe('GET /api/products',()=>{
    it('should return products',async()=>{
        const response = await request(app)
            .get('/api/products')

        expect(response.statusCode).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].description).toBeDefined();
        firstProduct = response.body[0]
    })
})

describe('GET /api/products/:productId',()=>{
    it('should return product',async()=>{
        const res = await request(app)
            .get(`/api/products/${firstProduct._id}`)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toBe(firstProduct.name)
        expect(res.body.description).toBe(firstProduct.description)
    })
    it('should return 500 error',async()=>{
        const res = await request(app)
            .get(`/api/products/wrongId`)
        expect(res.statusCode).toBe(500)
        expect(res.body).toStrictEqual({message: 'Cast to ObjectId failed for value "wrongId" at path "_id" for model "Product"'})
    })
})
