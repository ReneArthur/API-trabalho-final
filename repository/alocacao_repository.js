const produtoRepository = require("./produto_repository")

let listaAlocacao = [];
let autoIncrement = 1;

function listar() {
    return listaAlocacao.map(alocacao => 
        ({...alocacao, produto: produtoRepository.buscarPorId(alocacao.idProduto)})
    );
}

function buscarPorId(id) {
    const alocacao = listaAlocacao.find(
        function(alocacao) {
            return (alocacao.id === id);        
        }
    );
    if(alocacao) {
        return {...alocacao, produto: produtoRepository.buscarPorId(alocacao.idProduto)}
    }
}

function buscarPorIdProduto(idProduto) {
    return listaAlocacao.map((alocacao) => {
        if(alocacao.idProduto === idProduto) {
            return {
                ...alocacao,
                produto: produtoRepository.buscarPorId(alocacao.idProduto)
            }
        }        
    });
}

function inserir(alocacao) {
    if(!alocacao || !alocacao.local || !alocacao.idProduto || 
        !alocacao.quantidade) {
            return;
    }

    alocacao.id = autoIncrement++;
    listaAlocacao.push(alocacao);
    return alocacao;
}

function buscarIndicePorId(id) {
    return listaAlocacao.findIndex((alocacao) => alocacao.id === id);
}

function atualizar(id, alocacaoAtual) {
    if(!alocacaoAtual || !alocacaoAtual.local || !alocacaoAtual.idProduto || 
        !alocacaoAtual.quantidade) {
            return;
    }
    
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        alocacaoAtual.id = id; 
        listaAlocacao[indice] = alocacaoAtual;
        return listaAlocacao[indice];
    }
}

function deletar(id) {
    let indiceAlocacao = buscarIndicePorId(id);    
    if(indiceAlocacao >= 0) {
        return listaAlocacao.splice(indiceAlocacao, 1)[0];
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