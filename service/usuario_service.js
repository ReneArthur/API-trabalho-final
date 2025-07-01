const usuarioRepository = require('../repository/usuario_repository_db')
const tokenService = require('./token_service')
const bcrypt = require('bcrypt')

function encriptografar(senha) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    return hash
}

async function listar() {
    return await usuarioRepository.listar();
}

async function inserir(usuario) {
    if(usuario && usuario.email  
        && usuario.senha && usuario.superuser !== undefined){
            usuario.senha = encriptografar(usuario.senha)
            return await usuarioRepository.inserir(usuario);
    }

    else {
        throw { id: 400, msg: "Usuario sem dados corretos"}
    }
}

async function buscarPorId(id) {
    let usuario = await usuarioRepository.buscarPorId(id);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

async function buscarPorEmail(email) {
    let usuario = await usuarioRepository.buscarPorEmail(email);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

async function verificarLogin(user) {
    if(!user?.email || !user?.senha) {
        throw {id: 400, msg: "login deve conter email e senha"}
    }
    
    let usuarioCadastrado = await usuarioRepository.buscarPorEmail(user.email);
    if(usuarioCadastrado && user.senha && bcrypt.compareSync(user.senha, usuarioCadastrado.senha)) {
        token = tokenService.criarToken({id: usuarioCadastrado.id})
        return {token}
    } else {
        throw {id: 401, msg: "Email ou senha inválidos"}
    }
}

async function atualizar(id, usuario) {
    if(usuario && usuario.email && usuario.senha) {
        usuario.senha = encriptografar(usuario.senha)
        const usuarioAtualizado = await usuarioRepository.atualizar(id, usuario);
        if(usuarioAtualizado) {
            return usuarioAtualizado;
        }        
        else {
            throw {id:404, msg: "Usuário não encontrado"};
        }
    }
    else {
        throw {id:400, msg: "Usuário sem dados corretos"};
    }
}

async function deletar(id) {
    let usuario = await usuarioRepository.deletar(id);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}



module.exports = {
    listar,
    inserir,
    buscarPorEmail,
    atualizar,
    deletar,
    verificarLogin,
    buscarPorId
}