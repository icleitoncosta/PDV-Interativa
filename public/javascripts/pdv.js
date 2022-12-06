// PDV.js

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
;

blockButtons();

var carrinhoDeCompras = {};
var info_pedido = {};
var cartTime = 0;

// Verificando se já há um pedido em andamento e preenchendo o carrinho
var cartCookie = getCookie("cartData");
if(cartCookie == '' || cartCookie == null){
}else{
    carrinhoDeCompras = JSON.parse(decodeURIComponent(cartCookie));
    preencherCarrinhoNoFront();
}
// Verificando se já há um pedido e inserindo as informações necessárias
var infoCookie = getCookie("infoCookie");
if(infoCookie == '' || infoCookie == null){
}else{
    info_pedido = JSON.parse(decodeURIComponent(infoCookie));
}

var clienteNome = getCookie('clienteNome');
var clienteID = getCookie('clienteID');
if((clienteNome == '' || clienteNome == null) && (clienteID == '' || clienteID == null)){
}else{
    $( "#clienteInput" ).val(clienteNome);
    $( "#clienteID" ).val(clienteID);
    blockButtons(false);
}

// Verificando se já há um pedido em andamento e inicializando o Timer
cartTime = getCookie("cartTime");
if(cartTime == '' || cartTime == null){
}else{
    cartTime = cartTime.replace(/%3A/g,':'); //00:00:00
    $('#tempoAtualInput').val(cartTime).text();
    $('#tempoAtualizado').html(' '+$('#tempoAtualInput').val());

    var a = cartTime.split(':'); 
    var seconds = ((+a[0]) * 60) * 60 + ((+a[1]) * 60) + (+a[2]);
    cartTime = seconds;
}
// Mensagem avisando que já havia um pedido em aberto.
if(JSON.stringify(carrinhoDeCompras) != '{}' && cartTime != 0){ 
    var dialog = bootbox.dialog({
        title: 'Pedido em andamento',
        message: "<p>Já existia um pedido em andamento e nós o recuperamos para você.</p><p>Por favor, inicie apenas o contador de tempo para continuar.</p>",
        size: 'large',
        buttons: {
            ok: {
                label: "Ok, muito obrigado",
                className: 'btn-info'
            }
        }
    });
}



$(function () {
    //Preenchendo o campo de observações pelo que já havia escrito antes
    if(info_pedido['observacoes'] != ''){
        $('#observacoes_pedido').val(info_pedido['observacoes']);
    }

    // Iniciar os Tooltips do Bootstrap
    $('[data-toggle="tooltip"]').tooltip();

    // AutoComplete para o Cliente
    $( "#clienteInput" ).autocomplete({
        source: function(req,res) {
            $.ajax({
                url: "/clientes/busca/"+req.term,
                dataType: "jsonp",
                type: "GET",
                success: function(data) {
                    res($.map(data, function(item) {
                        return {
                            label: capitalize(item.label),
                            value: item.value,
                            desc: item.desc
                        };
                    }));
                },
                error: function(xhr) {
                    alert(xhr.status + ' : ' + xhr.statusText);
                }
            });
        },
        select: function( event, ui ) {
            $( "#clienteInput" ).val( ui.item.label );
            $( "#clienteID" ).val( ui.item.value );
            setCookie('clienteNome',ui.item.label,7);
            setCookie('clienteID',ui.item.value,7);
            blockButtons(false);
            return false;
        }
    })
    .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
        .append("&nbsp;" + item.label + " — " + item.desc)
        .appendTo( ul );
    };

    // AutoComplete para o Produto
    $( "#inpInserirProduto" ).autocomplete({
        source: function(req,res) {
            $.ajax({
                url: "/produtos/busca/"+req.term,
                dataType: "jsonp",
                type: "GET",
                success: function(data) {
                    res($.map(data, function(item) {
                        return {
                            label: (item.label).toUpperCase(),
                            value: item.value,
                            cod: (item.cod).toUpperCase(),
                            preco: item.preco,
                            descricao: item.descricao,
                            prices_by_qnt: item.prices_by_qnt,
                            tipopreco: item.tipopreco,
                            type: item.type
                        };
                    }));
                },
                error: function(xhr) {
                    alert(xhr.status + ' : ' + xhr.statusText);
                }
            });
        },
        select: function( event, ui ) {
            $( "#inpInserirProduto" ).val( ui.item.label );
            $( "#productID" ).val( ui.item.value );
            $( "#productPrice" ).val( ui.item.preco );
            $( "#productDesc" ).val( ui.item.descricao );
            $( "#prices_by_qnt" ).val( ui.item.prices_by_qnt );
            $( "#tipo_cobranca" ).val( ui.item.tipopreco );
            $( "#product_type" ).val( ui.item.type );
            return false;
        },
        focus: function( event, ui ) {
            $( "#inpInserirProduto" ).val( ui.item.label );
            $( "#productID" ).val( ui.item.value );
            $( "#productPrice" ).val( ui.item.preco );
            $( "#productDesc" ).val( ui.item.descricao );
            $( "#prices_by_qnt" ).val( ui.item.prices_by_qnt );
            $( "#tipo_cobranca" ).val( ui.item.tipopreco );
            $( "#product_type" ).val( ui.item.type );
            return false;
        }
    })
    .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
        return $( "<li>" )
        .append("&nbsp;" + item.cod + " — " + item.label + " — R$ " + item.preco)
        .appendTo( ul );
    };
})
/* *******************************************
*                                            *
*                                            *
*                                            *
*                                            *
*         Iniciar todos os botões e          *
*          inputs sem poder inserir          *
*                                            *
*                                            *
*                                            *
/* ********************************************
*/
// Iniciar todos os botões e inputs sem poder inserir
function blockButtons(boolean = true){
    var buttons=document.getElementsByTagName('button');
    var inputs=document.getElementsByTagName('input');
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled=boolean;
    } 
    for(i=0;i<buttons.length;i++){
        buttons[i].disabled=boolean;
    } 
    if(boolean){
        document.getElementById("clientebalcao").disabled = false;
        document.getElementById("novocliente").disabled = false;
        document.getElementById("novoproduto").disabled = false;
        document.getElementById("buscageral").disabled = false;
        document.getElementById("clienteInput").disabled = false;
        $('.bootbox-accept').prop( "disabled", false );
    }else{
        document.getElementById("clienteInput").disabled = true;
        document.getElementById("productPrice").disabled = true; // Bloquear apenas o campo de preço
    }
}

/* *******************************************
*                                            *
*                                            *
*                                            *
*                                            *
*         Sistema de Controle de Tempo       *
*                                            *
*                                            *
*                                            *
*                                            *
/* ********************************************
*/
var timer = new easytimer.Timer();

timer.addEventListener('secondsUpdated', function (e) {
    var timeratual = timer.getTimeValues().toString();

    $('#tempoAtualInput').val(timeratual);
    $('#tempoAtualizado').html(' '+$('#tempoAtualInput').val());
    setCookie('cartTime', timeratual, 7);

});

/* *******************************************
*                                            *
*                                            *
*                                            *
*                                            *
*    Sistema de Adição e Remoção Carrinho    *
*                                            *
*                                            *
*                                            *
*                                            *
/* ********************************************
*/
function addItemNoCarrinho(product_id, title, qnt, preco, descricao, tipo_cobranca, preco_variaveis = null, product_type = 'simple', product_extras = null){
    if(product_id == null || product_id == '' || qnt == null){return false;}
    preco = preco.replace(',', '.');
    var carrinhoCount = Object.keys(carrinhoDeCompras).length;
    var NumberItemInCart = carrinhoCount+1;
    var precocalculado = calcPrecosProduct(preco, preco_variaveis, qnt);

    var total_price = qnt * preco;
    total_price = total_price.toFixed(2);

    var product = 
    {
        "titulo":title,
        "product_id":product_id,
        "qnt":qnt,
        "preco_real":preco,
        "preco":precocalculado,
        "preco_total":total_price,
        "prices_by_qnt":preco_variaveis,
        "tipo_cobranca":tipo_cobranca,
        "descricao":descricao
    };
    carrinhoDeCompras[NumberItemInCart] = product;

    if(tipo_cobranca == 'M²' || tipo_cobranca == 'ML' || tipo_cobranca == 'KG' ){
        calcPrecoPorMedicaoCustomizada(precocalculado, tipo_cobranca, NumberItemInCart);
    }else{
        setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
        preencherCarrinhoNoFront();
    }
}

function preencherCarrinhoNoFront(){
    var carrinhoCount = Object.keys(carrinhoDeCompras).length;
    var valor_total_carrinho = 0;

    if(carrinhoCount == 0){
        $('#ItensInCart').html('<tr><td colspan="6" style="text-align: center; color:#bdbdbd"><h3><span data-feather="plus-circle" style="width: 140px; height: 140px; color:#bdbdbd"></span><p>Adicione itens no pedido</p></h3></td></tr>')
        feather.replace();
        return false;
    }

    $('#ItensInCart').html('');

    for (var i = 0; i < carrinhoCount; i++) {
        var item = i+1;

        var titulo = carrinhoDeCompras[item].titulo;
        var product_id = carrinhoDeCompras[item].product_id;
        var qnt = carrinhoDeCompras[item].qnt;
        var preco = carrinhoDeCompras[item].preco;
        var preco_total = carrinhoDeCompras[item].preco_total;
        var tipo_cobranca_j = carrinhoDeCompras[item].tipo_cobranca;
        var obs = carrinhoDeCompras[item].descricao.replace(/&PaserPV/g, ';');

        var total_carrinho = Number(preco_total);
        valor_total_carrinho = valor_total_carrinho+total_carrinho;
        var medidas_variadas = mostrar_precos_customizados_no_html(item);

        $('#ItensInCart').prepend('<tr><th scope="row">'+item+'</th><td> <dl><dt>'+titulo+''+medidas_variadas+'<dd style="font-size:10px;">'+obs+'</dd></dt></dl></td><td style="text-align: center;">'+qnt+'</td><td style="text-align: center;">R$ <span class="mn">'+preco+'</span><span class="text-lowercase">/'+tipo_cobranca_j+'</span></td><td style="text-align: center;">R$ <span class="mn">'+preco_total+'</span></td><td style="text-align: center;"> <button class="btn btn-sm btn-outline-primary btn-sm" onClick="editItemCart('+item+')"><span data-feather="edit"></span></button><button class="btn btn-sm btn-outline-danger btn-sm" onClick="deleteItemCart('+item+')"><span data-feather="trash-2"></span></button></td></tr>')
        feather.replace();


    }
    $('#valortotal').html(valor_total_carrinho.toFixed(2));
    $('.mn').mask('000.000.000.000.000,00', {reverse: true});
    
    
}
function mostrar_precos_customizados_no_html(numero_no_carrinho){
    if(carrinhoDeCompras[numero_no_carrinho].tipo_cobranca == 'M²'){
        return '<dd style="font-size:10px;"><b>Largura:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].largura+'cm - <b>Altura:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].altura+'cm - <b>Área total:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].area+' m²</dd>';    
    }
    else if(carrinhoDeCompras[numero_no_carrinho].tipo_cobranca == 'ML'){
        return '<dd style="font-size:10px;"><b>Largura:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].largura+'cm - <b>Altura:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].altura+'cm - <b>Comprimento:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].comprimento+'cm </dd>';    
    }
    else if(carrinhoDeCompras[numero_no_carrinho].tipo_cobranca == 'KG'){
        return '<dd style="font-size:10px;"><b>Peso:</b> '+carrinhoDeCompras[numero_no_carrinho]['medidas'].peso+'kg </dd>';    
    }else{
        return '';
    }
}
function calcPrecoPorMedicaoCustomizada(preco, tipo_cobranca, n){
    if(tipo_cobranca == 'M²'){
        var html_mes = "<form action='#' id='formEdit'><div class='row'><div class='col-8'><label for='titulo'>Produto</label><input type='text' class='form-control' id='titulo' value='"+carrinhoDeCompras[n].titulo+"' disabled='true'></div><div class='col-4'><label for='preco'>Preço por "+tipo_cobranca+"</label><input type='number' class='form-control mn' id='preco' value='"+carrinhoDeCompras[n].preco_total+"' disabled='true'></div></div><p></p><div class='row'><div class='col-3'><label for='largura'>Largura</label><input type='text' class='form-control' id='largura' value='' placeholder='Medida em centímetros'></div><div class='col-3'><label for='altura'>Altura</label><input type='text' class='form-control' id='altura' value='' placeholder='Medida em centímetros'></div><div class='col-3'><label for='preco_total'>Preço Total p/ und</label><input type='text' class='form-control mn' id='preco_total' value='' disabled='true'></div><div class='col-3'><label for='metragem_total'>Área Total</label><input type='text' class='form-control' id='metragem_total' value='' disabled='true'></div></div></form>";
    }
     bootbox.dialog({
        title: carrinhoDeCompras[n].titulo,
        message: html_mes, 
        onShow: function(e) {
            document.onkeydown=function(e){
                if( e.which == 13 ) {
                    e.preventDefault();
                    $( ".btn_add_press" ).trigger( "click" );
                }
            }
            var largura = $('#largura').val();
            var altura = $('#altura').val();
            var area = $('#metragem_total').val();

            if(tipo_cobranca == 'M²'){
                $('#largura').on('input', function() {
                    var total = ($('#largura').val()/100) * ($('#altura').val()/100);
                    var preco_total = (total*carrinhoDeCompras[n].preco).toFixed(2);
                    if($('#altura').val() != ''){
                        $('#metragem_total').val(total); 
                        $('#preco_total').val(preco_total); 
                    }
                    
                });
                $('#altura').on('input', function() {
                    var total = ($('#largura').val()/100) * ($('#altura').val()/100);
                    var preco_total = (total*carrinhoDeCompras[n].preco).toFixed(2);
                    if($('#largura').val() != ''){ 
                        $('#metragem_total').val(total); 
                        $('#preco_total').val(preco_total); 
                    }
                });
            }
        },
        size: 'large',
        buttons: {
          ok: {
            label: "Inserir",
            className: 'btn-primary btn_add_press',
            callback: function(){
                if(tipo_cobranca == 'M²'){
                    if ($('#largura').val() == '' || $('#altura').val() == ''){
                        bootbox.alert("Psiu, você precisa preencher os campos de largura e altura.");
                        return false;
                    }
                    var medidas = 
                    {
                        "largura":$('#largura').val(),
                        "altura":$('#altura').val(),
                        "area":$('#metragem_total').val(),
                        "valor_und":$('#preco_total').val()
                    };
                    carrinhoDeCompras[n].medidas = medidas;
                    carrinhoDeCompras[n].preco_total = (carrinhoDeCompras[n]['medidas'].valor_und * carrinhoDeCompras[n].qnt).toFixed(2);
                    setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
                    preencherCarrinhoNoFront();
                }
                if(tipo_cobranca == 'kg'){
                    var medidas = 
                    {
                        "peso":$('#peso').val()
                    };
                    carrinhoDeCompras[n].medidas = medidas;
                    carrinhoDeCompras[n].preco_total = (carrinhoDeCompras[n]['medidas'].valor_und * carrinhoDeCompras[n].qnt).toFixed(2);
                    setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
                    preencherCarrinhoNoFront();
                }
                if(tipo_cobranca == 'ml'){
                    var medidas = 
                    {
                        "largura":$('#largura').val(),
                        "altura":$('#altura').val(),
                        "comprimento":$('#comprimento').val()
                    };
                    carrinhoDeCompras[n].medidas = medidas;
                    carrinhoDeCompras[n].preco_total = carrinhoDeCompras[n]['medidas'].valor_und * carrinhoDeCompras[n].qnt

                    setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
                    preencherCarrinhoNoFront();
                }

            }
          },
          cancel: {
            label: "Cancelar",
            className: 'btn-danger',
            callback: function(){
                delete carrinhoDeCompras[n];
            }
          },
        }
      });
}
/* *******************************************
*                                            *
*                                            *
*                                            *
*                                            *
*    Sistema de Finalização de pedido        *
*                                            *
*                                            *
*                                            *
*                                            *
/* ********************************************
*/
function btn_finalizarcompraClick(){
    var carrinhoCount = Object.keys(carrinhoDeCompras).length;
    var valor_total_carrinho = 0;

    for (var i = 0; i < carrinhoCount; i++) {
        var item = i+1;

        var qnt = carrinhoDeCompras[item].qnt;
        var preco = carrinhoDeCompras[item].preco;
        var preco_total = carrinhoDeCompras[item].preco_total;

        var total_carrinho = Number(preco_total);
        valor_total_carrinho = valor_total_carrinho+total_carrinho;
        var medidas_variadas = mostrar_precos_customizados_no_html(item);
    }

    bootbox.dialog({
        title: 'Finalizar compra',
        message: "<form action='#' id='formFinalizarCompra'><div class='row'><div class='col-12'><h6>Valor total: R$ "+valor_total_carrinho.toFixed(2)+"</h6></div></div><div class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text' id='basic-addon1'>R$</span></div><input type='text' class='form-control' placeholder='Insira aqui um desconto' aria-label='100,00' id='valor_desconto' aria-describedby='basic-addon1'></div><div class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text' id='basic-addon1'>R$</span></div><input type='text' id='valor_com_desconto' class='form-control' placeholder='Valor com desconto' aria-label='Valor com desconto' aria-describedby='basic-addon1' disabled='true'></div></form>", 
        onShow: function(e) {
            $('.mn').mask('000.000.000.000.000,00', {reverse: true});

            $('#valor_desconto').on('input', function() {
                var valor_corrigido = ConvertPriceValue($('#valor_desconto').val());
                valor_total_carrinho = valor_total_carrinho;

                var valor_atualizado = valor_total_carrinho-valor_corrigido;

                $('#valor_com_desconto').val(valor_atualizado);
                
            });

        },
        size: 'small',
        buttons: {
          ok: {
            label: "Dinheiro",
            className: 'btn-success btn-block btn_dinheiro',
            callback: function(){
                info_pedido["desconto"] = $('#valor_desconto').val();
                finalizar_pedido_no_dinheiro();
            }
          },
            noclose: {
                label: "Cartão de crédito/débito",
                className: 'btn-warning btn-block btn_cartao',
                callback: function(){
                    info_pedido["desconto"] = $('#valor_desconto').val();
                    //finalizar_pedido_no_cartao($('#valor_desconto').val());
                }
            },
          cancel: {
            label: "Cancelar",
            className: 'btn-danger btn-block btn_cancelar',
            callback: function(){
              //Cancelada a inserção
            }
          },
        }
      });
}
function finalizar_pedido_no_dinheiro(){
    var carrinhoCount = Object.keys(carrinhoDeCompras).length;
    var valor_total_carrinho = 0;
    var valor_desconto = info_pedido["desconto"];

    for (var i = 0; i < carrinhoCount; i++) {
        var item = i+1;
        var qnt = carrinhoDeCompras[item].qnt;
        var preco = carrinhoDeCompras[item].preco;
        var preco_total = carrinhoDeCompras[item].preco_total;

        var total_carrinho = Number(preco_total);
        valor_total_carrinho = valor_total_carrinho+total_carrinho;
    }
    valor_total_carrinho = valor_total_carrinho.toFixed(2)-valor_desconto;

    bootbox.dialog({
        title: 'Pag. Dinheiro',
        message: "<form action='/pedidos/novo/' method='POST' id='formTroco'><div class='row'><div class='col-12'><h6>Valor total: R$ "+valor_total_carrinho+"</h6></div></div><div class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text' id='basic-addon1'>R$</span></div><input type='text' class='form-control' placeholder='Valor que o cliente pagou' aria-label='100,00' id='valor_pag' aria-describedby='basic-addon1'><input type='hidden' value='"+getCookie('clienteNome')+"' id='nome_cliente' name='nome_cliente'/><input type='hidden' value='"+getCookie('clienteID')+"' id='cliente_id' name='cliente_id'/><input type='hidden' value='"+JSON.stringify(carrinhoDeCompras)+"' id='itens_pedido' name='itens_pedido'/><input type='hidden' value='"+getCookie('cartTime')+"' id='tempo_de_atend' name='tempo_de_atend' /><input type='hidden' value='"+valor_desconto+"' id='descontos' name='descontos' /><input type='hidden' value='"+info_pedido['observacoes']+"' id='obs' name='obs'/><input type='hidden' value='"+valor_total_carrinho+"' id='preco_total' name='preco_total' /></div><div class='input-group mb-3'><div class='input-group-prepend'><span class='input-group-text' id='basic-addon1'>Troco R$</span></div><input type='text' id='troco' class='form-control' placeholder='Valor do troco' aria-label='Valor do troco' aria-describedby='basic-addon1' disabled='true'></div><div class='row'><div class='col-12'><label for='data_retirada'>Data de retirada</label><input type='date' class='form-control' name='data_retirada'></div></div></form>", 
        onShow: function(e) {
            $('.mn').mask('000.000.000.000.000,00', {reverse: true});

            $('#valor_pag').on('input', function() {
                var valor_pago = ConvertPriceValue($('#valor_pag').val());
                valor_total_carrinho = valor_total_carrinho;

                var valor_troco = valor_pago-valor_total_carrinho;

                $('#troco').val(valor_troco.toFixed(2));
                
            });

        },
        size: 'small',
        buttons: {
          ok: {
            label: "Finalizar/Imprimir",
            className: 'btn-success btn-block',
            callback: function(){
                $.ajax({
                   type: "POST",
                   url: '/pedidos/novo/',
                   data: {
                            nome_cliente: $('#nome_cliente').val(),
                            cliente_id: $('#cliente_id').val(),
                            itens_pedido: $('#itens_pedido').val(),
                            tempo_de_atend: $('#tempo_de_atend').val(),
                            descontos: $('#descontos').val(),
                            obs: $('#obs').val(),
                            preco_total: $('#preco_total').val()
                        },
                   success: function(data)
                   {
                        novoPedido();
                       window.location.href = '/pedidos/'+data;
                   },
                   error: function(jqXHR, textStatus, errorThrown){
                        alert(errorThrown);
                   }
                });
            }
          },
            noclose: {
                label: "Finalizar/Novo Pedido",
                className: 'btn-warning btn-block',
                callback: function(){
                    $.ajax({
                       type: "POST",
                       url: '/pedidos/novo/',
                       data: {
                                nome_cliente: $('#nome_cliente').val(),
                                cliente_id: $('#cliente_id').val(),
                                itens_pedido: $('#itens_pedido').val(),
                                tempo_de_atend: $('#tempo_de_atend').val(),
                                descontos: $('#descontos').val(),
                                obs: $('#obs').val(),
                                preco_total: $('#preco_total').val()
                            },
                       success: function(data)
                       {
                            novoPedido();
                            window.location.href = '/pdv';
                       },
                       error: function(jqXHR, textStatus, errorThrown){
                            alert(errorThrown);
                       }
                    });
                }
            },
          cancel: {
            label: "Cancelar",
            className: 'btn-danger btn-block',
            callback: function(){
              //Cancelada a inserção
            }
          },
        }
      });
}
/* *******************************************
*                                            *
*                                            *
*                                            *
*                                            *
*        Deletar item do carrinho            *
*       + Editar item do carrinho            *
*                                            *
*                                            *
*                                            *
/* ********************************************
*/
function deleteItemCart(item){
    if($('.modal-dialog').is(":visible")){ return false}else{} // Correção para bug mostrando box duas vezes
    var nomeItem = carrinhoDeCompras[item].titulo;

    bootbox.confirm({
        message: "Você tem certeza que deseja deletar o item "+nomeItem+" ?",
        buttons: {
            confirm: {
                label: 'Sim, deletar',
                className: 'btn-success'
            },
            cancel: {
                label: 'Cancelar',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if(result){
                delete carrinhoDeCompras[item];

                // Corrigindo o número de itens no carrinho quando apagado (direto no JSON)
                var carrinhoCount = Object.keys(carrinhoDeCompras).length;
                var carrinhoCount = parseInt(carrinhoCount)+2;

                for (var i = 0; i < carrinhoCount; i++) {
                    if(i >  item){
                        var itemAnterior = i -1;
                        carrinhoDeCompras[itemAnterior] = carrinhoDeCompras[i];
                        delete carrinhoDeCompras[i];
                    }
                }
                //Gravando alterações no Cookie, e após mostrando para o usuário
                JSON.stringify(carrinhoDeCompras) == '{}' ? eraseCookie('cartData') : setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
                preencherCarrinhoNoFront();

            }
        }
    });
}
function editItemCart(item){
    var obs = null;

    (carrinhoDeCompras[item].descricao == 'undefined') ? obs = '' : obs = carrinhoDeCompras[item].descricao.replace(/&PaserPV/g, ';');
    if(carrinhoDeCompras[item].tipo_cobranca == 'M²'){
        var html_mes = "<p></p><div class='row'><div class='col-3'><label for='largura'>Largura</label><input type='text' class='form-control' id='largura' value='"+carrinhoDeCompras[item]['medidas'].largura+"' placeholder='Medida em centímetros'></div><div class='col-3'><label for='altura'>Altura</label><input type='text' class='form-control' id='altura' value='"+carrinhoDeCompras[item]['medidas'].altura+"' placeholder='Medida em centímetros'></div><div class='col-3'><label for='preco_total'>Preço Total p/ und</label><input type='text' class='form-control mn' id='preco_total' value='"+carrinhoDeCompras[item]['medidas'].valor_und+"' disabled='true'></div><div class='col-3'><label for='metragem_total'>Área Total</label><input type='text' class='form-control' id='metragem_total' value='"+carrinhoDeCompras[item]['medidas'].area+"' disabled='true'></div></div>";
    }else{
        var html_mes = '';
    }
     bootbox.dialog({
        title: 'Editar Item',
        message: "<form action='#' id='formEdit'><div class='row'><div class='col-8'><label for='titulo'>Título</label><input type='text' class='form-control' id='titulo' value='"+carrinhoDeCompras[item].titulo+"' required></div><div class='col-2'><label for='quantidade'>Quantidade</label><input type='number' class='form-control' id='quantidade' value='"+carrinhoDeCompras[item].qnt+"' required></div><div class='col'><label for='preco'>Preço Unitário</label><input type='text' class='form-control mn' id='preco' value='"+carrinhoDeCompras[item].preco_real+"/"+carrinhoDeCompras[item].tipo_cobranca+"' disabled></div></div>"+html_mes+"<p></p><div class='row'><div class='col'><label for='descricaoEdit'>Descrição</label><textarea id='descricaoEdit' class='form-control' rows='20'>"+carrinhoDeCompras[item].descricao.replace(/&PaserPV/g, ';')+"</textarea></div></div></form>", 
        onShow: function(e) {
            $('#descricaoEdit').summernote({
                placeholder: 'Se quiser, descreva aqui seu produto.',
                tabsize: 2,
                height: 180,
                lang: 'pt-BR', // default: 'en-US'
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']]
                ]
            })

            var largura = $('#largura').val();
            var altura = $('#altura').val();
            var area = $('#metragem_total').val();

            if(carrinhoDeCompras[item].tipo_cobranca == 'M²'){
                $('#largura').on('input', function() {
                    var total = ($('#largura').val()/100) * ($('#altura').val()/100);
                    var preco_total = (total*carrinhoDeCompras[item].preco).toFixed(2);
                    if($('#altura').val() != ''){
                        $('#metragem_total').val(total); 
                        $('#preco_total').val(preco_total); 
                    }
                    
                });
                $('#altura').on('input', function() {
                    var total = ($('#largura').val()/100) * ($('#altura').val()/100);
                    var preco_total = (total*carrinhoDeCompras[item].preco).toFixed(2);
                    if($('#largura').val() != ''){ 
                        $('#metragem_total').val(total); 
                        $('#preco_total').val(preco_total); 
                    }
                });
            }
        },
        size: 'large',
        buttons: {
          ok: {
            label: "Editar",
            className: 'btn-primary',
            callback: function(){
                var qnt = parseInt($('#quantidade').val());

                var preco_real = carrinhoDeCompras[item].preco_real;
                var prices_by_qnt = carrinhoDeCompras[item].prices_by_qnt;

                var preco_checado = calcPrecosProduct(preco_real, prices_by_qnt, qnt);
                var total_price = (qnt * parseFloat(preco_checado));

                carrinhoDeCompras[item].titulo = $('#titulo').val();
                carrinhoDeCompras[item].qnt = $('#quantidade').val();
                carrinhoDeCompras[item].preco = preco_checado; 
                carrinhoDeCompras[item].preco_total = total_price.toFixed(2);
                var descEdit = $('#descricaoEdit').val();
                carrinhoDeCompras[item].descricao = descEdit.replace(/;/g, '&PaserPV');

                if(carrinhoDeCompras[item].tipo_cobranca == 'M²'){
                    carrinhoDeCompras[item]['medidas'].largura = $('#largura').val();
                    carrinhoDeCompras[item]['medidas'].altura = $('#altura').val();
                    carrinhoDeCompras[item]['medidas'].area = $('#metragem_total').val();
                    carrinhoDeCompras[item]['medidas'].valor_und = $('#preco_total').val();

                    carrinhoDeCompras[item].preco_total = (carrinhoDeCompras[item]['medidas'].valor_und * carrinhoDeCompras[item].qnt).toFixed(2);
                    setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
                    preencherCarrinhoNoFront();
                }else{
                    setCookie('cartData', JSON.stringify(carrinhoDeCompras), 7);
                    preencherCarrinhoNoFront();
                }

            }
          },
          cancel: {
            label: "Cancelar",
            className: 'btn-danger',
            callback: function(){
              //Cancelada a inserção
            }
          },
        }
      });
}

/* Efetuando cálculo de variaveis de preço / preços por quantidade */
function calcPrecosProduct(preco, preco_variaveis, quantidade){
    
    if(preco_variaveis != '{}'){

        var data = JSON.parse(preco_variaveis);
        var data_count = Object.keys(data).length+1;
        var preco_func = 0;
        var ultimo_variavel_qnt = data[Object.keys(data).length].z;
        var ultimo_variavel_price = data[Object.keys(data).length].price;

        for (var i = 1; i < data_count; i++) {
            var qnt_inicial = data[i].a;
            var qnt_final = data[i].z;
            var preco_data = data[i].price;

            if ((quantidade >= qnt_inicial) && (quantidade <= qnt_final)) {
              preco_func = preco_data;
            }
        }
        //Caso seja uma quantidade maior que a última variável ela coloca no preço da última
        if(quantidade > ultimo_variavel_qnt){
            preco_func = ultimo_variavel_price;
        }
        if(preco_func == 0){
            return preco;
        }else{
            return preco_func;
        }
    }else{
        return preco;
    }
}
/* *******************************************
*                                            *
*                                            *
*                                            *
*                                            *
*                   Cookies                  *
*                                            *
*                                            *
*                                            *
*                                            *
/* ********************************************
*/
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); return match ? match[1] : null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Funcões de atalho do teclado
document.onkeydown=function(e){
    // F2
    if(e.which == 113) {
        e.preventDefault();
        document.getElementById("clientebalcao").click();
        document.getElementById("inpInserirProduto").focus();
    }
    // F4
    if(e.which == 115) {
        e.preventDefault();
        document.getElementById("controlarTempo").click();
        document.getElementById("inpInserirProduto").focus();
    }
    // F5
    if(e.which == 116) {
        e.preventDefault();
        document.getElementById("novopedido").click();
        document.getElementById("clienteInput").focus();
    }
    // F6
    if(e.which == 117) {
        e.preventDefault();
        document.getElementsByClassName("atalho2").click();
        document.getElementById("inpInserirProduto").focus();
    }
    // F7
    if(e.which == 118) {
        e.preventDefault();
        document.getElementsByClassName("atalho3").click();
        document.getElementById("inpInserirProduto").focus();
    }
    // F8
    if(e.which == 119) {
        e.preventDefault();
        document.getElementsByClassName("atalho4").click();
        document.getElementById("inpInserirProduto").focus();
    }
    // F9
    if(e.which == 120) {
        e.preventDefault();
        document.getElementsByClassName("atalho5").click();
        document.getElementById("inpInserirProduto").focus();
    }
    //F10
    if(e.which == 121) {
        e.preventDefault();
        document.getElementsByClassName("atalho6").click();
        document.getElementById("inpInserirProduto").focus();
    }
    //+
    if(e.which == 107) {
        e.preventDefault();
        $( ".btn-pluss" ).trigger( "click" );
        document.getElementById("inpInserirProduto").focus();
    }
    //-
    if(e.which == 109) {
        e.preventDefault();
        $( ".btn-minuse" ).trigger( "click" );
        document.getElementById("inpInserirProduto").focus();
    }

    //ENTER ON FOCUS INPUT PRODUCT
    if( e.which == 13) {
        e.preventDefault();
        $( "#inserirItem" ).trigger( "click" );
    }
}

// Botões que fazem aumentar ou diminuir a quantidade na lateral
$('.btn-minuse').on('click', function(){   
    var number = parseInt($(this).parent().siblings('input').val());
    if(number > 1){
        $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) - 1)
    }         
});

$('.btn-pluss').on('click', function(){            
    $(this).parent().siblings('input').val(parseInt($(this).parent().siblings('input').val()) + 1)
});


// Botão Cliente balcão
$('#clientebalcao').on('click', function(){
    if($( "#clienteID" ).val() != ''){
        $( "#clienteInput" ).val('');
        $( "#clienteID" ).val('');
        $('.tooltip').not(this).hide();
        blockButtons(true);
        eraseCookie('clienteNome');
        eraseCookie('clienteID');
        document.getElementById("clienteInput").focus();

    }else{
        $( "#clienteInput" ).val('CLIENTE BALCAO');
        $( "#clienteID" ).val('5fac8b860936622a88768cd1');
        $('.tooltip').not(this).hide();
        blockButtons(false);
        setCookie('clienteNome','CLIENTE BALCAO',7);
        setCookie('clienteID','5fac8b860936622a88768cd1',7);
    }

});


// Botão Controlar Tempo
$('#controlarTempo').on('click', function(){    
    timer.isRunning() ? timer.pause() : timer.start({precision: 'seconds', startValues: {seconds: cartTime}}), $('#controlarTempo').removeClass('btn-danger'), $('#controlarTempo').addClass('btn-outline-danger');
});


// Inserir Item no carrinho
$('#inserirItem').on('click', function(){   
    addItemNoCarrinho(
        $( "#productID" ).val(), 
        $( "#inpInserirProduto" ).val(), 
        $( "#item_quantity" ).val(), 
        $( "#productPrice" ).val(), 
        $( "#productDesc" ).val(), 
        $( "#tipo_cobranca" ).val(), 
        $( "#prices_by_qnt" ).val(), 
        $( "#product_type" ).val().toString());

    // Limpando campos
    $( "#productID" ).val('')
    $( "#inpInserirProduto" ).val('')
    $( "#item_quantity" ).val('1') 
    $( "#productPrice" ).val('')
    $( "#productDesc" ).val('')
    $( "#prices_by_qnt" ).val('')
    $( "#tipo_cobranca" ).val('')
    $( "#product_type" ).val('')

});



// Zerar campos para fazer um novo pedido, e excluir o atual
$('#novopedido').on('click', function(){   
    novoPedido();
});

function novoPedido(){
    // Limpando campos
    $( "#productID" ).val('')
    $( "#inpInserirProduto" ).val('')
    $( "#item_quantity" ).val('1') 
    $( "#productPrice" ).val('')
    $( "#productDesc" ).val('')
    $( "#product_type" ).val('')
    $( "#prices_by_qnt" ).val('')
    $( "#tipo_cobranca" ).val('')
    $('#valortotal').html('R$ 0,00')
    $( "#observacoes_pedido" ).val('');
    carrinhoDeCompras = {};
    info_pedido = {};
    preencherCarrinhoNoFront();

    // Zerando contagem de tempo
    timer.reset();
    timer.pause();

    // Limpando form do cliente
    $( "#clienteInput" ).val('');
    $( "#clienteID" ).val('');
    $('#tempoAtualizado').html(' 00:00:00');
    blockButtons(true);

    // Limpando cookies
    eraseCookie('cartData')
    eraseCookie('cartTime')
    eraseCookie('clienteNome');
    eraseCookie('clienteID');
    eraseCookie('infoCookie');
}

// Botão Finalizar pedido
$('#pagamento_btn').on('click', function(){   
    btn_finalizarcompraClick();
});

$('#observacoes_pedido').on('input', function() {
    info_pedido["observacoes"] = $('#observacoes_pedido').val();
    setCookie('infoCookie', JSON.stringify(info_pedido), 7);
});