$(document).ready(function () {

    var contenedor = $('#contenedor');
    var numeroFotos = 70;
    var extension;
    var numeroColumnas;
    var anchoContenedor;
    var anchoColumnas;
    var anchoContenedor;
    var arrayMinimos = [];
    var contenedor = $('#contenedor');
    var imagen = $('.imagen');
    var cortinaBlanca;
    var primerScroll = true;
    var numRueda= 1;
    var altoVentana = $(window).height();
    var botonMenu = document.getElementById('menu-icon');
    var scrollPosition = 0;
    var mostrarCortina = true;
   
    
   $('h1').fitText(1, {minFontSize: '16px', maxFontSize: '120px'})
   $('h1').show();
    calcularColumnas();         //Calculo las columnas en función del tipo de pantalla con la función que he creado más abajo.
    calculoPosicion();

    for (let i = 0; i < datos.length; i++) {
        $('.cortina').eq(i).html('<h3 class="titulo">'+datos[i].titulo +'</h3>');

    }
    
/*------------------------EVENTOS----------------------------------------*/  
    $(window).resize(function () {  //Evento para cuando se redimensiona la pantalla
    
        for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
            arrayMinimos.pop(); 
        }
          // altoVentana = $(window).height();
            calcularColumnas();
            calculoPosicion();
        });

       
        
    $(window).scroll(function () {  
        
        if(botonMenu.checked){                          //Se fija el scroll si el menú está desplegado.
            $(window).scrollTop(scrollPosition);
        }else{
            for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
                arrayMinimos.pop(); 
            }
            calculoPosicion();
            if(primerScroll){                       //Se establece la animación del primer scroll.  
                $(window).scrollTop(0);
                $('.caja-cabecera').addClass('recogida');
                $('.tags').addClass('tag-desplegado');
                setTimeout(function () {  primerScroll = false}, 900) ;        
            }
        }
    })

    imagen.hover(function() {                             //Cortina negra cd pasa el ratón.
        if(mostrarCortina){
            $(this).find('.cortina').stop(true, false).slideDown();  //Función ejecutada cuando el ratón entra
      }}, function() {
        $(this).find('.cortina').stop(true, false).slideUp(); //función ejecutada cuando el ratón sale.
    });


    $('.contenedor-logo').on('click', function () {     //PROVISIONAL. Para que recargue la página cuando se le de al logo
        $(window).scrollTop(0);
        location.reload();
        console.log('recargado');
    });

    $('#menu-icon').on('change',function(){             //Evento que calcula la posición de scroll cd se presiona el menú
        scrollPosition = $(window).scrollTop();
    })

    imagen.click(function(){
        imagen.not(this).toggleClass('ocultar');
        $(this).find('.cortina').hide();
        $(this).toggleClass('posicion-2');
        mostrarCortina = !mostrarCortina;                   //Alternar valor booleano

    })

/*----------------------FUNCIÓN DE CÁLCULO DE POSICIÓN-----------------------------*/

  function calculoPosicion() {
      for (let n = 0; n < numeroColumnas; n++) {        //Inicializando el array de los valores de columna.
          arrayMinimos.push(0); 
      }

        imagen.each(function () { 
            var minimo = Math.min.apply(null, arrayMinimos);  //Se determina la altura de la columna más corta (coordenada Y)
            var index = $.inArray(minimo, arrayMinimos);        //Se determina la columna que es
            var posicionEjeX = index*anchoColumnas*anchoContenedor/100;     //Cálculo de la coordenada X
            $(this).css({
                'left': posicionEjeX+'px',          //Fijo coordenada X
                'top': minimo+ 'px'                  //Fijo coordenada Y
            });
            
            arrayMinimos[index] = minimo + $(this).outerHeight();       //Establezco la nueva altura de la columna

         })

         var maximo = Math.max.apply(null, arrayMinimos);
         contenedor.css('height', maximo);
      

  }


/*   ------------------------------FUNCIÓN PARA CÁLCULO DE COLUMNAS--------------------------- */

    function calcularColumnas(){

        anchoContenedor = contenedor.width();
        if(anchoContenedor<501){
        numeroColumnas = 1;
        }else if(anchoContenedor<1001){
        numeroColumnas = 2;
        }else if(anchoContenedor<1501){
        numeroColumnas = 3;
        }else{
        numeroColumnas = 4;
        }
        anchoColumnas = 100/numeroColumnas;
        imagen.css('width', anchoColumnas + '%');
        console.log(numeroColumnas);
        anchoContenedor = contenedor.width();
        console.log('Ancho del contenedor = ' + anchoContenedor);
        console.log('ancho columna = ' + anchoColumnas);
    }
    
});