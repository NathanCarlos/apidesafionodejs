const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clienteSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true
    // select: false
  },
  filmesAlugados: {
    type: [String]
  },
  saldo: {
    type: Number
  },
  desconto: {
    type: Number
  },
  token: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
});
module.exports = mongoose.model('cliente', clienteSchema, 'clientes');