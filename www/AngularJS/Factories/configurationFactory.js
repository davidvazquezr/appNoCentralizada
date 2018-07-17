appServices.factory('configurationFactory', [function() {

  var interfaz = {};


   interfaz.globalAPI = 'http://189.204.141.199:3781/api/';
   interfaz.upload = 'http://189.204.141.199/FotosFactura/'
  //interfaz.globalAPI = 'http://192.168.0.202:3781/api/';
  //interfaz.upload = 'http://192.168.0.202/FotosFactura/'

  // http://192.168.20.92:3781/api/

  return interfaz;

}]);
