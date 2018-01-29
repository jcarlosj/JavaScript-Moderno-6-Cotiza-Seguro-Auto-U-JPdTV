  /* Cotizador */
const anio_max = new Date() .getFullYear(),           // Obtiene año actual   
anio_min = anio_max - 20,                             // Obtiene año actual menos 20 años
selectAnios = document .getElementById( 'anio' );     // Obtiene el SELECT de años en el DOM

/* Recorre los años dentro del rango */
for( let i = anio_max; i > anio_min; i-- ) {
    let option = document .createElement( 'option' );       // Crea el elemento 'option'

    option .value = i;                                      // Agrega la propiedad 'value' y su valor (año)
    option .innerHTML = i;                                  // Agrega nombre a la opción
    selectAnios .appendChild( option );                     // Despliega elemento en el DOM
}    