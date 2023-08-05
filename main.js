// Funciones

// Hacer pregunta y repetir si respondió vacío. También reemplaza las vocales con tilde.
let respuesta = false;
function hacerPregunta(pregunta) {

    let respuesta = prompt(pregunta).toUpperCase();

    for (let x = 0; x <= respuesta.length; x++) {
        respuesta = respuesta.replace("Á", "A");
        respuesta = respuesta.replace("É", "E");
        respuesta = respuesta.replace("Í", "I");
        respuesta = respuesta.replace("Ó", "O");
        respuesta = respuesta.replace("Ú", "U");
    }
    while (respuesta.trim() == "") {
        alert("Por favor, responde la pregunta.")
        hacerPregunta(pregunta);
    }
    return respuesta;
}

// Incrementar al precio por prender las luces de la cancha cuando la reserva es en la noche. Se incrementará 20%
function incrementoLuces(horario) {
    let valorIncrementado = 0;
    if (horario == "6PM" || horario == "7PM" || horario == "8PM" || horario == "9PM" || horario == "10PM") {
        valorIncrementado = 0.1;
    } else if (horario == "6AM" || horario == "7AM" || horario == "8AM" || horario == "9AM" || horario == "10AM" || horario == "11AM" || horario == "12AM" || horario == "13AM" || horario == "14AM" || horario == "15AM" || horario == "16AM" || horario == "17AM") {
        valorIncrementado = 0;
    } else {
        alert("Por favor, indica el horario exáctamente como aparece en las opciones que te mostramos.");
        horaReserva = hacerPregunta("¿A qué hora desea reservar?\n[6AM] [7AM] [8AM] [9AM] [10AM] [11AM] [12PM] [1PM] [2PM] [3PM] [4PM] [5PM] [6PM] [7PM] [8PM] [9PM] [10PM]");
        incrementoLuces(horaReserva);
    }
    return parseFloat(valorIncrementado);
}

// Mostrar precio de la cancha en base al deporte seleccionado

function obtenerPrecio(deporte) {
    let precio;
    switch (deporte) {
        case "FUTBOL":
            precio = 160;
            break;

        case "VOLEY":
            precio = 110;
            break;

        case "TENIS":
            precio = 120;
            break;

        case "BASKET":
            precio = 90;
            break;

        case "PADEL":
            precio = 80;
            break;

        default:
            alert("No contamos con ese deporte en el centro deportivo. Puedes seleccionar otra.");
            deporte = hacerPregunta(`${saludo} ${nombre}, \n\n¿Qué deporte desea jugar?\n[FUTBOL] [VOLEY] [TENIS] [BASKET] [PADEL]`);
            obtenerPrecio(deporte);

    }
    return parseFloat(precio);
}

// Si el día de reserva es viernes, sábado o domingo, entonces se incrementa 10% al precio

function incrementoDia(diaReserva) {
    let incremento = 0;
    if (diaReserva == "VIERNES" || diaReserva == "SABADO" || diaReserva == "DOMINGO") {
        incremento = 0.1;

    } else if (diaReserva == "LUNES" || diaReserva == "MARTES" || diaReserva == "MIERCOLES" || diaReserva == "JUEVES" || diaReserva == "VIERNES") {

    } else {
        alert("Por favor, indica el día correcto.");
        diaReserva = hacerPregunta("¿Qué día desea reservar?\n[LUNES] [MARTES] [MIERCOLES] [JUEVES] [VIERNES] [SABADO] [DOMINGO]");
        incrementoDia(diaReserva);
    }



    return parseFloat(incremento);
}

// Validar la hora actual del sistema.

var hoy = new Date();
var horaES = hoy.toLocaleTimeString('es-PE');
var horaUS = hoy.toLocaleTimeString('en-US');


// Realizar saludo dependiendo si es de mañana, tarde o noche.
let saludo;

var momentoDia = parseInt(horaES.slice(-2));
console.log(momentoDia);

if (momentoDia == "AM") {
    saludo = "Buenos días";
}
else {
    if (horaES.substring(0, 2) >= 18) {
        saludo = "Buenas noches";
    }
    else {
        saludo = "Buenas tardes";
    }

}



// Prompts y alerts
alert("Bienvenidos a la reserva de canchas deportivas");
let nombre = hacerPregunta("¿Cuál es tu nombre?");
let deporte = hacerPregunta(`${saludo} ${nombre}, \n\n¿Qué deporte desea jugar?\n[FUTBOL] [VOLEY] [TENIS] [BASKET] [PADEL]`);
obtenerPrecio(deporte);
let diaReserva = hacerPregunta("¿Qué día desea reservar?\n[LUNES] [MARTES] [MIERCOLES] [JUEVES] [VIERNES] [SABADO] [DOMINGO]");
incrementoDia(diaReserva);
let horaReserva = hacerPregunta("¿A qué hora desea reservar?\n[6AM] [7AM] [8AM] [9AM] [10AM] [11AM] [12PM] [1PM] [2PM] [3PM] [4PM] [5PM] [6PM] [7PM] [8PM] [9PM] [10PM]");
incrementoLuces(horaReserva);


// Mostrar detalle de la reserva
alert("RESERVA REALIZADA \n\nNombre: " + nombre + "\n" + "Deporte: " + deporte + "\n" + "Día de reserva: " + diaReserva + "\n" + "Hora de reserva: " + horaReserva + "\n" + "Precio de reserva: S/." + (obtenerPrecio(deporte) * (1 + incrementoLuces(horaReserva) + incrementoDia(diaReserva))).toFixed(2));





