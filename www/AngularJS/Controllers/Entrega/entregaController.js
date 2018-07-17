appControllers.controller('entregaController', function($scope, $rootScope, $state, $ionicLoading, $cordovaCamera, $ionicModal, $cordovaFile, $cordovaFileTransfer, $stateParams, $ionicPopup, $ionicHistory, entregaRepository, alertFactory, sessionFactory, configurationFactory, fotosDBO, verificaRedRepository, entregasDbo, despachoRepository,usuarioDbo, pedidosDbo, refaccionesDbo) {

  $scope.mostrarImagen = 0;
  $scope.nombreArchivo = this;

  $scope.init = function() {
    $scope.usuario = sessionFactory.datosUsuario
    $scope.pedido = sessionFactory.pedido;
    $scope.piezas = sessionFactory.detallePedido;
    console.log('ENTREGA pedido', sessionFactory.pedido)
  };

  $scope.irConfirmacion = function(detallePedido) {
    console.log(detallePedido, 'Soy lo que voy a INSERTAR :::::::::::')
    $scope.entregaPedido(detallePedido);
  };

  $scope.Signal = function(detallePedido) {
    var situacionPedido = 0;
    var situacionRef = 0;
    $scope.vea = 'despacho';

    detallePedido.forEach(function(pedido, k) {
      if (pedido.numerorechaza > 0) situacionPedido = 4;
    });

    if (situacionPedido == 0) situacionPedido = 3

    entregaRepository.setPedidoCabecera($scope.pedido.numpedido, $scope.usuario.per_idpersonaApp, situacionPedido).then(function(data) {

        detallePedido.forEach(function(pedido, k) {

            if (pedido.numerorechaza > 0) {
              situacionRef = 2
            } else {
              situacionRef = 1;
              pedido.motivo = 'Ninguno';

            }

            entregaRepository.setPedidonDetalle(pedido.PMM_NUMERO, pedido.PTS_IDPARTE, pedido.PTS_DESPARTE, pedido.CANTIDAD_OLD, pedido.numerorechaza, pedido.motivo, situacionRef).then(function(result) {
                console.log('Despues de insertar el detalle')
                console.log(result);
                if (result.data.veA == 1) {
                  $scope.vea = 'consultas';


                  pedidosDbo.eliminarPedidos($scope.usuario.per_idpersonaApp)
                    .then(function successCallback(response) {

                      refaccionesDbo.eliminarRefacciones($scope.pedido.numpedido)
                        .then(function successCallback(response) {

                          usuarioDbo.eliminarUsuario($scope.usuario.per_idpersonaApp)
                            .then(function successCallback(response) {}, function errorCallback(response) {
                              alertFactory.message('Error', 'Error al ELIMINAR Usuario');
                            });

                        }, function errorCallback(response) {
                          alertFactory.message('Error', 'Error al ELIMINAR Refacciones');
                        });

                    }, function errorCallback(response) {
                      alertFactory.message('Error', 'Error al ELIMINAR Pedidos');
                    });
                }
              
            });

        }); 
        $scope.refreshPedidoref(); 
        $ionicLoading.hide();
        $ionicPopup.show({
        title: 'Pedido Entregado',
        scope: $scope,
        buttons: [{
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            $ionicHistory.clearCache().then(function() {
              $state.go($scope.vea);
            });
          }
        }]
      });

    });

};

$scope.noSignal = function(detallePedido) {
  var situacionPedido = 0;
  var situacionRef = 0;

  detallePedido.forEach(function(pedido, k) {
    if (pedido.numerorechaza > 0) situacionPedido = 4;
  });

  if (situacionPedido == 0) situacionPedido = 3

  sessionFactory.pedidos.forEach(function(pedido, k) {
    if (pedido.numpedido == $scope.pedido.numpedido) pedido.sit = 0;
  });


  entregasDbo.insertarPedidosCabecera($scope.pedido.numpedido, $scope.usuario.per_idpersonaApp, situacionPedido)
    .then(function successCallback(response) {

      detallePedido.forEach(function(pedido, k) {

        if (pedido.numerorechaza > 0) {
          situacionRef = 2
        } else {
          situacionRef = 1;
          pedido.motivo = 'Ninguno';

        }

        entregasDbo.insertarPedidosDetalle(pedido.PMM_NUMERO, pedido.PTS_IDPARTE, pedido.PTS_DESPARTE, pedido.CANTIDAD_OLD, pedido.numerorechaza, pedido.motivo, situacionRef)
          .then(function successCallback(response) {
            console.log('Exito Detalle del pedido')
          }, function errorCallback(response) {
            alertFactory.message('Error', 'Error al guardar Pedidos');
          });
      });

      $ionicLoading.hide()
      $ionicPopup.show({
        title: 'Pedido Entregado',
        scope: $scope,
        buttons: [{
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function(e) {
            $ionicHistory.clearCache().then(function() {
              $state.go('despacho');
            });
          }
        }]
      });

    }, function errorCallback(response) {
      alertFactory.message('Error', 'Error al guardar Pedidos');
    });
};

//Modal para la toma de foto 
$ionicModal.fromTemplateUrl('my-modal.html', {
  scope: $scope,
  animation: 'slide-in-up'
}).then(function(modal) {
  $scope.modal = modal;
});
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
    console.log($scope.srcImage, 'SOY LA FOTO')
  }, function(err) {
    alertFactory.message('Error', 'Error al capturar foto : ' + response.data);
  });
};

$scope.verificaToken = function(token) {
  $ionicLoading.show({
    template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
  })

  if ($scope.pedido.tkn == token) {

    verificaRedRepository.verficaRed();
    if ($rootScope.network == true) {

      $scope.guardarImagen();

    } else {

      fotosDBO.add($scope.pedido.folio, $scope.pedido.numpedido, $scope.srcImage)
        .then(function successCallback(response) {
          $scope.noSignal($scope.piezas);
        }, function errorCallback(response) {
          alertFactory.message('Error', 'Error al guardar Pedidos');
        });
    }
  } else {
    $ionicLoading.hide();
    alertFactory.message('Error', 'Token Incorrecto');
  }
};

$scope.guardarImagen = function() {

  var options = {
    fileKey: $scope.pedido.numpedido,
    fileName: $scope.pedido.folio + '--' + $scope.pedido.numpedido + ".jpg",
    chunkedMode: false,
    mimeType: "image/jpeg",
    targetWidth: 100,
    targetHeight: 100
  };

  var urlImagen = $scope.srcImage.split('///');
  var urlApi = configurationFactory.globalAPI + 'upload/upload/';
  console.log('Entre en el guardado de imagen')

  entregaRepository.crearCarpeta($scope.pedido.numpedido).then(function(result) {
    $scope.carpeta = result.data.data[0];
    console.log($scope.carpeta, 'Creo la carpeta??')

    if ($scope.carpeta.respuesta == 1) {
      console.log('Exito total jajaja ', urlApi)
      console.log($scope.srcImage, 'FOTOOO')
      $cordovaFileTransfer.upload(urlApi, $scope.srcImage, options).then(function(result) {
        console.log(result)
        console.log("SUCCESS: " + result.response);
        // if (result.response.respuesta == 1) {
        entregaRepository.cargaRuta(configurationFactory.upload + $scope.pedido.numpedido + '/' + $scope.pedido.folio + '--' + $scope.pedido.numpedido + ".jpg", $scope.pedido.numpedido)
          .then(
            function successCallback(result) {
              console.log('UPDATE', result)
              if (result.data.data[0].respuesta == 1) {
                // $scope.entregaPedido($scope.piezas);
                $scope.Signal($scope.piezas);
              } else {
                $ionicLoading.hide()
                alertFactory.message('Advertencia', 'Problemas al subir la imagen');
              }
            },
            function errorCallback(error) {
              $ionicLoading.hide()
              alertFactory.message('Advertencia', 'Problemas al subir la imagen');
            }
          );
        // }
        // $ionicLoading.hide()
      }, function(err) {
        console.log("ERROR: " + err);
        $ionicLoading.hide()
      }, function(progress) {
        // constant progress updates
      });
    } else {
      console.log('Ocurrio algo aaaa')
    }
  });
  console.log(options, 'SOY LO QUE SE ENVIARA AL SERVER')
};


$scope.refreshPedidoref = function() {

  despachoRepository.obtienePedidos(sessionFactory.datosUsuario.per_idpersonaApp)
    .then(
      function successCallback(pedidos) {
        sessionFactory.pedidos = pedidos.data.data;
      },
      function errorCallback(error) {
        alertFactory.message('Error', 'No hay conexión');
      }
    );


  despachoRepository.obtieneRefacciones(sessionFactory.datosUsuario.per_idpersonaApp)
    .then(
      function successCallback(refacciones) {
        sessionFactory.refacciones = refacciones.data.data;
      },
      function errorCallback(error) {
        alertFactory.message('Error', 'No hay conexión');
      }
    );
};


});
