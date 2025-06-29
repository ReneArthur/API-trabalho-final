
let listaUsuarios = [{
    id: 1,
    email: "email@email.com",
    senha: "$2b$10$f.V2O8sGtryhEBN9iJ2RS.FrliWv1NCftZVnzzKw8EBsRd.1iWqRu",
    //senha: "senha123456"
    superuser: true
}];
let autoIncrement = 2;

function listar() {
    // retirado o hash da senha pro usuário, porém, coloquei o console.log apenas 
    // para a demonstração do hash funcionando para o trabalho
    console.log(listaUsuarios)
    return listaUsuarios.map(user => ({id: user.id, email: user.email, superuser: user.superuser}));
}

function buscarPorEmail(email) {
    return (listaUsuarios.find(
        function(usuario) {
            return (usuario.email === email);        
        }
    ));
}

function buscarPorId(id) {
    return (listaUsuarios.find(
        function(usuario) {
            return (usuario.id === id);        
        }
    ));
}

function inserir(usuario) {
    if(!usuario || !usuario.email || !usuario.senha || usuario.superuser === undefined) {
            return;
    }

    usuario.id = autoIncrement++;
    const usuarioPadrao = {...usuario, superuser: usuario.superuser}
    listaUsuarios.push(usuarioPadrao);
    return usuario;
}

function verificarLogin(usuario) {
    usuarioBanco = buscarPorEmail(usuario.email)
    if(usuarioBanco && usuarioBanco.senha === usuario.senha) {
        return usuario
    } 
    return
}

function buscarIndicePorId(id) {
    return listaUsuarios.findIndex((usuario) => usuario.id === id);
}

function atualizar(id, usuarioAtual) {
    if(!usuarioAtual || !usuarioAtual.email || !usuarioAtual.senha) {
            return;
    }

    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        usuarioAtual.id = id; 
        listaUsuarios[indice] = usuarioAtual;
        return listaUsuarios[indice];
    }
}

function deletar(id) {
    let indiceUsuario = buscarIndicePorId(id);    
    if(indiceUsuario >= 0) {
        return listaUsuarios.splice(indiceUsuario, 1)[0];
    }
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