  /* Cotizador */
const anio_max = new Date() .getFullYear(),           // Obtiene año actual   
anio_min = anio_max - 20,                             // Obtiene año actual menos 20 años
selectAnios = document .getElementById( 'anio' ),     // Obtiene el SELECT de años en el DOM
formulario = document .getElementById( 'cotizar-seguro' );  // Obtiene el elemento FORM en el DOM

/* Recorre los años dentro del rango */
for( let i = anio_max; i > anio_min; i-- ) {
    let option = document .createElement( 'option' );       // Crea el elemento 'option'

    option .value = i;                                      // Agrega la propiedad 'value' y su valor (año)
    option .innerHTML = i;                                  // Agrega nombre a la opción
    selectAnios .appendChild( option );                     // Despliega elemento en el DOM  
}    

/* EventListeners (Eventos que escuchan)  */
formulario .addEventListener( 'submit', function( e ) {
    const marca = document .getElementById( 'marca' ),                                  // Obtiene el SELECT de marca en el DOM 
          marcaSeleccionada = marca .options[ marca .selectedIndex ] .value,            // Obtiene el valor del elemento SELECT de marca en el DOM 
          anio = document .getElementById( 'anio' ),                                    // Obtiene el SELECT de anio en el DOM 
          anioSeleccionado = anio .options[ anio .selectedIndex ] .value,               // Obtiene el valor del elemento SELECT de anio en el DOM
          tipoSeguro = document .querySelector( 'input[name="tipo"]:checked' ) .value,  // Obtiene el valor del elemento RADIO (tipo) en el DOM 
          interfaz = new Interfaz();                                                    // Crea instancia de 'Interfaz'
    
    e .preventDefault();        // Detiene y previene que se ejecute el 'action' en el formulario

    console .group( 'Selección realizada' );
        console .log( 'Marca: ', marcaSeleccionada );      
        console .log( 'Año: ',  anioSeleccionado );
        console .log( 'Tipo seguro:', tipoSeguro );
    console .groupEnd();

    // Valida que los campos no estén vacíos
    if( marcaSeleccionada === '' || anioSeleccionado === '' || tipoSeguro === '' ) {
        console .log( 'ERROR: ', 'Faltan datos' );         // Interface imprimiendo un ERROR
        interfaz .mostrarMensaje( 'error', 'Faltan datos: Intenta de nuevo' );
    }
    else {
        // Limpiar resultados anteriores
        const resultados = document .querySelector( '#resultado div' );

        if( resultados != null ) {
            resultados .remove();
        }

        // Realizar instancia segura y mostrar la interface
        const seguro = new Seguro( marcaSeleccionada, anioSeleccionado, tipoSeguro ),   // Crea Instancia de Seguro
              valorSeguro = seguro .cotizar();      // Cotizar el Seguro
    
        console .log( 'Valor Cotización: ', valorSeguro );

        // Mostrar el resultado 
        interfaz .mostrarResultado( seguro, valorSeguro );
        interfaz .mostrarMensaje( 'correcto', 'Cotizando...' );
    }
});

/* Crea Interface */
function Interfaz() {}
/* Agrega Prototype a 'Interface' */
Interfaz .prototype .mostrarMensaje = function( tipo, mensaje ) {
    const div = document .createElement( 'div' );           // Crea el elemento 'div'

    /* Validar el tipo de Error */
    if( tipo === 'error' ) {
        div .classList .add( 'mensaje', 'error' );          // Agrega la clase 'mensaje' y 'error' al elemento 'div'
    }
    else {
        div .classList .add( 'mensaje', 'correcto' );       // Agrega la clase 'mensaje' y 'correcto' al elemento 'div'
    }

    /* Muestra Error */
    div .innerHTML = `${ mensaje }`;    // Agrega el mensaje al elemento 'div'
    formulario .insertBefore( div, document .querySelector( '.form-group' ) );       // Inserta el elemento 'div' ANTES del elemento con la clase 'form-group' 

    /* Oculta el ERROR */
    setTimeout( function() {
        document .querySelector( '.mensaje' ) .remove();    // El elemento con la clase 'mensaje' se elimina del DOM
    }, 5000 );     // 5s
}
/* Agrega Prototype a 'Inferface' */
Interfaz .prototype .mostrarResultado = function( seguro, total ) {
    const resultado = document .getElementById( 'resultado' );
    let marca;

    console .log( seguro );
    switch( seguro .marca ) {
        case '1': marca = 'Americano'; break;
        case '2': marca = 'Asiático'; break;
        case '3': marca = 'Europeo'; break;
    }

    // Crea el elemento 'div' donde se mostrarán los datos
    const div = document .createElement( 'div' );           
    // Insertamos la información en el elemento
    div .innerHTML = `                
        <p class="header">Valor cotización</p>                      
        <p><b>Marca:</b> ${ marca }</p>
        <p><b>Año:</b> ${ seguro .anio }</p>
        <p><b>Tipo:</b> ${ seguro .tipo }</p>
        <p><b>Total:</b> $ ${ total }</p>
    `;
    // Despliega el Spinner (Cargando) 
    const spinner = document .querySelector( '#cargando img' );
    spinner .style .display = 'block';

    setTimeout( function() {
        spinner .style .display = 'none';   // Oculta el Spinner
        resultado .appendChild( div );      // Agregamos el resultado al DOM
    }, 5000 );      // 5s
    
}

/* Constructor para el Seguro */
function Seguro( marca, anio, tipo ) {
    this .marca = marca;
    this .anio = anio;
    this .tipo = tipo;
}
/* Agrega Prototype a 'Seguro' */
Seguro .prototype .cotizar = function() {
    let cantidad;
    const base = 2000;
    /* Primer Cálculo por Marca
     *  1 = Americano   1.15
     *  2 = Asiatico    1.05
     *  3 = Europeo     1.35
     */
    switch(  this .marca ) {
        case '1':   cantidad = base * 1.15; break;
        case '2':   cantidad = base * 1.05; break;
        case '3':   cantidad = base * 1.35; break;
    }    
    // Segundo Cálculo por Años (Cada año se recude 3% el valor del seguro)
    const antiguedad =  new Date() .getFullYear() - this .anio;    // Año actual, menos año del vehículo
    cantidad -= ( ( antiguedad * 3 ) * cantidad ) / 100;           // Calcula reducción del 3% por cada año de diferencia
    /* Tercer Cálculo por tipo de Seguro
     *  - Básico aumenta 30% más
     *  - Completo aumenta 50% más
     */
    if( this .tipo === 'basico'  ) {
        cantidad *= 1.3;
    }
    else {
        cantidad *= 1.5;
    }

    console .log( `${ this .marca } / ${ this .anio } / ${ this .tipo }: ${ cantidad }`);

    return cantidad;
}