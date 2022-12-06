var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const bastaoSchema = mongoose.Schema({
  fornecedor: {
    type: String,
    required: true
  },
  tp: {
    type: String,
    required: true
  },
  exp: {
    type: String,
    required: true
  },
  tam: {
    type: String,
    required: true
  },
  custo: {
    type: String,
    required: true
  },
  data_created: {
    type: String
  },
  cod: {
    type: String
  }

});
// tp = tipo = madeira, plastico, perfil c
// esp = expessura

const Bastao = module.exports = mongoose.model('sobras_bastao', bastaoSchema);
