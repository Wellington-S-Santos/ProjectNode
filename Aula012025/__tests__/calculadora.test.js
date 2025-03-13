const request = require("supertest");
const app = require("../index.js");

describe("Testes da API da Calculadora", () => {
  it('Deve retornar "Hello World!!" para a rota raiz', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World!!"); // Corrigido erro de digitação
  });

  it("Deve realizar uma soma corretamente", async () => {
    const response = await request(app)
      .get("/calculadora")
      .query({ num1: 5, num2: 3, operacao: "soma" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 8 });
  });

  it("Deve realizar uma subtração corretamente", async () => {
    const response = await request(app)
      .get("/calculadora")
      .query({ num1: 10, num2: 4, operacao: "subtracao" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 6 });
  });

  it("Deve realizar uma multiplicação corretamente", async () => {
    const response = await request(app)
      .get("/calculadora")
      .query({ num1: 4, num2: 5, operacao: "multiplicacao" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 20 }); // Corrigido para .toEqual()
  });

  it("Deve realizar uma divisão corretamente", async () => {
    const response = await request(app)
      .get("/calculadora")
      .query({ num1: 20, num2: 5, operacao: "divisao" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ result: 4 });
  });

  it("Deve retornar erro para operação inválida", async () => {
    const response = await request(app)
      .get("/calculadora")
      .query({ num1: 5, num2: 3, operacao: "xyz" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: "Operação inválida!" });
  });

  it("Deve retornar erro para converção dos numeros",async () => {
    const response =await request(app)
    .get("/calculadora")
    .query({num1: 10, num2: "aed", operacao: "divisao"});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({erro :"num1 ou num2 devem ser números válidos!"});
  });

  it("Deve retornar erro ao tentar dividir por zero", async () => {
    const response = await request(app)
      .get("/calculadora")
      .query({ num1: 10, num2: 0, operacao: "divisao" });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ erro: "Divisão por zero não é permitida!" });
  });

});
