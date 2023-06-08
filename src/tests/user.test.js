const request = require('supertest');
const app = require ('../app');

let userId;
let token;
test('POST / users', async () => { 

    const user = {
        firstName: "Angela",
        lastName: "Villa",
        email: "Angela@gmail.com",
        password: "1236",
        phone: "31568666"
    }

    const res = await request(app)
    .post('/users')
    .send(user);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
 });
 test("POST /users/login ", async () => {
    const Login = {
        email: "Angela@gmail.com",
        password: "1236"
    };
    const res = await request(app).post(`/users/login`).send(Login);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("POST /users/login with invalid credentials", async () => {
    const Login = {
        email: "Angela25@gmail.com",
        password: "12365"
    };
    const res = await request(app).post(`/users/login`).send(Login);
    expect(res.status).toBe(401);
  });

 test("GET/ users", async () => {
    const res = await request(app)
    .get("/users")
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
  
  test("PUT /users/:id ", async () => {
    const newUser = {
      lastName: "Villa"
    };
    const res = await request(app)
        .put(`/users/${userId}`)
        .send(newUser)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.lastName).toBe(newUser.lastName);
  });



  test("DELETE/ users/:id", async () => {
    const res = await request(app)
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
