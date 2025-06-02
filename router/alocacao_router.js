const express = require('express')
const alocacaoController = require('../controller/alocacao_controller.js')

const router = express.Router()

router.get('/', alocacaoController.listar)

router.post('/', alocacaoController.inserir)

router.get('/:id', alocacaoController.buscarPorId)

router.get('/produto/:idProduto', alocacaoController.buscarPorIdProduto)

router.put('/:id', alocacaoController.atualizar)

router.delete('/:id', alocacaoController.deletar)

module.exports = router