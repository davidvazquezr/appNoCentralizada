appServices.factory('misPedidosRepository', function($http, configurationFactory) {

  var misPedidosURL = configurationFactory.globalAPI + 'user/';


  return {
   obtienePedidosHistorial: function(despacho) {
      return $http({
        url: misPedidosURL + 'pedidosHistorial/',
        method: "POST",
        params: {
          despacho: despacho
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

});
