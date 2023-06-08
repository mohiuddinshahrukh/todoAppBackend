const request = require("supertest");
const { createServer } = require("./server/server");
// const express = require("express");
const app = createServer();
let mongoServer = require("mongodb-memory-server");
const mongoose = require("mongoose");
describe("", () => {
  beforeAll(async () => {
    mongoServer = await mongoServer.MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  test("should respond with status 200", async () => {
    let responseGet = await request(app).get("/api/todos");
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("should respond with status 201", async () => {
    let response = await request(app).post("/api/todos").send({
      title: "Todo 1",
    });
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("should respond with status 404", async () => {
    let response = await request(app).put("/api/todos").send({
      title: "Todo 1",
    });
    expect(response.statusCode).toBe(404);
  });

  test("should respond with status 400", async () => {
    let response = await request(app).put("/api/todos/123").send({
      title: "Todo 1",
    });
    expect(response.statusCode).toBe(400);
  });

  test("should respond with status 200", async () => {
    let responseGet = await request(app).get("/api/todos");
    expect(responseGet.statusCode).toBe(200);
    expect(responseGet.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    let id = "6474cb56a45526859512e1e8";
    let responsePut = await request(app).put(`/api/todos/${id}`).send({
      title: "Todo 1",
    });
    expect(responsePut.statusCode).toBe(400);
  });
});
