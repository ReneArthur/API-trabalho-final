const express = require('express')
const produtoRouter = require('./router/produto_router')
const usuarioRouter = require('./router/usuario_router')
const alocacaoRouter = require('./router/alocacao_router')
const loginController = require('./controller/login_controller')
const authMiddleware = require('./middleware/auth_middleware')
const erroMiddleware = require('./middleware/erro_middleware')

const app = express()

app.use(express.json())

app.use(erroMiddleware.tratarErro)

app.get('/', (req, res) => {
    res.send("<h1>App funcionando!</h1>")
})

app.post('/login', loginController.realizarLogin);

app.use(authMiddleware.verificarAcesso)

app.use('/produtos', produtoRouter)
app.use('/usuarios', usuarioRouter)
app.use('/alocacao', alocacaoRouter)

app.listen(3000, () => {
    console.log("Servidor iniciado com sucesso!")
})

module.exports = { app }