const request = require("supertest");
const app = require("../app");

describe("connection", () => {
  test("check server connection", (done) => {
    request(app).get("/").expect(200, { message: "server status ok" }, done);
  });
});
