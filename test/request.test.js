const request = require("supertest");
const app = require("../app");

const data = [
  {
    name: "test1",
    description: "test1's element",
  },
  {
    name: "test2",
    description: "test2's element",
  },
];

const sendForm = {
  orderDatas: {
    products: {},
    options: {},
    totals: { products: 2000, options: 1000, total: 3000 },
  },
};

describe("request", () => {
  test("check GET request1", (done) => {
    request(app).get("/products").expect(200, data, done);
  });

  test("check GET request1", (done) => {
    request(app).get("/options").expect(200, data, done);
  });

  test("check invalid GET request", (done) => {
    request(app).get("/foo").expect(404, done);
  });

  test("check POST request", (done) => {
    request(app)
      .post("/order")
      .send(sendForm)
      .expect({ orderNumber: 123456, price: 3000 })
      .expect(201, done);
  });

  test("check invalid POST request", (done) => {
    request(app).post("/order").send({}).expect(400, done);
  });
});
