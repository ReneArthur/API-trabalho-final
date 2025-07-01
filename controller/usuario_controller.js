const usuarioService = require("../service/usuario_service")

async function listar(req, res) {

    const email = req.query ? req.query.email : undefined

    try {
        if(!email) {
            res.json(await usuarioService.listar())
        } else {
            res.json(await usuarioService.buscarPorEmail(email))
        }
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function inserir(req, res) {
    let usuario = req.body
    try {
        const usuarioAdicionado = await usuarioService.inserir(usuario)
        res.status(201).json(usuarioAdicionado)
    } catch(err) {
        if(err.id) {
            res.status(err.id).json(err)
        } else if(err.code && err.code === "23505" && err.constraint === "usuario_email_key") {
            res.status(409).json({id: 409, msg: "Email já está sendo utilizado"})
        } else {
            res.status(500).json(err)
        }
    }
    
}

async function buscarPorEmail(req, res) {
    const email = req.params.email;
    
    try {
        res.json(await usuarioService.buscarPorEmail(email))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function atualizar(req, res) {
    const id = parseInt(req.params.id);
    let usuario = req.body

    try {
        res.json(await usuarioService.atualizar(id, usuario))
    } catch(err) {
        if(err.id) {
            res.status(err.id).json(err)
        } else if(err.code && err.code === "23505" && err.constraint === "usuario_email_key") {
            res.status(409).json({id: 409, msg: "Email já está sendo utilizado"})
        } else {
            res.status(500).json(err)
        }
    }
}

async function deletar(req, res) {
    const id = parseInt(req.params.id);
    
    try {
        res.json(await usuarioService.deletar(id))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorEmail,
    atualizar,
    deletar,
}