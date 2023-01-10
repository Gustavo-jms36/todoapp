// importar express
const express = require("express");

//IMPORTAR INSTACIA CREADA EN DATABASE
const db = require("./utils/database");

//IMPORTAR LOS MODELS
const initModels = require("./models/init.model");
const Users = require("./models/users.model");
const Todos = require("./models/todos.model");

//CREAR UNA INSTANCIA DE EXPRESS
const app = express();
app.use(express.json());

const PORT = 8000;

//PROBANDO CONEXION CON LA BASE DE DATOS
db.authenticate()
  .then(() => console.log("Atenticacion exitosa"))
  .catch((error) => console.log(error));
//EJECUTAR LA FUNCION IMPOORTADA DE INITMODELS
initModels();
//USAR EL METODO SYNC DE LA BASE DE DATOS
db.sync({ force: false }) //DEVUELVE UNA PROMESA
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Bienvenido al servidor" });
});

//DEFINIR LAS RUTAS DE LOS ENDPOINTS (EP)
// localhost:8000/users  PARA USUARIOS
// localhost:8000/todos  PARA TAREAS
app.get("/users", async (req, res) => {
  try {
    //OBTENER RESULTADO DE CONSULTAR TODOS LOS USUARIOS DE LA BD
    const result = await Users.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//OBTENER USUARIOS POR ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//OBTENER USUARIO POR USERNAME
app.get("/users/username/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await Users.findOne({ where: { username } });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//CREAR USUARIO
app.post("/users", async (req, res) => {
  try {
    const user = req.body;
    const result = await Users.create(user);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
});

//ACTUALIZAR USUARIO
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Users.update(field, { where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//ELIMINAR USUARIO
app.delete('/user/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Users.destroy({where: {id}});
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
})

//OBTENER TODAS LAS TAREAS
  app.get("/todos", async (req, res) => {
  try {
    const result = await Todos.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//OBTENER TAREAS POR ID
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todos.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

//CREAR UNA NUEVA TAREA
app.post("/todos", async (req, res) => {
  try {
    const todo = req.body;
    const result = await Todos.create(todo);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
});

//ACTUALIZAR TAREA
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const field = req.body;
    const result = await Todos.update(field, { where: { id } });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//ELIMINAR TAREA
app.delete('/todos/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const result = await Todos.destroy({where: {id}});
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message);
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
