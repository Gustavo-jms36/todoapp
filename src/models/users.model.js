//IMPORTAR LA INSTANCIA DE LA BASE DE DATOS
const db = require('../utils/database');

//TIPOS DE DATOS DE SEQUELIZE
const {DataTypes, INTEGER} = require('sequelize');

//DEFINIR EL MODELO DE USUARIO
//LOS MODELOS SE DEFINEN CON UNA MAYUSCULA
// RECIBE 2 PARAMETROS (NOMBRE DE LA TABLA Y LOS ATRIBUTOS DE LA TABLA (OBJETO))
const Users = db.define('users', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Users;