appServices.factory('despachoRepository', function($http, configurationFactory) {


  var loginURL = configurationFactory.globalAPI + 'user/';

  return {
    obtienePedidos: function(User) {
      return $http({
        url: loginURL + 'direccionesPedidos/',
        method: "POST",
        params: {
          idchofer: User
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    },
    obtieneRefacciones: function(User) {
      return $http({
        url: loginURL + 'obtieneRefacciones/',
        method: "POST",
        params: {
          idchofer: User
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  };
});
