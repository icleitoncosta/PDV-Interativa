var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const ilhosSchema = mongoose.Schema({
  marca: {
    type: String,
    required: true
  },
  tp: {
    type: String,
    required: true
  },
  lg: {
    type: String,
    required: true
  },
  estoque: {
    type: String,
    required: true
  },
  custo: {
    type: String,
    required: true
  },
  data_created: {
    type: String
  }

});
// tp = tipo = aluminio, niquelado
// esp = expessura

const Ilhoses = module.exports = mongoose.model('Ilhoses', ilhosSchema);
