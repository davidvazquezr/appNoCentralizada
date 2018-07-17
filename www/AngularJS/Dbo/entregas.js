appServices.factory('entregasDbo', function ($cordovaSQLite, dbFactory) {
    var self = this;

    self.obtenerPedidosCabecera = function () {
        return dbFactory.query("SELECT idPedido, idOperador, situacion  FROM EntregaPedidosCabecera")
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };
   
     self.obtenerPedidosDetalle = function () {
        return dbFactory.query("SELECT idpedido  ,codigo ,detalleParte ,cantidad  ,numDevoluciones ,motivo ,situacionRef  FROM EntregaPedidosDetalle")
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };


    self.insertarPedidosCabecera = function (idPedido, idOperador,situacion) {
        var parameters =[idPedido, idOperador,situacion];
        return dbFactory.query("INSERT INTO EntregaPedidosCabecera (idPedido, idOperador, situacion) VALUES (?,?,?)", parameters);
    };


    self.insertarPedidosDetalle = function (idpedido  ,codigo ,detalleParte ,cantidad  ,numDevoluciones ,motivo ,situacionRef ) {
        var parameters =[idpedido  ,codigo ,detalleParte ,cantidad  ,numDevoluciones ,motivo ,situacionRef];
        return dbFactory.query("INSERT INTO EntregaPedidosDetalle (idpedido  ,codigo ,detalleParte ,cantidad  ,numDevoluciones ,motivo ,situacionRef ) VALUES (?,?,?,?,?,?,?)", parameters);
    };



    self.eliminarPedidosCabecera = function () {
        return dbFactory.query("DELETE FROM EntregaPedidosCabecera");
    };

        self.eliminarPedidosDetalle = function () {
        return dbFactory.query("DELETE FROM EntregaPedidosDetalle");
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