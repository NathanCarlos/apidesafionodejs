const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
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
  permissao: {
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
module.exports = mongoose.model('user', UserSchema, 'users');