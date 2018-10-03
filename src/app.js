
const express =  require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
//Importando configurações do banco de dados.
const database = require('../config/database');
//Importando módulo do cors para gerenciar as requisições externas.
const cors = require('cors');

const app = express();
var configureExpress = () => {
    app.use(bodyParser.json());
    app.use(cors());
    // app.use(function(req,res,next){
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //   next();
    // });
    app.use('/', routes);
    return app;
  };
  module.exports = () => database.connect().then(configureExpress);
   
