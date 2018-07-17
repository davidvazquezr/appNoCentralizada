appControllers.controller('confirmacionController', function($scope, $rootScope, $state, $ionicLoading, $cordovaCamera, $ionicModal, $cordovaFile, $cordovaFileTransfer, $stateParams, confirmacionRepository, alertFactory, sessionFactory, configurationFactory, fotosDBO, verificaRedRepository, refaccionesDbo) {
  $scope.mostrarImagen = 0;
  $scope.nombreArchivo = this;



  $scope.init = function() {
    $scope.pedido = sessionFactory.pedido;
    console.log('CONFIRMACION pedido', sessionFactory.pedido)
    console.log($scope.pedido)
     
    refaccionesDbo.obtenerRefacciones($scope.pedido.numpedido)
      .then(function successCallback(response) {
        console.log('refacc sql::::::::::')
        console.log(response)
        $scope.piezas = response;
      }, function errorCallback(response) {
        alertFactory.message('Error', 'Error al guardar Refacciones');
      });

    $scope.motivosDevolucion();
  };



  $scope.motivosDevolucion = function() {
      $scope.motivosDevolucion =  sessionFactory.motivosDevolucion; 
      $scope.motivoInicial = $scope.motivosDevolucion[0].display;
  };
  //Modal para la seleccion del motivo de rechazo
  $ionicModal.fromTemplateUrl('motivo.html', function($ionicModal) {
    $scope.modal = $ionicModal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.abrirModal = function(id) {
    $scope.idPieza = id;
    console.log($scope.idPieza)
    $scope.modal.show();
  };
  $scope.cerrarModal = function() {
    $scope.modal.hide();
  };
  $scope.seleccionMotivo = function(motivo) {
    console.log(motivo);
    $scope.piezas[$scope.idPieza].motivo = motivo.display;
    $scope.modal.hide();
  };

  //Captura de foto con camara del celular
  $scope.tomaImagen = function() {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      targetWidth: 320,
      targetHeight: 320,
      correctOrientation: true
      
    };

    $cordovaCamera.getPicture(options).then(function(imageURI) {
      $scope.mostrarImagen = 1;
      $scope.srcImage = imageURI;
    }, function(err) {
      alertFactory.message('Error', 'Error al capturar foto : ' + response.data);
    });
  };
  $scope.sumaRechaza = function(idPieza) {
    if ($scope.piezas[idPieza].numerorechaza) {
      if ($scope.piezas[idPieza].CANTIDAD_OLD - $scope.piezas[idPieza].numerorechaza != 0) {
        $scope.piezas[idPieza].numerorechaza = $scope.piezas[idPieza].numerorechaza + 1;
        $scope.piezas[idPieza].Cantidad = $scope.piezas[idPieza].Cantidad - 1;
      }
    } else {
      $scope.piezas[idPieza].numerorechaza = 1
      $scope.piezas[idPieza].Cantidad = $scope.piezas[idPieza].Cantidad - 1;
      $scope.piezas[idPieza].motivo = $scope.motivoInicial;
    }
  };
  $scope.restaRechaza = function(idPieza) {
    if ($scope.piezas[idPieza].numerorechaza) {
      if ($scope.piezas[idPieza].numerorechaza > 0) {
        $scope.piezas[idPieza].numerorechaza = $scope.piezas[idPieza].numerorechaza - 1;
        $scope.piezas[idPieza].Cantidad = $scope.piezas[idPieza].Cantidad + 1;
      }
    }
  };
  $scope.verificaCantidad = function(numeroRechaza, idPieza) {
    if (numeroRechaza > 0 && numeroRechaza <= $scope.piezas[idPieza].Cantidad) {
      $scope.piezas[idPieza].numerorechaza = numeroRechaza;
      $scope.piezas[idPieza].Cantidad = $scope.piezas[idPieza].Cantidad - numeroRechaza;
    } else {
      $scope.piezas[idPieza].numerorechaza = '';
      $scope.piezas[idPieza].Cantidad = $scope.piezas[idPieza].CANTIDAD_OLD
    }
  };

  $scope.irEntrega = function() {
    angular.forEach($scope.piezas, function(value, key) {
      if (!value.numerorechaza) {
        $scope.piezas[key].numerorechaza = 0;
      }
    });
    sessionFactory.detallePedido = $scope.piezas;
    $state.go('entrega');
  };
});
