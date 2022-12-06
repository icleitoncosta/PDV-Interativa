var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const adesivosSchema = mongoose.Schema({
  marca: {
    type: String,
    required: true
  },
  tp: {
    type: String,
    required: true
  },
  gr: {
    type: String,
    required: true
  },
  comprimento: {
    type: String,
    required: true
  },
  lg: {
    type: String,
    required: true
  },
  fundo: {
    type: String,
    required: true
  },
  cola: {
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

const Adesivos = module.exports = mongoose.model('sobras_adesivos', adesivosSchema);
