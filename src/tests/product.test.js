const request = require('supertest');
const app = require ('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models');

let productId;
let token;

beforeAll(async () => {
    const login ={
        email: "Daniel@gmail.com",
        password: "1236"
    }
   const res = await request(app).post('/users/login').send(login);
    token = res.body.token;
})

test('POST / products', async () => { 
    const category = await Category.create({name: "phone"});
    const newProduct = {
        title: "phone",
        description:"skadkkjaksdka" ,
        brand:"Holsjkadkskd",
        price:100000,
        categoryId: category.id
    }
    const res = await request(app)
    .post('/products')
    .send(newProduct)
    .set('Authorization', `Bearer ${token}`);
    await category.destroy();
    productId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
 });

 test("GET/ products", async () => {
    const res = await request(app)
    .get("/products");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

 test("GET /products/:id ", async () => {
    const res = await request(app)
        .get(`/products/${productId}`)
        expect(res.status).toBe(200);
  });

  test("PUT /products/:id ", async () => {
    const newProduct = {
        price:150000
    };
    const res = await request(app)
        .put(`/products/${productId}`)
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.price).toBe(newProduct.price);
  });

  test('POST /products/:id/images', async () => { 
    const image = await ProductImg.create({
    url: "http://hola",
    publicId: "false_Id"
    });
    const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
 });

  test("DELETE/ products/:id", async () => {
    const res = await request(app)
    .delete(`/products/${productId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });