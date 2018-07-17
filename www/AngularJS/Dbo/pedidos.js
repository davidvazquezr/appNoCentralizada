appServices.factory('pedidosDbo', function ($cordovaSQLite, dbFactory) {
    var self = this;

    self.obtenerPedidos = function () {
        return dbFactory.query("SELECT Entre, Nota ,NumeroInterior ,PER_NOMRAZON ,Y ,anio ,cp ,desRuta ,descripcion ,dir ,economico ,folio ,idDireccion ,latitud ,longitud ,modelo ,nombreRuta ,numeroSerie ,numpedido ,telCliente,tkn,sit,idOperador  FROM Pedidos")
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };

     self.obtenerPedidosXope = function (operador) {
         var parameters = [operador];
        return dbFactory.query("SELECT Entre, Nota ,NumeroInterior ,PER_NOMRAZON ,Y ,anio ,cp ,desRuta ,descripcion ,dir ,economico ,folio ,idDireccion ,latitud ,longitud ,modelo ,nombreRuta ,numeroSerie ,numpedido ,telCliente,tkn,sit,idOperador  FROM Pedidos WHERE idOperador = (?)",parameters)
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };
    // self.insertarPedidos = function (pedidos) {
    //     var parameters = pedidos;
    //     return dbFactory.queryObj("INSERT INTO Pedidos (Entre, Nota ,NumeroInterior ,PER_NOMRAZON ,Y ,anio ,cp ,desRuta ,descripcion ,dir ,economico ,folio ,idDireccion ,latitud ,longitud ,modelo ,nombreRuta ,numeroSerie ,numpedido ,telCliente  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", parameters);
    // };
     self.insertarPedidos = function (pedidos) {
        var parameters = pedidos;
        return dbFactory.queryPedidos("INSERT INTO Pedidos (Entre, Nota ,NumeroInterior ,PER_NOMRAZON ,Y ,anio ,cp ,desRuta ,descripcion ,dir ,economico ,folio ,idDireccion ,latitud ,longitud ,modelo ,nombreRuta ,numeroSerie ,numpedido ,telCliente,tkn,sit,idOperador  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", parameters);
    };



    self.eliminarPedidos = function (operador) {
        var parameters = [operador];
        return dbFactory.query("DELETE FROM Pedidos WHERE idOperador = (?)", parameters);
    };
    //    self.get = function (id) {
    //        var parameters = [id];
    //        return dbFactory.query("SELECT token, cliente FROM session WHERE id = (?)", parameters)
    //            .then(function (result) {
    //                return dbFactory.getById(result);
    //            });
    //    };
    //
    //    self.add = function (sessionobj) {
    //        var parameters = [sessionobj.token, sessionobj.cliente];
    //        return dbFactory.query("INSERT INTO session (token, cliente) VALUES (?,?)", parameters);
    //    };
    //
    //    self.remove = function (sessionobj) {
    //        var parameters = [sessionobj.token];
    //        return dbFactory.query("DELETE FROM session WHERE token = (?)", parameters);
    //    };
    //
    //    self.removeAll = function () {
    //        return dbFactory.query("DELETE FROM session");
    //    };
    //
    //    self.update = function (origMember, editMember) {
    //        var parameters = [editMember.token, editMember.cliente, origMember.id];
    //        return dbFactory.query("UPDATE team SET token = (?), cliente = (?) WHERE id = (?)", parameters);
    //    };

    return self;

});