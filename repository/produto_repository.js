let listaProdutos = [];
let autoIncrement = 1;

function listar() {
    return listaProdutos;
}

function buscarPorId(id) {
    /*for(let produto of listaProdutos){
        if(produto.id == id) {
            return produto;
        }
    }*/
    return (listaProdutos.find(
        function(produto) {
            return (produto.id === id);        
        }
    ));
}

function inserir(produto) {
    if(!produto || !produto.nome || !produto.categoria 
        || !produto.preco) {
            return;
    }

    produto.id = autoIncrement++;
    listaProdutos.push(produto);
    return produto;
}

function buscarIndicePorId(id) {
    return listaProdutos.findIndex((produto) => produto.id === id);
}

function atualizar(id, produtoAtual) {
    if(!produtoAtual || !produtoAtual.nome || !produtoAtual.categoria 
        || !produtoAtual.preco) {
            return;
    }

    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        produtoAtual.id = id; 
        listaProdutos[indice] = produtoAtual;
        return listaProdutos[indice];
    }
}

function deletar(id) {
    let indiceProduto = buscarIndicePorId(id);    
    if(indiceProduto >= 0) {
        return listaProdutos.splice(indiceProduto, 1)[0];
    }
}

function pesquisarPorCategoria(categoria) {
    return listaProdutos.filter( (produto) => produto.categoria == categoria )
}

function pesquisarPorNomeLike(nome) {
    return listaProdutos.filter ( (produto) => {
        const produtoNomeUpper = produto.nome.toUpperCase();
        const nomeUpper = nome.toUpperCase();
        return (produtoNomeUpper.search(nomeUpper) >= 0);
    })
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorCategoria,
    pesquisarPorNomeLike,
}