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
          tipoSeguro = document .querySelector( 'input[name="tipo"]:checked' ) .value;  // Obtiene el valor del elemento RADIO (tipo) en el DOM 
    
    e .preventDefault();        // Detiene y previene que se ejecute el 'action' en el formulario

    console .group( 'Selección realizada' );
        console .log( 'Marca: ', marcaSeleccionada );      
        console .log( 'Año: ',  anioSeleccionado );
        console .log( 'Tipo seguro:', tipoSeguro );
    console .groupEnd();

    // Valida que los campos no estén vacíos
    if( marcaSeleccionada === '' || anioSeleccionado === '' || tipoSeguro === '' ) {
        console .log( 'ERROR: ', 'Faltan datos' );         // Interface imprimiendo un ERROR
    }
    else {
        // Realizar instancia segura y mostrar la interface
        console .log( 'Instancia Interface' );
        
    }
});