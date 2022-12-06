var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const custosSchema = mongoose.Schema({
  cod: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  tipocob: {
    type: String,
    required: true
  },
  valor: {
    type: String,
    required: true
  },
  is_delete: {
    type: String
  }
});

const Custos = module.exports = mongoose.model('Custos', custosSchema);