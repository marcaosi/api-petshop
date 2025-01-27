const Modelo = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
    listar () {
        return Modelo.findAll({ raw: true })
    },

    inserir(fornecedor){
        return Modelo.create(fornecedor)
    },

    async pegarPorId(id){
        const encontrado = await Modelo.findOne({
            where: {
                id
            }
        })

        if (!encontrado){
            throw new NaoEncontrado('Fornecedor')
        }

        return encontrado
    },

    async atualizar(id, dadosParaAtualizar){
        return Modelo.update(dadosParaAtualizar, {
            where: {
                id
            }
        })
    },

    remover(id){
        return Modelo.destroy({
            where: {
                id
            }
        })
    }
}