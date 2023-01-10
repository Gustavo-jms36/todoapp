const db = require('../utils/database');
const Users = require('../models/users.model');
const Todos = require('../models/todos.model')


const users = [
    {username: 'Gustavo', email: 'gustavo@gmail.com', password: '1234'},
    {username: 'Maria', email: 'maria@gmail.com', password: '1234'},
    {username: 'Jose', email: 'jose@gmail.com', password: '1234'}
];

const todos = [
    {title: 'Tarea 1', description: 'tarea 1 del usuario 1', userId: 1},
    {title: 'Tarea 2', description: 'Tarea 2 del usuari 1', userId: 1},
    {title: 'Tarea del usuario 2', userId: 2},
    {title: 'dormir', description: 'Description del usuario 3', userId: 3}
];

// const categories = [];

// const todosCategories = [];

//SINCRONIZAR BASE DE DATOS
db.sync({force: true})
.then(() => {
    console.log('iniciando con el sembradio malicioso');
    users.forEach((user) => Users.create(user));
    setTimeout(() => {
        todos.forEach((todo) => Todos.create(todo));
    }, 100);
})
.catch(error => console.log(error));