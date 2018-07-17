appControllers.controller('misPedidosController', function($scope, $rootScope, $state, $ionicLoading, $cordovaCamera, $ionicModal, $cordovaFile, $cordovaFileTransfer, $stateParams, misPedidosRepository, alertFactory, sessionFactory, configurationFactory, fotosDBO, verificaRedRepository, entregasDbo) {


  $scope.miDespacho = sessionFactory.miDespacho;
  $scope.peds = sessionFactory.pedidos;
  $scope.pedidos = [];

  $scope.init = function() {
    $scope.Usuario = sessionFactory.datosUsuario;

    if ($scope.miDespacho == 1)
      $scope.obtenerPedidosCabecera();
    else
      $scope.getPedidos();
  };

  $scope.getPedidos = function() {
    misPedidosRepository.obtienePedidosHistorial($scope.miDespacho.idDespacho)
      .then(
        function successCallback(pedidos) {
          $scope.pedidos = pedidos.data.data;
          $ionicLoading.hide()
        },
        function errorCallback(error) {
          $ionicLoading.hide()
          alertFactory.message('Error', 'No hay conexión');
        }
      );
  };

  
  $scope.obtenerPedidosCabecera = function() {
    entregasDbo.obtenerPedidosCabecera()
      .then(
        function successCallback(result) {

          result.forEach(function(pedido, k) {
            var datos = {
              'numpedido': pedido.idPedido,
              'nombreRuta': $scope.peds[0].nombreRuta,
              'desRuta': $scope.peds[0].desRuta,
              'modelo': $scope.peds[0].modelo,
              'descripcion': $scope.peds[0].descripcion,
              'anio': $scope.peds[0].anio,
              'economico': $scope.peds[0].economico,
              'cp': $scope.peds[0].cp,
              'dir': $scope.peds[0].dir
            }
            $scope.pedidos.push(datos)
          });
        },
        function errorCallback(error) {
          $ionicLoading.hide()
          alertFactory.message('Error', 'No hay conexión');
        }
      );
    $scope.miDespacho.flag = 0;
    sessionFactory.miDespacho.flag = 0;
  }

});
