require('dotenv/config');
const express = require('express');
const app = express();

//banco de dados

//configurações

//rotas

//erros
app.use((req, res, next) => {
    res.status(404).json('Não encontrado!');
});

module.exports = app;