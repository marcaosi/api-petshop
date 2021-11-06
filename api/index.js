const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErro = require('./Serializador').SerializadorErro
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const roteador = require('./rotas/fornecedores')

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

app.use((requisicao, resposta, proximo) => {
    resposta.set('Access-Control-Allow-Origin', '*')
    proximo()
})

app.use('/api/fornecedores', roteador)

const roteadorv2 = require('./rotas/fornecedores/rotas.v2')
app.use('/api/v2/fornecedores', roteadorv2)

app.use((err, requisicao, resposta, proximo) => {
    let status = 500
    
    if(err instanceof NaoEncontrado){
        status = 404
    }else if(err instanceof CampoInvalido || err instanceof DadosNaoFornecidos){
        status = 400
    }else if(err instanceof ValorNaoSuportado){
        status = 406
    } 

    const serializador = new SerializadorErro(
        resposta.getHeader('Content-Type'), []
    )

    resposta.status(status)
    resposta.send(
        serializador.serializar({
            mensagem: err.message,
            id: err.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))