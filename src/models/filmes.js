const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmesSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    sinopse: {
        type: String
    },
    genero: {
        type: [String],
        required: true
    },
    atores: {
        type: [String],
        required: true
    },
    dataLancamento: {
        type: Date,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    reservasToken: {
        type: [String]
    },
    imagem: {
        type: String,
        required: true
    },
    tempoMinimoLocacao: {
        type: Number,
        required: true
    },
    tempoMaximoLocacao: {
        type: Number,
        required: true
    },
    // valorUltPeriodo: {
    //     type:Number,
    //     required:true
    // }
    valorLocacao: {
        type: Number
    },
    alugadosToken: {
        type: [String]
    }
});
module.exports = mongoose.model('filme', FilmesSchema, 'filmes');