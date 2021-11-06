const Modelo = require('./ModeloTabelaProduto')
const instancia = require('../../../banco-de-dados')
const NaoEncontrado = require('../../../erros/NaoEncontrado')
module.exports = {
    listar(idFornecedor){
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true // traz os valores em JS puro e não obj do sequelize
        })
    },
    inserir(dados){
        return Modelo.create(dados)
    },
    remover(idProduto, idFornecedor){
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    },
    async buscarPorId(idProduto, idFornecedor){
        const encontrado = await Modelo.findOne({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            },
            raw: true
        })

        if(!encontrado){
            throw new NaoEncontrado('Produto')
        }
        return encontrado
    },
    atualizar(dadosDoProduto, dadosParaAtualizar){
        return Modelo.update(dadosParaAtualizar, {
            where: dadosDoProduto
        })
    },
    subtrair(idProduto, idFornecedor, campo, total){
        instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            })

            produto[campo] = total
            await produto.save()

            return produto
        })
    }
}