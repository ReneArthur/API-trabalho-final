const usuarioService = require("../service/usuario_service")

function listar(req, res) {

    const email = req.query ? req.query.email : undefined

    try {

        if(!email) {
            res.json(usuarioService.listar())
        } else {
            res.json(usuarioService.buscarPorEmail(email))
        }
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function inserir(req, res) {
    let usuario = req.body

    try {
        usuarioService.inserir(usuario)
        res.status(201).json(usuario)
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function buscarPorEmail(req, res) {
    const email = req.params.email;
    // TODO: excluir aqui depois que a busca por email estiver inserida no lista()
    try {
        res.json(usuarioService.buscarPorEmail(email))
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function atualizar(req, res) {
    const id = parseInt(req.params.id);
    let usuario = req.body

    try {
        res.json(usuarioService.atualizar(id, usuario))
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function deletar(req, res) {
    const id = parseInt(req.params.id);
    
    try {
        res.json(usuarioService.deletar(id))
    } catch(err) {
        res.status(err.id).json(err)
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorEmail,
    atualizar,
    deletar,
}