const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar () {
        return Modelo.findAll()
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
            throw new Error('Fornecedor não encotnrado')
        }

        return encontrado
    }
}