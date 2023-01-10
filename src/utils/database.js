const {Sequelize} = require('sequelize');

//CREAR UNA INSTANCIA CON PARAMETROS DE CONFIGURACION DE LA BASE DE DATOS
//Y UN OBJETO DE CONFIGURACION ( CREDENCIALES DE LA BASE DE DATOS)
const db = new Sequelize({
    database: "todoapp",
    username: "postgres",
    host: "localhost",
    port: "5432",
    password: "root",
    dialect: "postgres" //LA BASE DE DATOS QUE SE ESTA UTILIZANDO
})

//EXPORTAR LA INSTACIA PARA UTILIZARLA EN OTRO LUGAR
module.exports = db;