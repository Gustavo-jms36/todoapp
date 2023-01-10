//AQUI SE IMPORTAN TODOS LOS MODELOS CREADOS
const Categories = require('./categories.model');
const TodosCategories = require('./todos-categories.model');
const Todos = require('./todos.model');
const Users = require('./users.model');

const initModels  = () => {
    Categories;
    TodosCategories

    //CREAR LAS RELACIONES (hasOne, HasMany, belongsTo)
    Todos.belongsTo(Users, {as: 'author', foreignKey: 'user_id'});
    Users.hasMany(Todos, {as: 'task', foreignKey: 'user_id'});

    //relacion muchos a muchos
    TodosCategories.belongsTo(Todos, {as: 'task', foreignKey: 'todo_id'});
    Todos.hasMany(TodosCategories, {as: 'category', foreignKey: 'todo_id'});

    TodosCategories.belongsTo(Categories, {as: 'category', foreignKey: 'category_id'});
    Categories.hasMany(TodosCategories, {as: 'task', foreignKey: 'category_id'});
}

module.exports = initModels;