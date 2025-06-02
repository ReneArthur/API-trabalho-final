const usuarioRepository = require('../repository/usuario_repository')
const tokenService = require('./token_service')
const bcrypt = require('bcrypt')

function encriptografar(senha) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    return hash
}

function listar() {
    return usuarioRepository.listar();
}

function inserir(usuario) {
    if(usuario && usuario.email  
        && usuario.senha){
            usuario.senha = encriptografar(usuario.senha)
            return usuarioRepository.inserir(usuario);
    }
    else {
        throw { id: 400, msg: "Usuario sem dados corretos"}
    }
}

function buscarPorEmail(email) {
    let usuario = usuarioRepository.buscarPorEmail(email);
    if(usuario) {
        return usuario;
    }
    else {
        throw { id: 404, msg: "Usuário não encontrado!" }
    }
}

function verificarLogin(user) {
    if(user.email) {
        let usuarioCadastrado = usuarioRepository.buscarPorEmail(user.email);
        if(usuarioCadastrado && user.senha && bcrypt.compareSync(user.senha, usuarioCadastrado.senha)) {
            token = tokenService.criarToken({id: usuarioCadastrado.id})
            return {token}
        } else {
            throw {id: 401, msg: "Email ou senha inválidos"}
        }
    }
}

function atualizar(id, usuario) {
    if(usuario && usuario.email && usuario.senha) {
        usuario.senha = encriptografar(usuario.senha)
        const usuarioAtualizado = usuarioRepository.atualizar(id, usuario);
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

function deletar(id) {
    let usuario = usuarioRepository.deletar(id);
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
    verificarLogin
}