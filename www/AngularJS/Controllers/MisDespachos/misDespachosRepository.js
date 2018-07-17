appServices.factory('misDespachosRepository', function($http, configurationFactory) {

  var despachosURL = configurationFactory.globalAPI + 'user/';


  return {
   obtieneDespachosHistorial: function(User,tipo) {
      return $http({
        url: despachosURL + 'despachosHistorial/',
        method: "POST",
        params: {
          idchofer: User,
          tipo: tipo
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }

});
