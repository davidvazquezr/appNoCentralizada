appControllers.controller('loginController', function($ionicNavBarDelegate,$location,$scope, $rootScope, $state, $ionicLoading, $ionicHistory, loginRepository, despachoRepository, alertFactory, sessionFactory, usuarioDbo, pedidosDbo, refaccionesDbo, confirmacionRepository) {
  $scope.usuario = this;
    var path = $location.path();
  if (path.indexOf('submit') != -1)
    $ionicNavBarDelegate.showBackButton(false);
  else
    $ionicNavBarDelegate.showBackButton(true);
  $scope.verificaCampos = function() {
    if ($scope.usuario.user != undefined && $scope.usuario.user != null && $scope.usuario.user != '') {
      if ($scope.usuario.password != undefined && $scope.usuario.password != null && $scope.usuario.password != '') {
        $scope.chooseSql();
      } else {
        alertFactory.message('Advertencia', 'Favor de ingresar su contraseña');
      }
    } else {
      alertFactory.message('Advertencia', 'Favor de ingresar su usuario');
    }
  };

  $scope.chooseSql = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
    })

    // verificaRedRepository.verficaRed();


    // if ($rootScope.network == true) {

    usuarioDbo.obtenerUsuario($scope.usuario.user, $scope.usuario.password)
      .then(function successCallback(response) {


        if (response.length == 0)

          $scope.login();

        else {

          sessionFactory.datosUsuario = response[0];

          pedidosDbo.obtenerPedidosXope(sessionFactory.datosUsuario.idUsuarioPanel)
            .then(function successCallback(response) {

              console.log('pedidos X operador sql::::::::::')
              console.log(response)
              sessionFactory.pedidos = response;

              $ionicLoading.hide()

              $ionicHistory.clearCache().then(function() {
                $state.go('consultas');
              });


            }, function errorCallback(response) {
              console.log('Error al obtener pedidos X operador Sqlite');
            });

        }


      }, function errorCallback(response) {
        console.log('Error al obtener usuario Sqlite');
      });


    // } else {

    // usuarioDbo.obtenerUsuario($scope.usuario.user, $scope.usuario.password)
    //   .then(function successCallback(response) {

    //     if(response.length > 0){
         
    //       sessionFactory.datosUsuario = response[0];

    //       pedidosDbo.obtenerPedidosXope(sessionFactory.datosUsuario.idUsuarioPanel)
    //         .then(function successCallback(response) {
    //           console.log('pedidos X operador sql OffLine::::::::::')
    //           console.log(response)
    //           sessionFactory.pedidos = response;

    //           $ionicLoading.hide()

    //           $ionicHistory.clearCache().then(function() {
    //             $state.go('consultas');
    //           });

    //         }, function errorCallback(response) {
    //           console.log('Error al obtener pedidos X operador Sqlite');
    //         });

    //     }
    //     else {

    //       $ionicLoading.hide()
    //       alertFactory.message('Advertencia Login sin Señal', 'Usuario y/o contraseña incorrecto');
    //     }

    //   }, function errorCallback(response) {
    //     console.log('Error al obtener usuario Sqlite');
    //   });
    // }


  };

  $scope.login = function() {
    // $ionicLoading.show({
    //   template: '<ion-spinner icon="bubbles" class="spinner-positive"></ion-spinner>'
    // })



    loginRepository.login($scope.usuario.user, $scope.usuario.password)
      .then(
        function successCallback(response) {

          $scope.datoUsuario = response.data.data;

          if ($scope.datoUsuario == null) {


            $ionicLoading.hide();
            alertFactory.message('Advertencia', 'Usuario y/o contraseña incorrecto');
            $scope.usuario.correo = '';
            $scope.usuario.password = '';


          } else if ($scope.datoUsuario != null) {


            loginRepository.obtenerUsuario($scope.datoUsuario.idUsuarioPanel, $scope.datoUsuario.rol)
              .then(
                function successCallback(usuario) {
                  $scope.pass = $scope.usuario.password;

                  sessionFactory.datosUsuario = usuario.data.data;


                  if ($scope.datoUsuario == null) {
                    $ionicLoading.hide()
                    alertFactory.message('Advertencia', 'Usuario no registrado');
                  } else if ($scope.datoUsuario != null) {
                    $scope.motivosDevolucion();
                  }
                },
                function errorCallback(error) {
                  $ionicLoading.hide()
                  alertFactory.message('Advertencia', 'Usuario no registrado');
                }
              );


          }
        },
        function errorCallback(response) {
          $ionicLoading.hide()
          alertFactory.message('Advertencia', 'Usuario y/o contraseña incorrecto');
        }
      );
  };



  $scope.motivosDevolucion = function() {
    confirmacionRepository.motivosDevolucion().then(function(result) {
      sessionFactory.motivosDevolucion = result.data.data;
      $scope.obtenerPedidos();
    });
  };

  $scope.obtenerPedidos = function() {
    despachoRepository.obtienePedidos(sessionFactory.datosUsuario.per_idpersonaApp)
      .then(
        function successCallback(pedidos) {
          sessionFactory.pedidos = pedidos.data.data;
          $scope.obtenerRefacciones();
        },
        function errorCallback(error) {
          $ionicLoading.hide()
          alertFactory.message('Error', 'No hay conexión');
        }
      );
  };



  $scope.obtenerRefacciones = function() {
    despachoRepository.obtieneRefacciones(sessionFactory.datosUsuario.per_idpersonaApp)
      .then(
        function successCallback(refacciones) {
          sessionFactory.refacciones = refacciones.data.data;
          $scope.OffLine();
        },
        function errorCallback(error) {
          $ionicLoading.hide()
          alertFactory.message('Error', 'No hay conexión');
        }
      );
  };


  $scope.OffLine = function() {

    usuarioDbo.insertarUsuario($scope.datoUsuario.idUsuarioPanel, sessionFactory.datosUsuario.nombreApp, $scope.usuario.user, $scope.pass)
      .then(function successCallback(response) {}, function errorCallback(response) {
        alertFactory.message('Error', 'Error al guardar usario');
      });

    pedidosDbo.insertarPedidos(sessionFactory.pedidos)
      .then(function successCallback(response) {}, function errorCallback(response) {
        alertFactory.message('Error', 'Error al guardar Pedidos');
      });


    refaccionesDbo.insertarRefacciones(sessionFactory.refacciones)
      .then(function successCallback(response) {}, function errorCallback(response) {
        alertFactory.message('Error', 'Error al guardar Refacciones');
      });


    $ionicLoading.hide()
    $ionicHistory.clearCache().then(function() {
      $state.go('consultas');
    });

  };
});
