appControllers.controller('consultasController', function($scope, $rootScope, $state, $ionicLoading,refaccionesDbo,pedidosDbo,usuarioDbo, alertFactory, sessionFactory, $ionicHistory,$cordovaFileTransfer, entregaRepository, entregasDbo,verificaRedRepository,fotosDBO,$cordovaSQLite,configurationFactory) {
  console.log('consultasController')
  $scope.init = function() {
    $scope.nombreUsuario = sessionFactory.datosUsuario.nombreApp;  
    //$scope.consulta()
  };
  $scope.detalle = function() {
    console.log('Entre a DEtalle')
    $ionicHistory.clearCache().then(function() {
      $state.go('despacho');
    });
  };
  $scope.misDespachos = function() {
    $state.go('misDespachos');
  };
  $scope.salir = function() {
  //  $ionicHistory.clearCache().then(function() {
        $state.go('login');
  //  });
  };

  $scope.editar = function() {
    $state.go('editar');
  };



$scope.consulta=function(){


  usuarioDbo.obtenerUsuarios()
    .then(function successCallback(response) {
      console.log('usuarios sql::::::::::')
      console.log(response)   
    }, function errorCallback(response) {
      alertFactory.message('Error', 'Error al traer usuarios');
    });



   pedidosDbo.obtenerPedidos()
      .then(function successCallback(response) {
        console.log('pedidos sql::::::::::')
        console.log(response)   
      }, function errorCallback(response) {
        alertFactory.message('Error', 'Error al traer pedidos');
      });


     refaccionesDbo.obtenerRefacciones(93760)
      .then(function successCallback(response) {
        console.log('refacc sql::::::::::')
        console.log(response)
     
      }, function errorCallback(response) {
        alertFactory.message('Error', 'Error al traer Refacciones');
      });

};

});
