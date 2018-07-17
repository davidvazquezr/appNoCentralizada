appServices.factory('usuarioDbo', function ($cordovaSQLite, dbFactory) {
    var self = this;

    self.obtenerUsuario = function (user,password) {
         var parameters = [user,password];
        return dbFactory.query("SELECT idUsuarioPanel, nombreApp,use , pass FROM Usuario WHERE use = (?) AND pass = (?)", parameters)
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };
      self.obtenerUsuarios = function () {
        return dbFactory.query("SELECT idUsuarioPanel, nombreApp,use , pass FROM Usuario")
            .then(function (result) {
                return dbFactory.getAll(result);
            });
    };
    self.insertarUsuario = function (idUsuarioPanel, nombreApp, use, pass) {
        var parameters =[idUsuarioPanel, nombreApp,use , pass];
        return dbFactory.query("INSERT INTO Usuario (idUsuarioPanel, nombreApp, use, pass) VALUES (?,?,?,?)", parameters);
    };

    self.eliminarUsuario = function (operador) {
        var parameters = [operador];
        return dbFactory.query("DELETE FROM Usuario WHERE idUsuarioPanel = (?)",parameters);
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