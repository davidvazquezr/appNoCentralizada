// Ionic Starter App

//BASE DE DATOS
var db = null;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services', 'ngCordova', ])
  // .config(function($compileProvider) {
  //   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
  // })

  .run(function($ionicPlatform, $cordovaSQLite, $ionicPopup,$rootScope,verificaRedRepository , backgroundModeRepository) {
    $ionicPlatform.ready(function() {
      //Sin Internet activado en el dispositivo
      if (window.Connection) {
        if (navigator.connection.type == Connection.NONE) {
          $ionicPopup.confirm({
              title: "Internet Desconectado",
              content: "El internet no esta activado en tu dispositivo."
            })
            .then(function(result) {
              if (!result) {
                ionic.Platform.exitApp();
              }
            });
        }
      }
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);





        //cordova.plugins.backgroundMode.setDefaults({ text: 'Doing heavy tasks David.' });

        cordova.plugins.backgroundMode.enable();

        cordova.plugins.backgroundMode.onactivate = function() {
          var counter = 0;

          timer = setInterval(function() {
            counter++;

            verificaRedRepository.verficaRed();
            if ($rootScope.network == true) {
               console.log('OK Signal number::' + counter );
                   backgroundModeRepository.pedidosPendientes();
            }
             // console.log('Running desde ::' + counter + ' sec');
          }, 10000);
        };


      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      if (window.cordova) {
        // App syntax
        db = $cordovaSQLite.openDB({
          name: "refacciones.db",
          iosDatabaseLocation: 'default'
        });

      } else {
        // Ionic serve syntax
        db = window.openDatabase("refacciones.db", "1.0", "refacciones mobile", -1);
      }
      //Wait for open DB
      setTimeout(function() {
        $cordovaSQLite.execute(db, "DROP TABLE Usuario");
        $cordovaSQLite.execute(db, "DROP TABLE Pedidos");
        $cordovaSQLite.execute(db, "DROP TABLE fotos");
        $cordovaSQLite.execute(db, "DROP TABLE Refacciones");
        $cordovaSQLite.execute(db, "DROP TABLE EntregaPedidosCabecera");
        $cordovaSQLite.execute(db, "DROP TABLE EntregaPedidosDetalle");
        //Tabla Usuario
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Usuario(idUsuarioPanel integer, nombreApp text,use text, pass text)")
          .then(function(res) {
            console.log('tabla Usuario creada.');
          }, function(err) {
            console.log(err);
          });
        //Folitllas
        // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS fotos(id integer primary key, imagen text ,nomFoto text, idDocumento integer, vin text)")
        //   .then(function(res) {
        //     console.log('tabla fotos creada.');
        //   }, function(err) {
        //     console.log(err);
        //   });

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS fotos(folio text,numpedido integer, imagen text )")
          .then(function(res) {
            console.log('tabla fotos creada.');
          }, function(err) {
            console.log(err);
          });


        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Pedidos(Entre text, Nota text, NumeroInterior integer ,PER_NOMRAZON text ,Y text ,anio integer ,cp integer ,desRuta text ,descripcion text ,dir text ,economico text ,folio text ,idDireccion integer, latitud text ,longitud text ,modelo text ,nombreRuta text ,numeroSerie text ,numpedido text ,telCliente integer, tkn integer,sit integer,idOperador integer)")
          .then(function(res) {
            console.log('tabla Pedidos creada.');
          }, function(err) {
            console.log(err);
          });

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Refacciones( CANTIDAD_OLD integer ,Cantidad integer, MOTIVODEVOLUCION text, PMM_NUMERO integer, PTS_DESPARTE text, PTS_IDPARTE text,Precio integer, idpedidoref  integer)")
          .then(function(res) {
            console.log('tabla Refacciones creada.');
          }, function(err) {
            console.log(err);
          });

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS EntregaPedidosCabecera(idPedido integer, idOperador integer, situacion integer)")
          .then(function(res) {
            console.log('tabla EntregaPedidosCabecera creada.');
          }, function(err) {
            console.log(err);
          });

        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS EntregaPedidosDetalle(idpedido  integer,codigo text,detalleParte text,cantidad  integer,numDevoluciones integer,motivo text,situacionRef integer)")
          .then(function(res) {
            console.log('tabla EntregaPedidosDetalle creada.');
          }, function(err) {
            console.log(err);
          });


      }, 500);
    });
  })
