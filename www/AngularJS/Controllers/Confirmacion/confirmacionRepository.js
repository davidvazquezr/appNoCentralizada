appServices.factory('confirmacionRepository', function($http, configurationFactory) {

  var confirmacionURL = configurationFactory.globalAPI + 'user/';

  return {
    detallePedido: function(idPedido) {
      return $http({
        url: confirmacionURL + 'entregaPedido/',
        method: "POST",
        params: {
          idCotizacion: idPedido
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

    },
     motivosDevolucion: function (pedido,codigo,cantidad) {
            return $http({
                url: confirmacionURL + 'motivos/',
                method: "POST",                
                headers: {
                    'Content-Type': 'application/json'
                }
            });
          
        }
  }

});
