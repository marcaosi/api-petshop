const modelos = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto'),
]


async function criarTabelas(){
    modelos.forEach(async modelo => {
        await modelo.sync()
    })
}

criarTabelas()