const Sequelize = require('sequelize')
const config = require('config')

const instancia = new Sequelize(
    config.get('mysql.banco-de-dados'),
    config.get('mysql.usuario'),
    config.get('mysql.senha'),
    {
        dialect: 'mysql'
    }
)

module.exports = instancia