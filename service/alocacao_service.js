const alocacaoRepository = require('../repository/alocacao_repository')
const produtoRepository = require('../repository/produto_repository')

function listar() {
    return alocacaoRepository.listar();
}

function inserir(alocacao) {
    if(alocacao && alocacao.local && alocacao.idProduto && 
        alocacao.quantidade) {
            
            const produto = produtoRepository.buscarPorId(alocacao.idProduto)
            if(produto) {
                return alocacaoRepository.inserir(alocacao);
            } else {
                throw {id: 400, msg: "Id do produto não existe"}
            }
    }
    else {
        throw { id: 400, msg: "Alocação sem dados corretos"}
    }
}

function buscarPorId(id) {
    let alocacao = alocacaoRepository.buscarPorId(id);
    if(alocacao) {
        return alocacao;
    }
    else {
        throw { id: 404, msg: "Alocação não encontrada!" }
    }
}

function buscarPorIdProduto(produtoId) {
    let alocacao = alocacaoRepository.buscarPorIdProduto(produtoId);
    if(alocacao) {
        return alocacao;
    } else {
        throw {id: 404, msg: "produto não encontrado nas alocações"}
    }
}

function atualizar(id, alocacao) {
    if(alocacao && alocacao.local && alocacao.idProduto && 
        alocacao.quantidade) {
        
        produto = produtoRepository.buscarPorId(alocacao.idProduto)
        if(!produto) {
            throw {id:400, msg: "Id do produto não existe"};
        }
        
        const alocacaoAtualizado = alocacaoRepository.atualizar(id, alocacao);
        if(alocacaoAtualizado) {
            return alocacaoAtualizado;
        }        
        else {
            throw {id:404, msg: "Alocacção não encontrada"};
        }
    }
    else {
        throw {id:400, msg: "Alocação sem dados corretos"};
    }
}

function deletar(id) {
    let alocacao = alocacaoRepository.deletar(id);
    if(alocacao) {
        return alocacao;
    }
    else {
        throw { id: 404, msg: "Alocação não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorIdProduto,
    atualizar,
    deletar
}