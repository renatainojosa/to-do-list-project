require('dotenv/config');
const express = require('express');
const app = express();

//banco de dados
require('./db')

//configurações

//rotas

//erros
require('./error-handling')(app); 

module.exports = app;