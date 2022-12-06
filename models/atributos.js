var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const atributosSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cod: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  variacoes: {
    type: String,
    required: true
  },
  tipocob: {
    type: String
  },
  custo: {
    type: String
  },
  preco: {
    type: String
  }
});

const Atributos = module.exports = mongoose.model('Atributos', atributosSchema);