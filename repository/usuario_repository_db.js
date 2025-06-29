const db = require("../config/database")

async function listar() {
    const { rows } = await db.query("select id, email, senha, superuser from usuario");
    return rows
}

async function buscarPorEmail(email) {
    
    const result = await db.query("select id, email, senha, superuser from usuario where email=$1", [email]);

    return result.rows[0]
}

async function buscarPorId(id) {

    const result = await db.query("select email, senha, superuser from usuario where id=$1", [id])
    
    return result.rows[0]
}

async function inserir(usuario) {
    if(!usuario || !usuario.email || !usuario.senha || usuario.superuser === undefined) {
        return;
    }
    
    const result = await db.query("insert into usuario (email, senha, superuser) values ($1, $2, $3) returning *", [usuario.email, usuario.senha, usuario.superuser])
    
    return result.rows[0]
}

async function verificarLogin(usuario) {
    usuarioBanco = await buscarPorEmail(usuario.email)
    if(usuarioBanco && usuarioBanco.senha === usuario.senha) {
        return usuario
    } 
    return
}

async function atualizar(id, usuarioAtual) {
    if(!usuarioAtual || !usuarioAtual.email || !usuarioAtual.senha) {
            return;
    }

    const result = await db.query("update usuario set email=$1, senha=$2, superuser=$3 where id=$4 returning *",[usuarioAtual.email, usuarioAtual.senha, usuarioAtual.superuser, id])

    return result.rows[0]
}

async function deletar(id) {
    const result = await db.query("delete from usuario where id=$1 returning *", [id])

    return result.rows[0]
}

module.exports = {
    listar,
    verificarLogin,
    inserir,
    buscarPorEmail,
    atualizar,
    deletar,
    buscarPorId
}