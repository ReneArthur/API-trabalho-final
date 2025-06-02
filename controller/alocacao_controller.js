const alocacaoService = require("../service/alocacao_service")

function listar(req, res) {
    res.json(alocacaoService.listar())
}

function inserir(req, res) {
    let produto = req.body
    try {
        alocacaoService.inserir(produto)
        res.status(201).json(produto)
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function buscarPorId(req, res) {
    const id = parseInt(req.params.id);

    try {
        res.json(alocacaoService.buscarPorId(id))
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function buscarPorIdProduto(req, res) {
    const idProduto = parseInt(req.params.idProduto);

    try {
        res.json(alocacaoService.buscarPorIdProduto(idProduto))
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function atualizar(req, res) {
    const id = parseInt(req.params.id);
    let produto = req.body

    try {
        res.json(alocacaoService.atualizar(id, produto))
    } catch(err) {
        res.status(err.id).json(err)
    }
}

function deletar(req, res) {
    const id = parseInt(req.params.id);
    
    try {
        res.json(alocacaoService.deletar(id))
    } catch(err) {
        res.status(err.id).json(err)
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