const request = require('supertest');
const app = require ('../app');
require('../models');

let categoryId;
let token;

beforeAll(async () => {
    const login ={
        email: "Daniel@gmail.com",
        password: "1236"
    }
   const res = await request(app).post('/users/login').send(login);
    token = res.body.token;
})

test('POST / categories', async () => { 
    const category = {
        name: "phone"
    }
    const res = await request(app)
    .post('/categories')
    .send(category)
    .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
 });
 test("GET/ categories", async () => {
    const res = await request(app)
    .get("/categories");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("PUT /categories/:id ", async () => {
    const newCategory = {
      name: "televisor"
    };
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(newCategory)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(newCategory.name);
  });



  test("DELETE/ categories/:id", async () => {
    const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });