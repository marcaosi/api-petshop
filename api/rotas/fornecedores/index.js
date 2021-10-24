const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require("./Fornecedor")

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body

    const fornecedor = new Fornecedor(dadosRecebidos)

    await fornecedor.criar()

    resposta.send(JSON.stringify(fornecedor))
})

roteador.get('/:idFornecedor', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id })

        await fornecedor.carregar()

        resposta.send(JSON.stringify(fornecedor))
    }catch(err){
        resposta.send(JSON.stringify({
            mensagem: err.message
        }))
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta) => {
    try{
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id })

        const fornecedor = new Fornecedor(dados)

        await fornecedor.atualizar()

        resposta.end()
    }catch(err){
        resposta.send(JSON.stringify({
            mensagem: err.message
        }))
    }
})

module.exports = roteador