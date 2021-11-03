class DadosNaoFornecidos extends Error{
    constructor(campo){
        const mensagem = `Não foram fornecidos dados para atualizar!`

        super(mensagem)
        this.name = 'DadosNaoFornecidos'
        this.idErro = 2
    }
}

module.exports = DadosNaoFornecidos