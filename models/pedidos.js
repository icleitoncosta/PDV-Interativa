var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const pedidosSchema = mongoose.Schema({
  numero: { 
    type : Number , 
    unique : true, 
    required : true, 
    dropDups: true
  },
  nome_cliente: {
    type: String,
    required: true
  },
  cliente_id: {
    type: String,
    required: true
  },
  itens_pedido: {
    type: String,
    required: true
  },
  tempo_de_atend: {
    type: String
  },
  descontos: {
    type: String
  },
  obs: {
    type: String
  },
  preco_total: {
    type: String,
    required: true
  },
  atendente: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  data_retirada: {
    type: String
  },
  local_retirada: {
    type: String
  },
  cancelada: {
    type: Boolean
  }
});

const Pedidos = module.exports = mongoose.model('Pedidos', pedidosSchema);