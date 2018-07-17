appServices.factory('entregaRepository', function($http, configurationFactory) {

  var entregaURL = configurationFactory.globalAPI + 'user/';
  var confirmacionURL = configurationFactory.globalAPI + 'confirmacion/';
  var uploadURL = configurationFactory.globalAPI + 'upload/';

  return {

    setPedidoCabecera: function(pedido, operador, situacion) {
      var loginURL = entregaURL + 'pedidoCabecera/';
      return $http({
        url: loginURL,
        method: "POST",
        params: {
          idPedido: pedido,
          idOperador: operador,
          idSituacion: situacion
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    setPedidonDetalle: function(pedido, codigo, detalleParte, cantidad, devoluciones, motivo, situacionRef) {
      var loginURL = entregaURL + 'pedidoDetalle/';
      return $http({
        url: loginURL,
        method: "POST",
        params: {
          idpedido: pedido,
          codigo: codigo,
          detalleParte: detalleParte,
          cantidad: cantidad,
          numDevoluciones: devoluciones,
          motivo: motivo,
          situacionRef: situacionRef
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

    },
    validaToken: function(token, idPedido) {
      return $http({
        url: confirmacionURL + 'validaToken/',
        method: "POST",
        params: {
          token: token,
          idPedido: idPedido
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

    },
    crearCarpeta: function(idPedido) {
      return $http({
        url: uploadURL + 'creaCarpeta/',
        method: "POST",
        params: {
          idPedido: idPedido
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

    },
    cargaRuta: function(ruta, idPedido) {
      return $http({
        url: uploadURL + 'ruta/',
        method: "POST",
        data: {
          ruta: ruta,
          idPedido: idPedido
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

    }

  }

});
