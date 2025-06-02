const jwt = require("jsonwebtoken")

const PALAVRA_SECRETA = "Sen@c2025"

//payload -> JSON referente aos dados que quer passar
function criarToken(payload) {
    const token = jwt.sign(payload, PALAVRA_SECRETA, { expiresIn: '1h' })  
    return token 
}

function validarToken(token) {
    try{
        const data = jwt.verify(token, PALAVRA_SECRETA);
        return data;
    } catch (err) {
        throw err;
    }

}

module.exports = {
    criarToken,
    validarToken
}