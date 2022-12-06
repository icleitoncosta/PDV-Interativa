var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const lonassSchema = mongoose.Schema({
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

const Lonas = module.exports = mongoose.model('sobras_lonas', lonassSchema);
