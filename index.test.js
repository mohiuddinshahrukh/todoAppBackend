const request = require("supertest");
const { createServer } = require("./server/server");
// const express = require("express");
const app = createServer();
let mongoServer = require("mongodb-memory-server");
const mongoose = require("mongoose");

describe("Using an in memory mongoDb instance for testing", () => {
  beforeAll(async () => {
    mongoServer = await mongoServer.MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("Testing for GET request expecting a 200 OK.", () => {
    test("should respond with status 200", async () => {
      let responseGet = await request(app).get("/api/todos");
      expect(responseGet.statusCode).toBe(200);
      expect(responseGet.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("POST request on api with the correct input", () => {
    test("should respond with status 201", async () => {
      let response = await request(app).post("/api/todos").send({
        title: "Todo 1",
      });
      expect(response.statusCode).toBe(201);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("POST request on api with the required input missing", () => {
    test("should respond with status 400", async () => {
      let response = await request(app).post("/api/todos").send({
        title: "",
      });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("POST request on api with the required input being an object rather than a string", () => {
    test("should respond with status 400", async () => {
      let response = await request(app).post("/api/todos").send({
        title: {},
      });
      expect(response.statusCode).toBe(400);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
  });

  describe("Not sending the ID with a PUT request", () => {
    test("should respond with status 404", async () => {
      let response = await request(app).put("/api/todos").send({
        title: "Todo 1",
      });
      expect(response.statusCode).toBe(404);
    });
  });

  describe("sending a non-existent id with PUT request", () => {
    test("should respond with status 400", async () => {
      let response = await request(app).put("/api/todos/123").send({
        title: "Todo 1",
      });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("sending a non-existent id thats an object with PUT request ", () => {
    test("should respond with status 400", async () => {
      let response = await request(app)
        .put("/api/todos/123" + {})
        .send({
          title: "Todo 1",
        });
      expect(response.statusCode).toBe(400);
    });
  });

  describe("Sending a correct PUT request preceded by a GET request to ensure an existing ID is used", () => {
    test("should respond with status 200", async () => {
      let responseGet = await request(app).get("/api/todos");
      expect(responseGet.statusCode).toBe(200);
      expect(responseGet.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );

      let id = JSON.parse(responseGet.text).todos[0]._id;
      let responsePut = await request(app).put(`/api/todos/${id}`).send({
        title: "Todo 1",
      });
      expect(responsePut.statusCode).toBe(200);
    });
  });

  describe("Not sending the ID with a DELETE request", () => {
    test("should respond with status 404", async () => {
      let response = await request(app).delete("/api/todos");
      expect(response.statusCode).toBe(404);
    });
  });

  describe("sending a non-existent id with DELETE request", () => {
    test("should respond with status 400", async () => {
      let response = await request(app).delete("/api/todos/123");
      expect(response.statusCode).toBe(400);
    });
  });

  describe("sending a non-existent id thats an object with DELETE request ", () => {
    test("should respond with status 400", async () => {
      let response = await request(app).put("/api/todos/123" + {});

      expect(response.statusCode).toBe(400);
    });
  });

  describe("Sending a correct DELETE request preceded by a GET request to ensure an existing ID is used", () => {
    test("should respond with status 200", async () => {
      let responseGet = await request(app).get("/api/todos");
      expect(responseGet.statusCode).toBe(200);
      expect(responseGet.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );

      let id = JSON.parse(responseGet.text).todos[0]._id;
      let responsePut = await request(app).delete(`/api/todos/${id}`);
      expect(responsePut.statusCode).toBe(200);
    });
  });
});
