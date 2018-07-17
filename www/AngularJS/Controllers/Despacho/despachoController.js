appControllers.controller('despachoController', function($scope, $rootScope, $state, $ionicLoading, $ionicHistory, alertFactory, sessionFactory, despachoRepository, pedidosDbo, refaccionesDbo, verificaRedRepository) {
  console.log('despachoController')
  $scope.init = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
    })
    $scope.usuario = sessionFactory.datosUsuario
    $scope.pedidos = sessionFactory.pedidos;
    $ionicLoading.hide();
  };

  $scope.detallePedido = function(pedido) {
    
    sessionFactory.pedido = pedido
    
    $ionicHistory.clearCache().then(function() {
      $state.go('confirmacion');
    });
    
  };

});
