const bcrypt = require("bcrypt")

const saltRounds = 10
const senha = "senha123456"
let hashBanco
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(senha, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash)
        hashBanco = hash
    });
});

setTimeout(() => {
    bcrypt.compare(senha, hashBanco, function(err, result) {
        // result == true
        console.log("senha certa")
        console.log(result)
    });
    
    bcrypt.compare("senha errada", hashBanco, function(err, result) {
        // result == true
        console.log("senha errada")
        console.log(result)
    });
}, 500)