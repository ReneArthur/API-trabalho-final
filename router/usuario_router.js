const express = require('express')
const usuarioController = require('../controller/usuario_controller.js')

const router = express.Router()

router.get('/', usuarioController.listar)

router.post('/', usuarioController.inserir)

router.get('/:email', usuarioController.buscarPorEmail)

router.put('/:id', usuarioController.atualizar)

router.delete('/:id', usuarioController.deletar)

module.exports = router