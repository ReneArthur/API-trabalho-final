const alocacaoRepository = require('../repository/alocacao_repository_db')

async function listar() {
    return await alocacaoRepository.listar();
}

async function inserir(alocacao) {
    if(alocacao && alocacao.local && alocacao.idProduto && 
        alocacao.quantidade) {
            
        const produto = await alocacaoRepository.inserir(alocacao);
        
    }
    else {
        throw { id: 400, msg: "Alocação sem dados corretos"}
    }
}

async function buscarPorId(id) {
    let alocacao = await alocacaoRepository.buscarPorId(id);
    if(alocacao) {
        return alocacao;
    }
    else {
        throw { id: 404, msg: "Alocação não encontrada!" }
    }
}

async function buscarPorIdProduto(produtoId) {
    let alocacao = await alocacaoRepository.buscarPorIdProduto(produtoId);
    if(alocacao) {
        return alocacao;
    } else {
        throw {id: 404, msg: "produto não encontrado nas alocações"}
    }
}

async function atualizar(id, alocacao) {
    if(alocacao && alocacao.local && alocacao.idProduto && 
        alocacao.quantidade) {
        
        const alocacaoAtualizado = await alocacaoRepository.atualizar(id, alocacao);
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

async function deletar(id) {
    let alocacao = await alocacaoRepository.deletar(id);
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