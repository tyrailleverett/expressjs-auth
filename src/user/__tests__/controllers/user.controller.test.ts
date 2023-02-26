import supertest from "supertest";
import app from "../../../app";

const superAgent = supertest(app);
let cookie: string;
describe("auth controller", () => {
  describe("post /user/register", () => {
    it("should register a user and send back 201 response code", async () => {
      const response = await superAgent
        .post("/api/user/register")
        .send({ username: "user4", password: "password4" });
      expect(response.statusCode).toEqual(201);
    });

    it("should return response code 400 if user already exists", async () => {
      const response = await superAgent
        .post("/api/user/register")
        .send({ username: "user1", password: "password1" });

      expect(response.statusCode).toEqual(400);
    });
  });

  describe("post /user/login", () => {
    it("should return 200 response code and set session cookie", async () => {
      const response = await superAgent
        .post("/api/user/login")
        .send({ username: "user4", password: "password4" });

      expect(response.header).toHaveProperty("set-cookie");
      expect(response.statusCode).toEqual(200);

      const { "set-cookie": resCookie } = response.header;

      cookie = resCookie;
    });

    it("should return 400 response code if credentials are invalid", async () => {
      const response = await superAgent
        .post("/api/user/login")
        .send({ username: "user1", password: "password2" });
      expect(response.statusCode).toEqual(401);
    });
  });

  describe("get /user/user", () => {
    it("should return 200 response code and return the user", async () => {
      const response = await superAgent
        .get("/api/user/user")
        .set("cookie", cookie);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String)
      });
    });
  });

  describe("pOST /user/logout", () => {
    it("should return 200 response code", async () => {
      const response = await superAgent
        .post("/api/user/logout")
        .set("cookie", cookie);
      expect(response.statusCode).toEqual(200);
    });
  });

  describe("delete /user/delete", () => {
    it("should return 200 response code", async () => {
      const response = await superAgent
        .delete("/api/user/delete")
        .send({ id: 1 });
      expect(response.statusCode).toEqual(200);
    });
  });
});
