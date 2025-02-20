const express = require ("express");
//const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.get('/',(req,res) => {
    res.send('Hello Word!!');
})

    app.get('/calculadora',(req,res) =>{
        const { num1,num2, operacao} = req.query;

        //Conveter parâmetros para calcular
        const number1 = parseFloat (num1);
        const number2 = parseFloat (num2);

        //verifica se os parâmetros são números válidos
        if(isNaN(number1) || isNaN(number2)){
            //throw new Error ('parâmetros inválidos!');
            return res.status(400).json({ erro : "numero1 e numero2 devem ser convertidos corretamente"});
        }

        let result;

        switch (operacao) {
            case 'soma':
                result = number1 + number2;                
                break;

            case 'subtracao':
                result = number1 - number2;
                break;
            
            case 'multiplicacao':
                result = number1 * number2;
                break;
            case 'divisao':
                if (number2 === 0) {
                    return res.status(400).json({erro: "Divisão por zero não é permitido !!"});
                }
                result = number1 / number2;
                break;
        
            default:
                return res.status(400).json({erro: "Operação inválida!!"});
                
        }
        res.json({result});



    });

    app.get('/primo',(req,res)=>{

        const{number} = req.query;

        const num = parseFloat (number);

        if (isNaN(num)) {
            return res.status(400).json({erro:"numero deve ser convertido corretamente"});
            
        }
        function isPrimo(num) {
            if (num < 2) {
                return { isPrime: false, message: "O número não é primo" };
            }
            if (num === 2) {
                return { isPrime: true, message: "O número é primo" };
            }
            if (num % 2 === 0) {
                return { isPrime: false, message: "O número não é primo" };
            }
    
            const sqrt = Math.sqrt(num);
            for (let i = 3; i <= sqrt; i += 2) {
                if (num % i === 0) {
                    return { isPrime: false, message: "O número não é primo" };
                }
            }
    
            return { isPrime: true, message: "O número é primo" };
        }
    
        const result = isPrimo(num);
        res.json(result);
    });
    
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
    
    // Tratamento de erros globais
    process.on('uncaughtException', (err) => {
        console.error("Erro não tratado:", err);
    });
    
    process.on("unhandledRejection", (err) => {
        console.error("Rejeição não tratada:", err);
    });
       
