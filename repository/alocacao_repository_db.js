const db = require("../config/database")

function alocacoesFormatter(alocacoes) {

    const mapAlocacoes = {}

    for(alocacao of alocacoes) {
        if(mapAlocacoes[alocacao.local]) {
            mapAlocacoes[alocacao.local].produtos.push({
                id: alocacao.idProduto,
                nome: alocacao.nome,
                categoria: alocacao.categoria,
                preco: alocacao.preco,
                quantidade: alocacao.quantidade,
            })
        } else {
            const alocacaoFormatted = {
                id: alocacao.id,
                local: alocacao.local,
                produtos: [
                    {
                        id: alocacao.idProduto,
                        nome: alocacao.nome,
                        categoria: alocacao.categoria,
                        preco: alocacao.preco,
                        quantidade: alocacao.quantidade,
                    }
                ]
            }
            mapAlocacoes[alocacao.local] = alocacaoFormatted
        }
    }

    return Object.values(mapAlocacoes)
}

async function listar() {
    const { rows } = await db.query("select a.id, a.local, a.quantidade, p.id as idProduto, p.nome, p.categoria, p.preco from alocacao a inner join produto p on (p.id = a.id_produto)");

    return alocacoesFormatter(rows)
}

async function buscarPorId(id) {
    const result = await db.query("select a.id, a.local, a.quantidade, p.id as idProduto, p.nome, p.categoria, p.preco from alocacao a inner join produto p on (p.id = a.id_produto) where a.id=$1", [id])
            
    return alocacoesFormatter(result.rows)[0]
}

async function buscarPorIdProduto(idProduto) {
    const result = await db.query("select id, local, quantidade, id_produto from alocacao where id_produto=$1", [idProduto])
            
    return result.rows
}

async function inserir(alocacao) {
    if(!alocacao || !alocacao.local || !alocacao.idProduto || 
        !alocacao.quantidade) {
            return;
    }
    
    const result = await db.query("insert into alocacao (local, quantidade, id_produto) values ($1, $2, $3) returning *", [alocacao.local, alocacao.quantidade, alocacao.idProduto])
        
    return result.rows[0]
}

async function atualizar(id, alocacaoAtual) {
    if(!alocacaoAtual || !alocacaoAtual.local || !alocacaoAtual.idProduto || 
        !alocacaoAtual.quantidade) {
            return;
    }
    
    const result = await db.query("update alocacao set local=$1, quantidade=$2, id_produto=$3 where id=$4 returning *",[alocacaoAtual.local, alocacaoAtual.quantidade, alocacaoAtual.idProduto, id])

    return result.rows[0]
}

async function deletar(id) {
    const result = await db.query("delete from alocacao where id=$1 returning *", [id])
        
    return result.rows[0]
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorIdProduto,
    atualizar,
    deletar,
}