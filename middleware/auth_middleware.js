const tokenService = require("../service/token_service")
const usuarioService = require("../service/usuario_service")

async function verificarAcesso(req, res, next) {
    const token = req.get('token');
    if(!token) {
        res.status(401).json({id: 401, msg: "Acesso inválido!"})
    }
    try {
        const data = tokenService.validarToken(token)

        const usuario = await usuarioService.buscarPorId(data.id)
        if(usuario) {
            console.log(usuario)
            //passando o id do usuário para o resto dos endpoints
            res.locals.userId = data.id
            next()
        } else {
            console.log("erro")
            res.status(401).json({id:401, msg: "Usuário de acesso não existe"})
        }
    } catch (err) {
        res.status(401).json({id: 401, msg: "Acesso inválido!"})
    }
}

module.exports = {
    verificarAcesso
}