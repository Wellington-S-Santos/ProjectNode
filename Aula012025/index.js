const express = require("express");

const app = express();
const port = 3000;


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!!"); 
});

app.get("/calculadora", (req, res) => {
  const { num1, num2, operacao } = req.query;

  // Converter para número
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);

  if (isNaN(number1) || isNaN(number2)) {
    return res.status(400).json({ erro: "num1 ou num2 devem ser números válidos!" });
  }

  let result;
  switch (operacao) {
    case "soma":
      result = number1 + number2;
      break;
    case "subtracao":
      result = number1 - number2;
      break;
    case "multiplicacao":
      result = number1 * number2;
      break;
    case "divisao":
      if (number2 === 0) {
        return res.status(400).json({ erro: "Divisão por zero não é permitida!" });
      }
      result = number1 / number2;
      break;
    default:
      return res.status(400).json({ erro: "Operação inválida!" });
  }

  res.json({ result });
});

// Rota para verificar números primos
app.get("/primo", (req, res) => {
  const { number } = req.query;
  const num = parseFloat(number);

  if (isNaN(num)) {
    return res.status(400).json({ erro: "O parâmetro deve ser um número válido!" });
  }

  function isPrimo(num) {
    if (num < 2) return { isPrime: false, message: "O número não é primo" };
    if (num === 2) return { isPrime: true, message: "O número é primo" };
    if (num % 2 === 0) return { isPrime: false, message: "O número não é primo" };

    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
      if (num % i === 0) return { isPrime: false, message: "O número não é primo" };
    }

    return { isPrime: true, message: "O número é primo" };
  }

  res.json(isPrimo(num));
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Tratamento de erros globais
process.on("uncaughtException", (err) => {
  console.error("Erro não tratado:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Rejeição não tratada:", err);
});

module.exports = app;
