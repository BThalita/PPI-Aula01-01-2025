import express from "express";
import autenticar from "./seguranca/autenticar.js";

const porta = 3000;
const localhost = "0.0.0.0"; //define que o nosso aplicativo estará disponível em todas as interfaces de redes deste computador

const app = express();

//prepara o servidor para disponibilizar recursos estáticos
app.use(express.static("./publico"));

//disponibilizando os arquivos da pasta privada
//a função autenticar se comporta como um middleware, aquilo que atua na camada do meio
app.use(autenticar, express.static("./privado"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});