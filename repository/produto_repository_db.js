const db = require('../config/database');

async function listar() {
    const { rows } = await db.query("select id, nome, categoria, preco from produto");
    return rows
}

async function buscarPorId(id) {
    const result = await db.query("select nome, categoria, preco from produto where id=$1", [id])
        
    return result.rows[0]
}

async function inserir(produto) {
    if(!produto || !produto.nome || !produto.categoria 
        || !produto.preco) {
            return;
    }

    const result = await db.query("insert into produto (nome, categoria, preco) values ($1, $2, $3) returning *", [produto.nome, produto.categoria, produto.preco])
        
    return result.rows[0]
}

async function atualizar(id, produtoAtual) {
    if(!produtoAtual || !produtoAtual.nome || !produtoAtual.categoria 
        || !produtoAtual.preco) {
            return;
    }

    const result = await db.query("update produto set nome=$1, categoria=$2, preco=$3 where id=$4 returning *",[produtoAtual.nome, produtoAtual.categoria, produtoAtual.preco, id])

    return result.rows[0]
}

async function deletar(id) {
    const result = await db.query("delete from produto where id=$1 returning *", [id])
    
    return result.rows[0]
}

async function pesquisarPorCategoria(categoria) {
    const result = await db.query("select nome, categoria, preco from produto where categoria=$1", [categoria])
        
    return result.rows[0]
}

async function pesquisarPorNomeLike(nome) {
    const result = await db.query("select nome, categoria, preco from produto where nome like '%$1%'", [categoria])
        
    return result.rows[0]
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