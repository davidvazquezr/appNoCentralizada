appServices.factory('editarRepository', function($http, configurationFactory) {


  var loginURL = configurationFactory.globalAPI + 'user/';

  return {
    updateUserApp: function(User,telefono,contrasenia) {
      return $http({
        url: loginURL + 'editarUserApp/',
        method: "POST",
        params: {
          idpersona: User,
          telefono: telefono,
          contrasenia: contrasenia
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

  };
});
