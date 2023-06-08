const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let cartId;
let token;

beforeAll(async () => {
  const login = {
    email: "Daniel@gmail.com",
    password: "1236",
  };
  const res = await request(app).post("/users/login").send(login);
  token = res.body.token;
});

test("POST / cart", async () => {
  const product =  await Product.create({
    title: "phone",
    description: "skadkkjaksdka",
    brand: "Holsjkadkskd",
    price: 100000
  });
  const cart = {
    productId: product.id,
    quantity: 10,
  };
  const res = await request(app)
    .post("/cart")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);
  await product.destroy();
  cartId = res.body.id;
  expect(res.status).toBe(200);
  expect(res.body.id).toBeDefined();
});

test("GET/ cart", async () => {
  const res = await request(app).get("/cart").set("Authorization", `Bearer ${token}`);;
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /cart/:id ", async () => {
  const newCart = {
    quantity: 15,
  };
  const res = await request(app)
    .put(`/cart/${cartId}`)
    .send(newCart)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(newCart.quantity);
});

test("DELETE/ cart/:id", async () => {
  const res = await request(app)
    .delete(`/cart/${cartId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
