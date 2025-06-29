const usuarioService = require("../service/usuario_service")

async function verificarCriacaoUsuario(req, res, next) {

    const usuarioBody = req.body

    const usuarioLogado = await usuarioService.buscarPorId(res.locals.userId)

    if(usuarioLogado.superuser || !usuarioBody.superuser) {
        next()
    } else {
        res.status(403).json({id: 403, msg: "Você não tem permisão para criar super usuários"})
    }
        
}

async function verificarExclusaoUsuario(_, res, next) {
    const usuarioLogado = await usuarioService.buscarPorId(res.locals.userId)

    if(usuarioLogado.superuser) {
        next()
    } else {
        res.status(403).json({id: 403, msg: "Você não tem permisão para excluir usuários"})
    }
}

module.exports = {
    verificarCriacaoUsuario,
    verificarExclusaoUsuario
}