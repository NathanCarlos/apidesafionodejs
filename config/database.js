const mongoose = require('mongoose');
//Importando as configurações do banco de dados.
const config = require('config');


mongoose.Promise = require('bluebird');

process.env.PORT = process.env.PORT || 3000;

// Substituido pela linha abaixo
//const uri = process.env.MONGODB_URL || `mongodb://localhost:27017/test`;

const uri = config.get('database.mongoUrl');


// talvez você precise declarar um parâmetro 'options', ficando assim a linha:
const connect = () => mongoose.connect(uri, { useNewUrlParser: true });
//const connect = () => mongoose.connect(uri);

module.exports={
    connect
}
