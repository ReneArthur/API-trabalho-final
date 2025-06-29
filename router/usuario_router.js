const express = require('express')
const usuarioController = require('../controller/usuario_controller.js')
const SuperUsuarioMiddleware = require('../middleware/super_usuario_middleware.js')

const router = express.Router()

router.get('/', usuarioController.listar)

router.post('/', SuperUsuarioMiddleware.verificarCriacaoUsuario, usuarioController.inserir)

router.get('/:email', usuarioController.buscarPorEmail)

router.put('/:id', SuperUsuarioMiddleware.verificarCriacaoUsuario, usuarioController.atualizar)

router.delete('/:id', SuperUsuarioMiddleware.verificarExclusaoUsuario, usuarioController.deletar)

module.exports = router