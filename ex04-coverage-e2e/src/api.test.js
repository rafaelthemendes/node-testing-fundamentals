const assert = require("assert");
const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(response.text, "contact us!");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Mendes", password: "experience" })
        .expect(200);

      assert.deepStrictEqual(response.text, "login succeeded!");
    });
    it("should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Hacker", password: "meDoHack" })
        .expect(401);

      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, "login failed!");
    });
  });

  describe("404", () => {
    it("should request an inexistent route /hi and redirect to 404 page", async () => {
      const response = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(response.text, "vish 404");
    });
  });
});
