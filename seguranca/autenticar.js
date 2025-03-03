//a função terá 3 parametros
//requisição, resposta, next (prosseguir)
//os parametros são fornecidos automaticamente pelo express
export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.autenticado === true){
        next();
    } else {
        resposta.redirect('/login');    
        }
    }

