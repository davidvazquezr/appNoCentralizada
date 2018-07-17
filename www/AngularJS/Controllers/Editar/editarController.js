appControllers.controller('editarController', function($scope, $rootScope, $state, $ionicLoading, alertFactory, sessionFactory, $ionicHistory, $cordovaFileTransfer, editarRepository, verificaRedRepository, $cordovaSQLite, configurationFactory) {
  console.log('editarController')


  $scope.init = function() {
    $scope.nombreUsuario = sessionFactory.datosUsuario.nombreApp;
    $scope.telefono = sessionFactory.datosUsuario.telefono;
    $scope.contasenia = sessionFactory.datosUsuario.contrasenia;

  };



  $scope.actualiza = function(telefono, contasenia) {

    editarRepository.updateUserApp(sessionFactory.datosUsuario.per_idpersonaApp, telefono, contasenia).then(function(data) {
    
      alertFactory.message('Exito', 'Informacion Actualizada');
      setTimeout(function() {
        $state.go('consultas');
      }, 100);


    });
  };



});
