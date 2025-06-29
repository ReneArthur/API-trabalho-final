const tokenService = require("../service/token_service")
const usuarioService = require("../service/usuario_service")

async function tratarErro(req, res, next) {
    try {
        await next()
    } catch (err) {
        if(err.id && err.msg) {
            console.log("erro trataaa")
            res.status(err.id).json({id: err.id, msg: err.msg})
        }
    }
}

module.exports = {
    tratarErro
}