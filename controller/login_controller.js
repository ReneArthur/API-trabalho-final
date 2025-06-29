const usuarioService = require("../service/usuario_service")

async function realizarLogin(req, res) {
    let usuario = req.body
    try {
        let mensagem = await usuarioService.verificarLogin(usuario);
        res.status(200).json(mensagem)
    } catch(err) {
        res.status(err.id).json(err);
    }
}

module.exports = {
    realizarLogin
}