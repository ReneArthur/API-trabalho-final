const tokenService = require("../service/token_service")

function verificarAcesso(req, res, next) {
    const token = req.get('token');
    if(!token) {
        res.status(401).json({id: 401, msg: "Acesso inválido!"})
    }
    try {
        const data = tokenService.validarToken(token)
        next()
    } catch (err) {
        res.status(401).json({id: 401, msg: "Acesso inválido!"})
    }
}

module.exports = {
    verificarAcesso
}