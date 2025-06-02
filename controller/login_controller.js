const usuarioService = require("../service/usuario_service")

function realizarLogin(req, res) {
    let usuario = req.body
    try {
        let mensagem = usuarioService.verificarLogin(usuario);
        res.status(201).json(mensagem)
    } catch(err) {
        res.status(err.id).json(err);
    }
}

module.exports = {
    realizarLogin
}