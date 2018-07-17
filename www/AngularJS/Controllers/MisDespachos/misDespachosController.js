appControllers.controller('misDespachosController', function($scope, $rootScope, $state, $ionicLoading, $ionicHistory, $cordovaCamera, $ionicModal, $cordovaFile, $cordovaFileTransfer, $stateParams, misDespachosRepository, alertFactory, sessionFactory, configurationFactory, fotosDBO, verificaRedRepository, entregasDbo) {

  $scope.proeceso = false;
  $scope.verEnProceso = false;
  $scope.noResult = false;

  $scope.init = function() {
    $scope.Usuario = sessionFactory.datosUsuario;
    if(sessionFactory.pedidos != undefined){
      $scope.folio=sessionFactory.pedidos[0].folio;
    }
    

    $scope.tipoBusqueda = [
      { id: 0, tipo: 'Todos' },
      { id: 3, tipo: 'Entrega Completa' },
      { id: 4, tipo: 'Entrega Parcial' },
      { id: 5, tipo: 'Cancelados' }
    ];
    $scope.mySelect = $scope.tipoBusqueda[0];

  //  verificaRedRepository.verficaRed();
    //if ($rootScope.network == true)
        $scope.getDespachos();
    //else $scope.noResult = true;

    $scope.getDespachosPendientes();

  };



  $scope.getDespachos = function(tipoDespacho) {

    var tipo = 0;

    if (isNaN(tipoDespacho)) tipoDespacho = 0;
    else tipo = tipoDespacho;

    misDespachosRepository.obtieneDespachosHistorial($scope.Usuario.per_idpersonaApp, tipo)
      .then(
        function successCallback(despachos) {
          $scope.despachos = despachos.data.data;
          if ($scope.despachos.length != 0) $scope.noResult = false;
          else $scope.noResult = true;
          $ionicLoading.hide()
        },
        function errorCallback(error) {
          $ionicLoading.hide()
          alertFactory.message('Error', 'No hay conexión');
        }
      );
  };




  $scope.getDespachosPendientes = function() {
    entregasDbo.obtenerPedidosCabecera()
      .then(
        function successCallback(pedidos) {
          if (pedidos.length > 0) {
            $scope.pedidosPendientes = pedidos;
            $scope.verEnProceso = true;
            $scope.enProceso();
          } else {
            $scope.verFinalizados();
			$scope.verEnProceso = false;
          }
        },
        function errorCallback(error) {
          $ionicLoading.hide()
          alertFactory.message('Error', 'No hay conexión');
        }
      );
  };


  $scope.showSelectValue = function(mySelect) {
    $scope.getDespachos(mySelect.id);
  };


  $scope.detallePedido = function(despacho) {
    sessionFactory.miDespacho = despacho;
    $ionicHistory.clearCache().then(function() {
      $state.go('misPedidos');
    });
  };

  $scope.detallePedidoPen = function(despacho) {
    sessionFactory.miDespacho = 1;
    $ionicHistory.clearCache().then(function() {
      $state.go('misPedidos');
    });
  };

  $scope.enProceso = function() {
    $scope.finalizados = false;
    $scope.proeceso = true;
    $scope.colorP = 'color:white;background-color:black';
    $scope.colorF = 'color:black;background-color:white;border:1px solid black';
  };

  $scope.verFinalizados = function() {
    $scope.finalizados = true;
    $scope.proeceso = false;
    $scope.colorP = 'color:black;background-color:white;border:1px solid black';
    $scope.colorF = 'color:white;background-color:black';
    
  };


});
