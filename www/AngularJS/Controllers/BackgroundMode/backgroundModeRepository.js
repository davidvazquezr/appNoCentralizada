appServices.factory('backgroundModeRepository', function( $cordovaFileTransfer, entregaRepository, entregasDbo,fotosDBO,$cordovaSQLite,configurationFactory) {

  return {
    pedidosPendientes: function() {

//Ford

     entregasDbo.obtenerPedidosCabecera()
      .then(function successCallback(response) {
          if (response.length > 0) {
            response.forEach(function(pedido, k) {
              entregaRepository.setPedidoCabecera(pedido.idPedido, pedido.idOperador, pedido.situacion).then(function(data) {
                console.log('Despues de insertar la cabecera pendiente');
              });
            });
            //  $cordovaSQLite.execute(db, "DELETE TABLE EntregaPedidosCabecera");
           entregasDbo.eliminarPedidosCabecera();
          }
          else { console.log('no hay elementos en EntregaPedidosCabecera'); }
        },
        function errorCallback(response) {
          console.log('Error Despues de insertar la cabecera pendiente');
        });


	

    entregasDbo.obtenerPedidosDetalle()
      .then(function successCallback(response) {
        if (response.length > 0) {
          response.forEach(function(refaccion, k) {
            entregaRepository.setPedidonDetalle(refaccion.idpedido, refaccion.codigo, refaccion.detalleParte, refaccion.cantidad, refaccion.numDevoluciones, refaccion.motivo, refaccion.situacionRef).then(function(result) {
              console.log('Despues de insertar el detalle pendiente');
            });
          });
         // $cordovaSQLite.execute(db, "DELETE TABLE EntregaPedidosDetalle");
         entregasDbo.eliminarPedidosDetalle();
        }  else { console.log('no hay elementos en EntregaPedidosDetalle'); }
      }, function errorCallback(response) {
        console.log('Error Despues de insertar el detalle pendiente');
      });
	  
	  
	  
	    fotosDBO.all()
      .then(function successCallback(response) {
        if (response.length > 0) {

          response.forEach(function(pedido, k) {

            var options = {
              fileKey: pedido.numpedido,
              fileName: pedido.folio + '--' + pedido.numpedido + ".jpg",
              chunkedMode: false,
              mimeType: "image/jpeg",
              targetWidth: 100,
              targetHeight: 100
            };


            var urlImagen = pedido.imagen.split('///');
            var urlApi = configurationFactory.globalAPI + 'upload/upload/';
            console.log('Entre en el guardado de imagen')


            entregaRepository.crearCarpeta(pedido.numpedido).then(function(result) {

            	var carpeta;
              carpeta = result.data.data[0];
              console.log(carpeta, 'Creo la carpeta??')


              if (carpeta.respuesta == 1) {
                console.log('Exito total jajaja ', urlApi)
                console.log(pedido.imagen, 'FOTOOO')
                $cordovaFileTransfer.upload(urlApi, pedido.imagen, options).then(function(result) {
                  console.log(result)
                  console.log("SUCCESS: " + result.response);

                  entregaRepository.cargaRuta(configurationFactory.upload + pedido.numpedido + '/' + pedido.folio + '--' + pedido.numpedido + ".jpg", pedido.numpedido)
                    .then(
                      function successCallback(result) {
                        console.log('UPDATE', result)
                        if (result.data.data[0].respuesta == 1) {
                          console.log('foto subida correctamente fin')

                        } else {
                          console.log('foto  error  fin')
                        }
                      },
                      function errorCallback(error) {
                        console.log('Advertencia', 'Problemas al subir la imagen en cargaRuta');
                      }
                    );

                }, function(err) {
                  console.log("ERROR en upload: " + err);

                }, function(progress) {

                });
              } else {
                console.log('Ocurrio algo al crear carpeta')
              }
            });
          });
         //   $cordovaSQLite.execute(db, "DELETE TABLE fotos");
         fotosDBO.removeAll();

        } else { console.log('no hay elementos en fotos'); }
      }, function errorCallback(response) {
        console.log('Error al traer   el fotos pendientes');
      });



  

    }
  };
});
