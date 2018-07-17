appServices.factory('loginRepository', function($http, configurationFactory) {


  var loginURL = configurationFactory.globalAPI + 'user/';

  return {
    login: function(usuario, password) {
      return $http({
        url: loginURL + 'login/',
        method: "POST",
        params: {
          user: usuario,
          pass: password
        }
      });
    },
    obtenerUsuario: function(idUsuario, rol) {
      return $http({
        url: loginURL + 'usuario/',
        method: "POST",
        params: {
          idUsuario: idUsuario,
          rol: rol
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

    }
  };
});
