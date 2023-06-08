const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let purchaseId;
let token;

beforeAll(async () => {
  const login = {
    email: "Daniel@gmail.com",
    password: "1236",
  };
  const res = await request(app).post("/users/login").send(login);
  token = res.body.token;
});

test("POST / purchases", async () => {
  const product = await Product.create({
    title: "phone",
    description: "skadkkjaksdka",
    brand: "Holsjkadkskd",
    price: 100000,
  });
  const purchase = {
    productId: product.id,
    quantity: 10,
  };
  const res = await request(app)
    .post("/purchases")
    .send(purchase)
    .set("Authorization", `Bearer ${token}`);
  await product.destroy();
  purchaseId = res.body.id;
  expect(res.status).toBe(201);
});

test("GET/ purchases", async () => {
  const res = await request(app)
    .get("/purchases")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
});
