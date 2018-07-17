appServices.factory('refaccionesDbo', function($cordovaSQLite, dbFactory) {
  var self = this;

  // self.obtenerRefacciones = function (bpro) {
  //      var parameters = [bpro];
  //     return dbFactory.query("SELECT   cantidad, codigoparte, descparte  , idpedidoref, pedidobpro, precio  FROM Refacciones  ");
  //         .then(function (result) {
  //             return dbFactory.getAll(result);
  //         });
  // };

  // self.obtenerRefacciones = function (id) {
  //       var parameters = [id];
  //     return dbFactory.query("SELECT  CANTIDAD_OLD ,Cantidad, MOTIVODEVOLUCION, PMM_NUMERO, PTS_DESPARTE, PTS_IDPARTE ,Precio, idpedidoref  FROM Refacciones WHERE PMM_NUMERO = (?)", parameters)
  //         .then(function (result) {
  //             return dbFactory.getAll(result);
  //         });
  // };

  self.obtenerRefacciones = function(id) {
      var parameters = [id];
    return dbFactory.query("SELECT    CANTIDAD_OLD ,Cantidad, MOTIVODEVOLUCION, PMM_NUMERO, PTS_DESPARTE, PTS_IDPARTE ,Precio, idpedidoref  FROM Refacciones WHERE PMM_NUMERO = (?)", parameters)
      .then(function(result) {
        return dbFactory.getAll(result);
      });
  };

  self.insertarRefacciones = function(refacciones) {
    var parameters = refacciones;
    return dbFactory.queryRef("INSERT INTO Refacciones ( CANTIDAD_OLD ,Cantidad , MOTIVODEVOLUCION, PMM_NUMERO, PTS_DESPARTE, PTS_IDPARTE ,Precio , idpedidoref ) VALUES (?,?,?,?,?,?,?,? )", parameters);
  };

  self.eliminarRefacciones = function(pedido) {
    var parameters = [pedido];
    return dbFactory.query("DELETE FROM Refacciones WHERE PMM_NUMERO = (?) ", parameters);
  };


  return self;

});
