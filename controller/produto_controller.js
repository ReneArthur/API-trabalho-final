const produtoService = require("../service/produto_service")

async function listar(req, res) {
    res.json(await produtoService.listar())
}

async function inserir(req, res) {
    let produto = req.body

    try {
        res.status(201).json(await produtoService.inserir(produto))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function buscarPorId(req, res) {
    const id = parseInt(req.params.id);

    try {
        res.json(await produtoService.buscarPorId(id))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function atualizar(req, res) {
    const id = parseInt(req.params.id);
    let produto = req.body

    try {
        res.json(await produtoService.atualizar(id, produto))
    } catch(err) {
        res.status(err.id || 500).json(err)
    }
}

async function deletar(req, res) {
    const id = parseInt(req.params.id);
    
    try {
        res.json(await produtoService.deletar(id))
    } catch(err) {
        if(err.id) {
            res.status(err.id).json(err)
        } else if(err.code && err.code === "23503" && err.constraint === "alocacao_idProduto_fkey") {
            res.status(409).json({id: 409, msg: "Produto não pode ser excluído por estar alocado, exclua primeiro da alocação"})
        } else {
            res.status(500).json(err)
        }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
}