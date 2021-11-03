const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const formatosAceitos = require('./Serializador').formatosAceitos

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
    let formatoRequisitado = requisicao.header('Accept')

    if(formatoRequisitado === '*/*'){
        formatoRequisitado = 'application/json'
    }

    if(formatosAceitos.indexOf(formatoRequisitado) === -1){
        resposta.status(406)
        resposta.end()
    }else{
        resposta.setHeader('Content-Type', formatoRequisitado)
        proximo()
    }
})

const roteador = require('./rotas/fornecedores')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use('/api/fornecedores', roteador)

app.use((err, requisicao, resposta, proximo) => {
    let status = 500
    
    if(err instanceof NaoEncontrado){
        status = 404
    }else if(err instanceof CampoInvalido || err instanceof DadosNaoFornecidos){
        status = 400
    }else if(err instanceof ValorNaoSuportado){
        status = 406
    } 

    resposta.status(status)
    resposta.send(JSON.stringify({
        mensagem: err.message,
        id: err.idErro
    }))
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))