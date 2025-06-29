const alocacaoService = require("../service/alocacao_service")

async function listar(req, res) {
    res.json(await alocacaoService.listar())
}

async function inserir(req, res) {
    let produto = req.body
    try {
        await alocacaoService.inserir(produto)
        res.status(201).json(produto)
    } catch(err) {
        if(err.id) {
            res.status(err.id).json(err)
        } else if(err.code && err.code === "23503" && err.constraint === "alocacao_idProduto_fkey") {
            res.status(409).json({id: 409, msg: "Produto não existe"})
        } else {
            res.status(500).json(err)
        }
    }
}

async function buscarPorId(req, res) {
    const id = await parseInt(req.params.id);

    try {
        res.json(await alocacaoService.buscarPorId(id))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function buscarPorIdProduto(req, res) {
    const idProduto = parseInt(req.params.idProduto);

    try {
        res.json(await alocacaoService.buscarPorIdProduto(idProduto))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function atualizar(req, res) {
    const id = parseInt(req.params.id);
    let produto = req.body

    try {
        res.json(await alocacaoService.atualizar(id, produto))
    } catch(err) {
        if(err.id) {
            res.status(err.id).json(err)
        } else if(err.code && err.code === "23503" && err.constraint === "alocacao_idProduto_fkey") {
            res.status(409).json({id: 409, msg: "Produto não existe"})
        } else {
            res.status(500).json(err)
        }
    }
}

async function deletar(req, res) {
    const id = parseInt(req.params.id);
    
    try {
        res.json(await alocacaoService.deletar(id))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorIdProduto,
    atualizar,
    deletar,
}