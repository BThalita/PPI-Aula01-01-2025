import express from "express";
import autenticar from "./seguranca/autenticar.js";
import session from "express-session";

const porta = 3000;
const localhost = "0.0.0.0"; //define que o nosso aplicativo estará disponível em todas as interfaces de redes deste computador

const app = express();

app.use(session({
    secret: "m1Nh4Ch4v3S3cR3t4",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 *15
    }
}))
//oferecer recurso login
app.get("/login", (requisicao, resposta) =>{
    resposta.redirect('/login.html');
})

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario === "admin" && senha === "admin"){
        requisicao.session.autenticado = true;
        resposta.redirect('/menu.html');
    } else {
        resposta.redirect('/login.html');
    }
})
//prepara o servidor para disponibilizar recursos estáticos
app.use(express.static("./publico"));

//disponibilizando os arquivos da pasta privada
//a função autenticar se comporta como um middleware, aquilo que atua na camada do meio
app.use(autenticar, express.static("./privado"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});