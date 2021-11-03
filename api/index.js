const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())

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