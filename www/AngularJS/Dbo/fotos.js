appServices.factory('fotosDBO', function ($cordovaSQLite, dbFactory) {
    var self = this;

    self.all = function () {
        return dbFactory.query("SELECT folio , numpedido , imagen FROM fotos")
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };
    self.add = function (folio, numpedido, imagen) {
        var parameters = [folio, numpedido, imagen];
        return dbFactory.query("INSERT INTO fotos (folio , numpedido , imagen) VALUES (?,?,?)", parameters);
    };

    self.removeAll = function () {
        return dbFactory.query("DELETE FROM fotos");
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