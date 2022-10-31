require('dotenv/config');
const express = require('express');
const app = express();

const { isAuthenticated } = require('./middlewares/jwt.middleware')

//banco de dados
require('./db')

//configurações
require('./configs')(app);

//rotas
app.use('/auth', require('./routes/auth.routes'));
app.use('/todolist', isAuthenticated, require('./routes/todo.routes'))

//erros
require('./error-handling')(app); 

module.exports = app;