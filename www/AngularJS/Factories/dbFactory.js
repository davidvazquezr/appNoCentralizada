appServices.factory('dbFactory', function($cordovaSQLite, $q, $ionicPlatform) {

  var self = this;

  // Handle query's and potential errors
  self.query = function(query, parameters) {
    parameters = parameters || [];
    var q = $q.defer();


    $ionicPlatform.ready(function() {

      $cordovaSQLite.execute(db, query, parameters)
        .then(function(result) {
          q.resolve(result);
        }, function(error) {
          console.warn('Error al consultar base de datos.');
          console.warn(error);
          q.reject(error);
        });

    });

    return q.promise;
  };

  self.queryPedidos = function(query, pedidos) {
    pedidos = pedidos || [];

    console.log('insert SQL');
    console.log(pedidos);
    var q = $q.defer();

    for (var i = 0; i < pedidos.length; i++) {

    var parametersSub=[pedidos[i].Entre, pedidos[i].Nota , pedidos[i].NumeroInterior ,pedidos[i].PER_NOMRAZON ,pedidos[i].Y ,pedidos[i].anio ,pedidos[i].cp ,pedidos[i].desRuta ,pedidos[i].descripcion ,pedidos[i].dir ,pedidos[i].economico ,pedidos[i].folio ,pedidos[i].idDireccion ,pedidos[i].latitud ,pedidos[i].longitud ,pedidos[i].modelo ,pedidos[i].nombreRuta ,pedidos[i].numeroSerie ,pedidos[i].numpedido ,pedidos[i].telCliente,pedidos[i].tkn,pedidos[i].sit,pedidos[i].idOperador];

      

      $ionicPlatform.ready(function() {
        
        $cordovaSQLite.execute(db, query, parametersSub)
          .then(function(result) {
            q.resolve(result);
          }, function(error) {
            console.warn('Error al consultar base de datos.');
            console.warn(error);
            q.reject(error);
          });

      });

    }
    return q.promise;
  };


  self.queryRef = function(query, refacciones) {
    refacciones = refacciones || [];
   var q = $q.defer();


  

    for (var i = 0; i < refacciones.length; i++) {

  

      var parametersSub = [refacciones[i].CANTIDAD_OLD ,refacciones[i].Cantidad , refacciones[i].MOTIVODEVOLUCION, refacciones[i].PMM_NUMERO, refacciones[i].PTS_DESPARTE, refacciones[i].PTS_IDPARTE ,refacciones[i].Precio, refacciones[i].idpedidoref ];
     
      

      $ionicPlatform.ready(function() {
        
        $cordovaSQLite.execute(db, query, parametersSub)
          .then(function(result) {
            q.resolve(result);
          }, function(error) {
            console.warn('Error al consultar base de datos.');
            console.warn(error);
            q.reject(error);
          });

      });

    }
    return q.promise;
  };


  // Proces a result set
  self.getAll = function(result) {
    var output = [];

    for (var i = 0; i < result.rows.length; i++) {
      output.push(result.rows.item(i));
    }
    return output;
  };

  // Proces a single result
  self.getById = function(result) {
    var output = null;
    output = angular.copy(result.rows.item(0));
    return output;
  };

  return self;

});
