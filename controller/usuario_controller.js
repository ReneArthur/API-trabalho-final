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
        console.log("body")
        console.log(usuario)
        
        // throw {status: 402, toString: () => "mensagem customizada ebaaa"}
        
        const usuarioAdicionado = await usuarioService.inserir(usuario)
        res.status(201).json(usuarioAdicionado)
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
    
}

async function buscarPorEmail(req, res) {
    const email = req.params.email;
    // TODO: excluir aqui depois que a busca por email estiver inserida no lista()
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
        res.status(err.id || 500).json(err)
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