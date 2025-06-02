const express = require('express')
const produtoController = require('../controller/produto_controller.js')

const router = express.Router()

router.get('/', produtoController.listar)

router.post('/', produtoController.inserir)

router.get('/:id', produtoController.buscarPorId)

router.put('/:id', produtoController.atualizar)

router.delete('/:id', produtoController.deletar)

module.exports = router