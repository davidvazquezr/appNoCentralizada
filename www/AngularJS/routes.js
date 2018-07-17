angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('busqueda', {
        url: '/busqueda',
        templateUrl: 'templates/busqueda.html',
        controller: 'busquedaController'
      })


      .state('cargardocumentos', {
        url: '/cargardocumentos',
        templateUrl: 'templates/cargardocumentos.html',
        controller: 'cargardocumentosController',
        cache: false

      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginController',
        cache: false
      })
      .state('consultas', {
        url: '/consultas',
        templateUrl: 'templates/consultas.html',
        controller: 'consultasController'
      })
      .state('despacho', {
        url: '/despacho',
        templateUrl: 'templates/despacho.html',
        controller: 'despachoController',
      })
      .state('confirmacion', {
        url: '/confirmacion',
        templateUrl: 'templates/confirmacion.html',
        controller: 'confirmacionController'
      })
      .state('entrega', {
        url: '/entrega',
        templateUrl: 'templates/entrega.html',
        controller: 'entregaController',
      })
       .state('misDespachos', {
        url: '/misDespachos',
        templateUrl: 'templates/misDespachos.html',
        controller: 'misDespachosController',
        cache: false
      })
       .state('misPedidos', {
        url: '/misPedidos',
        templateUrl: 'templates/misPedidos.html',
        controller: 'misPedidosController',
        cache: false
      })
       .state('editar', {
        url: '/editar',
        templateUrl: 'templates/editar.html',
        controller: 'editarController',
      })

    $urlRouterProvider.otherwise('/login')



  });
