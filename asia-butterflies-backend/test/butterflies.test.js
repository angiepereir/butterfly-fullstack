import request from "supertest";
import { app } from "../app.js";
import ButterflyModel from "../models/ButterflyModel.js";

describe("test butterfly crud", () => {
  describe("GET/butterflies", () => {
    let response;
    beforeEach(async () => {
      response = await request(app).get("/butterflies").send();
    });
    test("should return a response with status 200 and type json", async () => {
      // const response = await request(app).get('/butterflies').send()
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
    });
    test("should return array with all butterflies", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /butterflies/:id", () => {
    test("should return a single butterfly when id exists", async () => {
      const response = await request(app).get("/butterflies/1").send();
      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name");
    });

    test("should return 404 when butterfly does not exist", async () => {
      const response = await request(app).get("/butterflies/99999").send();
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });
  describe("PUT /butterflies/:id", () => {
    test("should update an existing butterfly", async () => {
      const updatedData = {
        name: "Mariposa Actualizada",
        longDescription: "Descripción actualizada"
      };

      const response = await request(app)
        .put("/butterflies/1")
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toContain("json");
      expect(response.body).toHaveProperty("id", 1);
      expect(response.body).toHaveProperty("name", updatedData.name);
      expect(response.body).toHaveProperty("longDescription", updatedData.longDescription);
    });
  });

});

// test de create
describe("POST /butterflies", () => {
  test("should create a new butterfly with valid data", async () => {
    const butterflyData = {
      name: "Mariposa Test",
      sciname: "Lepidoptera testus",
      shortDescription: "Una mariposa de prueba",
      longDescription: "Esta es una descripción larga de la mariposa de prueba para validar la funcionalidad",
      activity: 1,
      status: 1,
      region: "Test Region",
      location: "Test Location",
      imageUrl: "https://example.com/butterfly.jpg"
    };

    const response = await request(app)
      .post("/butterflies")
      .send(butterflyData);

    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toContain("json");
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", butterflyData.name);
    expect(response.body).toHaveProperty("longDescription", butterflyData.longDescription);
  });

  test("should return 400 when required fields are missing", async () => {
    const incompleteData = {
      sciname: "Lepidoptera testus"
    };

    const response = await request(app)
      .post("/butterflies")
      .send(incompleteData);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  test("should create butterfly with only required fields", async () => {
    const minimalData = {
      name: "Mariposa Mínima",
      longDescription: "Descripción mínima requerida"
    };

    const response = await request(app)
      .post("/butterflies")
      .send(minimalData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", minimalData.name);
    expect(response.body).toHaveProperty("longDescription", minimalData.longDescription);
  });
});

//DELETE
describe("DELETE/butterflies", () => {
  let response;
  let createdButterfly;

  beforeEach(async () => {
    createdButterfly = await ButterflyModel.create({
      name: "test",
      longDescription: "test",
    });

    response = await request(app)
      .delete(`/butterflies/${createdButterfly.id}`)
      .send();
  });

  test('should return a response with status 200 and type json', async () => {
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('json');
  });

  test('should return a message butterfly deleted successfully and delete the butterfly',
    async () => {
      expect(response.body.message).toContain("Mariposa eliminada correctamente");
      const foundButterfly = await ButterflyModel.findOne({
        where: { id: createdButterfly.id }
      });
      expect(foundButterfly).toBeNull();
    });
});