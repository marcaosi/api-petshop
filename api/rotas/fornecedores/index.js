const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require("./Fornecedor")
const SerializadorFornecedor = require('../../Serializador').SerializadorFornecedor


roteador.get('/', async (requisicao, resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.status(200)

    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serializar(resultados)
    )
})

roteador.post('/', async (requisicao, resposta, proximo) => {
    try{
        const dadosRecebidos = requisicao.body

        const fornecedor = new Fornecedor(dadosRecebidos)

        await fornecedor.criar()

        resposta.status(201)

        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    }catch(err){
        proximo(err)
    }
})

roteador.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id })

        await fornecedor.carregar()

        resposta.status(200)
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serializar(fornecedor)
        )
    }catch(err){
        proximo(err)
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id })

        const fornecedor = new Fornecedor(dados)

        await fornecedor.atualizar()

        resposta.status(204)
        resposta.end()
    }catch(err){
        proximo(err)
    }
})

roteador.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id })

        await fornecedor.carregar()
        await fornecedor.remover()

        resposta.status(204)
        resposta.end()
    }catch(err){
        proximo(err)
    }
})

module.exports = roteador