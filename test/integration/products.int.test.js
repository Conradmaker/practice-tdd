const request = require('supertest');
const app = require('../../app');
const newProduct = require('../data/new-product.json')


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

            console.log(response.body)
            expect(response.statusCode).toBe(500);
            expect(response.body).toStrictEqual({message:"Product validation failed: description: Path `description` is required."})
    })
})

