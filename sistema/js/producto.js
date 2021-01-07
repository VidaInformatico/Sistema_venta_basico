$(document).ready(function(){
  $('.btnMenu').click(function(e) {
    e.preventDefault();
    if($('nav').hasClass('viewMenu')) {
      $('nav').removeClass('viewMenu');
    }else {
      $('nav').addClass('viewMenu');
    }
  });

  $('nav ul li').click(function() {
    $('nav ul li ul').slideUp();
    $(this).children('ul').slideToggle();
  });
// Modal Agregar
    $('.add_product').click(function(e) {
      e.preventDefault();
      var producto = $(this).attr('product');
      var action = 'infoProducto';
      $.ajax({
        url: 'modal.php',
        type: 'POST',
        async: true,
        data: {action:action,producto:producto},

        success: function(response) {
        if (response != 0) {
          var info = JSON.parse(response);
        //  $('#producto_id').val(info.codproducto);
        //  $('.nameProducto').html(info.descripcion);

          $('.bodyModal').html('<form action="" method="post" name="form_add_product" id="form_add_product" onsubmit="event.preventDefault(); sendDataProduct();">'+
            '<h1>Agregar Producto</h1><br>'+
            '<h2 class="nameProducto">'+info.descripcion+'</h2>'+
            '<br>'+
            '<hr>'+
            '<input type="number" name="cantidad" id="txtCantidad" placeholder="Cantidad del Producto" required><br>'+
            '<input type="number" name="precio" id="txtPrecio" placeholder="Precio del Producto" required>'+
            '<input type="hidden" name="producto_id" id="producto_id" value="'+info.codproducto+'" required><br>'+
            '<input type="hidden" name="action" value="addProduct" required>'+
            '<div class="alert alertAddProduct"></div>'+
            '<button type="submit" class="btn_new">Agregar</button>'+
            '<a href="#" class="btn_ok closeModal" onclick="closeModal();">Cerrar</a>'+

          '</form>');
        }
        },
        error: function(error) {
          console.log(error);
        }
        });

      $('.modal').fadeIn();

    });
// modal Eliminar producto
$('.del_product').click(function(e) {
  e.preventDefault();
  var producto = $(this).attr('product');
  var action = 'infoProducto';
  $.ajax({
    url: 'modal.php',
    type: 'POST',
    async: true,
    data: {action:action,producto:producto},

    success: function(response) {
    if (response != 0) {
      var info = JSON.parse(response);
    //  $('#producto_id').val(info.codproducto);
    //  $('.nameProducto').html(info.descripcion);

      $('.bodyModal').html('<form action="" method="post" name="form_del_product" id="form_del_product" onsubmit="event.preventDefault(); delProduct();">'+
        '<h2 style="color: red; font-size: 18px;">¿Estás seguro de eliminar el Producto</h2>'+
        '<h2 class="nameProducto">'+info.descripcion+'</h2>'+
        '<hr>'+
        '<input type="hidden" name="producto_id" id="producto_id" value="'+info.codproducto+'" required><br>'+
        '<input type="hidden" name="action" value="delProduct" required>'+
        '<div class="alert alertAddProduct"></div>'+
        '<input type="submit"  value="Aceptar" class="ok"><br>'+
        '<a href="#" style="text-align: center;" class="btn_cancelar" onclick="closeModal();">Cerrar</a>'+
      '</form>');
    }
    },
    error: function(error) {
      console.log('error');
    }
    });

  $('.modal').fadeIn();

});

$('#search_proveedor').change(function(e) {
  e.preventDefault();
  var sistema = getUrl();
  location.href = sistema+'buscar_productos.php?proveedor='+$(this).val();

});

// activa campos para registrar Cliente
$('.btn_new_cliente').click(function(e) {
  e.preventDefault();
  $('#nom_cliente').removeAttr('disabled');
  $('#tel_cliente').removeAttr('disabled');
  $('#dir_cliente').removeAttr('disabled');

  $('#div_registro_cliente').slideDown();

});

// buscar Cliente
$('#dni_cliente').keyup(function(e) {
  e.preventDefault();
  var cl = $(this).val();
  var action = 'searchCliente';
  $.ajax({
    url: 'modal.php',
    type: "POST",
    async: true,
    data: {action:action,cliente:cl},
    success: function(response) {
      if (response == 0) {
        $('#idcliente').val('');
        $('#nom_cliente').val('');
        $('#tel_cliente').val('');
        $('#dir_cliente').val('');
        // mostar boton agregar
        $('.btn_new_cliente').slideDown();
      }else {
        var data = $.parseJSON(response);
        $('#idcliente').val(data.idcliente);
        $('#nom_cliente').val(data.nombre);
        $('#tel_cliente').val(data.telefono);
        $('#dir_cliente').val(data.direccion);
        // ocultar boton Agregar
        $('.btn_new_cliente').slideUp();

        // Bloque campos
        $('#nom_cliente').attr('disabled','disabled');
        $('#tel_cliente').attr('disabled','disabled');
        $('#dir_cliente').attr('disabled','disabled');
        // ocultar boto Guardar
        $('#div_registro_cliente').slideUp();
      }
    },
    error: function(error) {

    }
  });

});

// crear cliente = Ventas
$('#form_new_cliente_venta').submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: 'modal.php',
    type: "POST",
    async: true,
    data: $('#form_new_cliente_venta').serialize(),
    success: function(response) {
      if (response  != 0) {
        // Agregar id a input hidden
        $('#idcliente').val(response);
        //bloque campos
        $('#nom_cliente').attr('disabled','disabled');
        $('#tel_cliente').attr('disabled','disabled');
        $('#dir_cliente').attr('disabled','disabled');
        // ocultar boton Agregar
        $('.btn_new_cliente').slideUp();
        //ocultar boton Guardar
        $('#div_registro_cliente').slideDown();
      }
    },
    error: function(error) {
    }
  });
});

// buscar producto = Ventas
$('#txt_cod_producto').keyup(function(e) {
  e.preventDefault();
  var productos = $(this).val();
  if (productos == "") {
    $('#txt_descripcion').html('-');
    $('#txt_existencia').html('-');
    $('#txt_cant_producto').val('0');
    $('#txt_precio').html('0.00');
    $('#txt_precio_total').html('0.00');

    //Bloquear Cantidad
    $('#txt_cant_producto').attr('disabled', 'disabled');
    // Ocultar Boto Agregar
    $('#add_product_venta').slideUp();
  }
  var action = 'infoProducto';
  if (productos != '') {
  $.ajax({
    url: 'modal.php',
    type: "POST",
    async: true,
    data: {action:action,producto:productos},
    success: function(response){
      if(response == 0) {
        $('#txt_descripcion').html('-');
        $('#txt_existencia').html('-');
        $('#txt_cant_producto').val('0');
        $('#txt_precio').html('0.00');
        $('#txt_precio_total').html('0.00');

        //Bloquear Cantidad
        $('#txt_cant_producto').attr('disabled','disabled');
        // Ocultar Boto Agregar
        $('#add_product_venta').slideUp();


      }else{

        var info = JSON.parse(response);
        $('#txt_descripcion').html(info.descripcion);
        $('#txt_existencia').html(info.existencia);
        $('#txt_cant_producto').val('1');
        $('#txt_precio').html(info.precio);
        $('#txt_precio_total').html(info.precio);
        // Activar Cantidad
        $('#txt_cant_producto').removeAttr('disabled');
        // Mostar boton Agregar
        $('#add_product_venta').slideDown();

      }
    },
    error: function(error) {
    }
  });
  $('#txt_descripcion').html('-');
  $('#txt_existencia').html('-');
  $('#txt_cant_producto').val('0');
  $('#txt_precio').html('0.00');
  $('#txt_precio_total').html('0.00');

  //Bloquear Cantidad
  $('#txt_cant_producto').attr('disabled','disabled');
  // Ocultar Boto Agregar
  $('#add_product_venta').slideUp();

  }
});

// calcular el Total
$('#txt_cant_producto').keyup(function(e) {
  e.preventDefault();
  var precio_total = $(this).val() * $('#txt_precio').html();
  var existencia = parseInt($('#txt_existencia').html());
  $('#txt_precio_total').html(precio_total);
  // Ocultat el boton Agregar si la cantidad es menor que 1
  if (($(this).val() < 1 || isNaN($(this).val())) || ($(this).val() > existencia)){
    $('#add_product_venta').slideUp();
  }else {
    $('#add_product_venta').slideDown();
  }
});

// Agregar producto al detalle_venta
$('#add_product_venta').click(function(e) {
  e.preventDefault();
  if ($('#txt_cant_producto').val() > 0) {
    var codproducto = $('#txt_cod_producto').val();
    var cantidad = $('#txt_cant_producto').val();
    var action = 'addProductoDetalle';
    $.ajax({
      url: 'modal.php',
      type: 'POST',
      async: true,
      data: {action:action,producto:codproducto,cantidad:cantidad},
      success: function(response) {
        
        if (response != 'error') {
          var info = JSON.parse(response);
          $('#detalle_venta').html(info.detalle);
          $('#detalle_totales').html(info.totales);
          $('#txt_cod_producto').val('');
          $('#txt_descripcion').html('-');
          $('#txt_existencia').html('-');
          $('#txt_cant_producto').val('0');
          $('#txt_precio').html('0.00');
          $('#txt_precio_total').html('0.00');

          // Bloquear cantidad
          $('#txt_cant_producto').attr('disabled','disabled');

          // Ocultar boton agregar
          $('#add_product_venta').slideUp();
        }else {
          console.log('No hay dato');
        }
        viewProcesar();
      },
      error: function(error) {

      }
    });
  }
});

// anular venta
$('#btn_anular_venta').click(function(e) {
  e.preventDefault();
  var rows = $('#detalle_venta tr').length;
  if (rows > 0) {
    var action = 'anularVenta';
    $.ajax({
      url: 'modal.php',
      type: 'POST',
      async: true,
      data: {action:action},
      success: function(response) {
        if (response != 0) {
          location.reload();
        }
      },
      error: function(error) {

      }
    });
  }
});
// facturar venta
$('#btn_facturar_venta').click(function(e) {
  e.preventDefault();
  var rows = $('#detalle_venta tr').length;
  if (rows > 0) {
    var action = 'procesarVenta';
    var codcliente = $('#idcliente').val();
    $.ajax({
      url: 'modal.php',
      type: 'POST',
      async: true,
      data: {action:action,codcliente:codcliente},
      success: function(response) {
      if (response != 0) {
        var info = JSON.parse(response);
        //console.log(info);
        generarPDF(info.codcliente,info.nofactura);
        location.reload();
      }else {
        console.log('no hay dato');
      }
      },
      error: function(error) {

      }
    });
  }
});

//Ver Factura
$('.view_factura').click(function(e) {
  e.preventDefault();

  var codCliente = $(this).attr('cl');
  var noFactura = $(this).attr('f');

  generarPDF(codCliente,noFactura);
});

// Cambiar contraseña
$('.newPass').keyup(function() {
  validaPass();
});

// cambiar contraseña
$('#frmChangePass').submit(function(e){
  e.preventDefault();
  var passActual = $('#actual').val();
  var passNuevo = $('#nueva').val();
  var passconfir = $('#confirmar').val();
  var action = "changePasword";
  if (passNuevo != passconfir) {
    $('.alertChangePass').html('<p style="color:red;">Las contraseñas no Coinciden</p>');
    $('.alertChangePass').slideDown();
    return false;
    }
  if (passNuevo.length < 5) {
  $('.alertChangePass').html('<p style="color:orangered;">Las contraseñas deben contener como mínimo 5 caracteres');
  $('.alertChangePass').slideDown();
  return false;
  }
  $.ajax({
    url: 'modal.php',
    type: 'POST',
    async: true,
    data: {action:action,passActual:passActual,passNuevo:passNuevo},
    success: function(response) {
      if (response != 'error') {
        var info = JSON.parse(response);
        if (info.cod == '00') {
          $('.alertChangePass').html('<p style="color:green;">'+info.msg+'</p>');
          $('#frmChangePass')[0].reset();
        }else {
          $('.alertChangePass').html('<p style="color:green;">'+info.msg+'</p>');
        }
        $('.alertChangePass').slideDown();
      }
    },
    error: function(error) {
    }
  });
});

$(".confirmar").submit(function(e) {
  e.preventDefault();
  Swal.fire({
    title: 'Esta seguro de eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'SI, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.submit();
    }
  })
})


}); // fin ready

function validaPass() {
  var passNuevo = $('#nueva').val();
  var confirmarPass = $('#confirmar').val();
  if (passNuevo != confirmarPass) {
    $('.alertChangePass').html('<p style="color:red;">Las contraseñas no Coinciden</p>');
    $('.alertChangePass').slideDown();
    return false;
  }
if (passNuevo.length < 5) {
  $('.alertChangePass').html('<p style="color:orangered;">Las contraseñas deben contener como mínimo 5 caracteres');
  $('.alertChangePass').slideDown();
  return false;
}

$('.alertChangePass').html('<p style="color:blue;">Las contraseñas Coinciden.</p>');
$('.alertChangePass').slideDown();
}
function generarPDF(cliente,factura) {
  url = 'factura/generaFactura.php?cl='+cliente+'&f='+factura;
  window.open(url, '_blank');
}
function del_product_detalle(correlativo) {
  var action = 'delProductoDetalle';
  var id_detalle = correlativo;
  $.ajax({
    url: 'modal.php',
    type: "POST",
    async: true,
    data: {action:action,id_detalle:id_detalle},
    success: function(response) {
        if (response != 0) {
        var info = JSON.parse(response);
        $('#detalle_venta').html(info.detalle);
        $('#detalle_totales').html(info.totales);
        $('#txt_cod_producto').val('');
        $('#txt_descripcion').html('-');
        $('#txt_existencia').html('-');
        $('#txt_cant_producto').val('0');
        $('#txt_precio').html('0.00');
        $('#txt_precio_total').html('0.00');

        // Bloquear cantidad
        $('#txt_cant_producto').attr('disabled','disabled');

        // Ocultar boton agregar
        $('#add_product_venta').slideUp();
      }else {
        $('#detalle_venta').html('');
        $('#detalle_totales').html('');


      }
      viewProcesar();
    },
    error: function(error) {
      
    }
  });
}

// mostrar/ ocultar boton Procesar
function viewProcesar() {
  if ($('#detalle_venta tr').length > 0){
    $('#btn_facturar_venta').show();
    $('#btn_anular_venta').show();
  }else {
    $('#btn_facturar_venta').hide();
    $('#btn_anular_venta').hide();
  }
}

function searchForDetalle(id) {
  var action = 'searchForDetalle';
  var user = id;
  $.ajax({
    url: 'modal.php',
    type: "POST",
    async: true,
    data: {action:action,user:user},
    success: function(response) {
      if (response == 0) {
        console.log('');
      }else {
        var info = JSON.parse(response);
        $('#detalle_venta').html(info.detalle);
        $('#detalle_totales').html(info.totales);
      }
      viewProcesar();
    },
    error: function(error) {

    }
  });
}

function getUrl() {
  var loc = window.location;
  var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/')+ 1);
  return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
// funcion para agregar producto
function sendDataProduct() {
  $('.alertAddProduct').html('');
  $.ajax({
    url: 'modal.php',
    type: 'POST',
    async: true,
    data: $('#form_add_product').serialize(),
    success: function(response) {
      if (producto == 'error') {
        $('.alertAddProduct').html('<p style="color : red;">Error al agregar producto.</p>');

      }else {
        var info = JSON.parse(response);
        $('.row'+info.producto_id+' .celExistencia').html(info.nueva_existencia);
        $('.row'+info.producto_id+' .celPrecio').html(info.nuevo_precio);
        $('#txtCantidad').val('');
        $('#txtPrecio').val('');
        $('.alertAddProduct').html('<p>Producto Agregado Corectamente.</p>');

      }
    },
    error: function(error) {
      console.log(error);

    }
  });

}
// funcion para elimar producto
function delProduct() {
  var pr = $('#producto_id').val();
  $('.alertAddProduct').html('');
  $.ajax({
    url: 'modal.php',
    type: 'POST',
    async: true,
    data: $('#form_del_product').serialize(),
    success: function(response) {

      if (response == 'error') {
        $('.alertAddProduct').html('<p style="color : red;">Error al eliminar producto.</p>');

      }else {

        $('.row'+pr).remove();
        $('#form_del_product .ok').remove();
        $('.alertAddProduct').html('<p>Producto Eliminado Corectamente.</p>');

      }
    },
    error: function(error) {
      console.log(error);

    }
  });

}
