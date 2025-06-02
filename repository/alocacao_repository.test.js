const alocacaoRepository = require("./alocacao_repository.js");
const produtoRepository = require("./produto_repository.js");

//Cenário de sucesso
test('Quando inserir uma alocação de um produto válido, deve retornar e conter na lista a alocação com id=1'
    , () => {
        const produtoInseridoEsperado = {
            id: 1,
            nome: "Arroz",
            categoria: "alimento",
            preco: 4.00
        };
        const produtoInserido = produtoRepository.inserir({
            nome: "Arroz",
            categoria: "alimento",
            preco: 4.00
        });

        let alocacaoInseridoEsperado = {
            id: 1,
            local: "Garagem1",
            idProduto: 1,
            quantidade: 99,
        };

        const alocacaoInserido = alocacaoRepository.inserir({
            local: "Garagem1",
            idProduto: 1,
            quantidade: 99
        });

        expect(alocacaoInserido).toEqual(alocacaoInseridoEsperado);

        alocacaoInseridoEsperado = {
            ...alocacaoInseridoEsperado,
            produto: produtoInseridoEsperado
        }

        expect(alocacaoRepository.listar()).toContainEqual(alocacaoInseridoEsperado);
    })
//Cenário de exceção
test('Quando inserir uma alocação sem local, não deve retornar e não insere na lista'
    , () => {
        const produtoEsperado = produtoRepository.buscarPorId(1)

        const alocacaoInseridoErrado = {
            id: 2,
            idProduto: 1,
            quantidade: 99,
            produto: produtoEsperado
        };

        const alocacaoInserido = alocacaoRepository.inserir({
            idProduto: 1,
            quantidade: 99,
        });

        expect(alocacaoInserido).toEqual(undefined);

        expect(alocacaoRepository.listar()).not.toContainEqual(alocacaoInseridoErrado);
    })

//Cenário de sucesso - buscarPorId()
test('Quando buscar por um id existente, deve retornar o dado corretamente', () => {
    let alocacaoInserido = alocacaoRepository.inserir({
        local: "Fundos",
        idProduto: 1,
        quantidade: 100
    });
    const produtoEsperado = produtoRepository.buscarPorId(1)
    const resultado = alocacaoRepository.buscarPorId(alocacaoInserido.id);
    
    alocacaoInserido = {...alocacaoInserido, produto: produtoEsperado}
    
    expect(resultado).toBeDefined();
    expect(resultado).toEqual(alocacaoInserido)
});
//Cenário de exceção - buscarPorId()
test('Quando buscar por id inexistente, deve retornar undefined', () => {
    const resultado = alocacaoRepository.buscarPorId(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - deletar()
test('Quando deletar um id existente, deve remover e retornar o dado', () => {
    let alocacaoDeletadoEsperado = {
        id: 1,
        local: "Garagem1",
        idProduto: 1,
        quantidade: 99,
    };

    const quantidadeEsperada = 1;
    resultado = alocacaoRepository.deletar(1);
    expect(resultado).toEqual(alocacaoDeletadoEsperado);
    expect(produtoRepository.listar().length).toBe(quantidadeEsperada);

})
//Cenário de exceção - deletar()
test('Quando deletar um produto com id inexistente, deve retornar undefined', () => {
    const resultado = produtoRepository.deletar(10);
    expect(resultado).toBeUndefined();
});

//Cenário de sucesso - atualizar
test('Quando atualizar uma alocação existente, deve atualizar na lista e retornar produto atualizado', () => {
    //Vou inserir um terceiro produto para o teste (id=3)
    alocacaoRepository.inserir({
        local: "Fundos",
        idProduto: 1,
        quantidade: 55
    });
    let alocacaoAtualizadoEsperado = {
        local: "Garagem1",
        idProduto: 1,
        quantidade: 55,
        id: 3
    };
    resultado = alocacaoRepository.atualizar(3, {         
        local: "Garagem1",
        idProduto: 1,
        quantidade: 55
    });
    expect(resultado).toEqual(alocacaoAtualizadoEsperado);
    //Verificando se o produto foi atualizado no repositório
    
    alocacaoAtualizadoEsperado = {
        ...alocacaoAtualizadoEsperado,
        produto: produtoRepository.buscarPorId(1)
    }
    expect(alocacaoRepository.listar()).toContainEqual(alocacaoAtualizadoEsperado);
})

//Cenário de exceção 1 - atualizar
test('Quando atualizar uma alocação com id inexistente, deve retornar undefined', () => {
    const resultado = alocacaoRepository.atualizar(8, {
        local: "Garagem1",
        idProduto: 1,
        quantidade: 55
    });
    expect(resultado).toBeUndefined();
});

//Cenário de exceção 2 - atualizar
test('Quando atualizar o produto sem local, não deve retornar e não atualiza na lista'
    , () => {
        const alocacaoAtualizadoOriginal = {
            id: 3,
            local: "Garagem1",
            idProduto: 1,
            quantidade: 55,
            produto: produtoRepository.buscarPorId(1)
        };

        const produtoAtualizado = alocacaoRepository.atualizar(3, {
            idProduto: 1,
            quantidade: 59
        });

        expect(produtoAtualizado).toEqual(undefined);
        
        //aqui achei melhor não usar o not, para além dele verificar se ainda possui
        //o local, também verificar se a quantidade que foi editada, não mudou na lista.
        expect(alocacaoRepository.listar()).toContainEqual(alocacaoAtualizadoOriginal);
    })

//Cenário de exceção 3 - atualizar
test('Quando atualizar a alocação com um produto não existe, não deve atualizar'
    , () => {
        const alocacaoAtualizadoOriginal = {
            id: 3,
            local: "Garagem1",
            idProduto: 1,
            quantidade: 55,
            produto: produtoRepository.buscarPorId(1)
        };

        const produtoAtualizado = alocacaoRepository.atualizar(3, {
            local: "Garagem1",
            idProduto: 5, // produto inexistente
            quantidade: 59
        });

        expect(produtoAtualizado).toEqual(undefined);
        
        expect(alocacaoRepository.listar()).toContainEqual(alocacaoAtualizadoOriginal);
    })

//Cenário de sucesso - pesquisarPorProduto
test('Quando buscar pela id do produto, deve retornar pelo menos um produto', () => {
    const resultado = alocacaoRepository.buscarPorIdProduto(1);

    expect(resultado.length).toBeGreaterThan(0);

    expect(resultado[0].local).toBe("Fundos");
});
