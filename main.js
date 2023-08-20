
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



// Arreglo de deportes

const deportes = [
    {
        id: 1, nombre: "FUTBOL", precio: 160, activado: true, codHtml: `<div id="FUTBOL" class="columna20">
    <img src="./images/futbol_icon.png">
            <h2 href="#" "> Fútbol</h2>
</div >`},
    {
        id: 2, nombre: "VOLEY", precio: 110, activado: true, codHtml: `<div id="VOLEY" class="columna20">
    <img src="./images/voley_icon.png">
    <h2>Voley</h2>
</div>`},
    {
        id: 3, nombre: "TENIS", precio: 120, activado: true, codHtml: `<div id="TENIS" class="columna20">
<img src="./images/tenis_icon.png">
<h2>Tenis</h2>
</div>` },
    {
        id: 4, nombre: "BASKET", precio: 90, activado: true, codHtml: `<div id="BASKET" class="columna20">
<img src="./images/basket_icon.png">
<h2>Basket</h2>
</div>` },
    {
        id: 5, nombre: "PADEL", precio: 80, activado: true, codHtml: `<div id="PADEL" class="columna20">
<img src="./images/padel_icon.png">
<h2>Padel</h2>
</div>`},
];


//Arreglo de días

const dias = [
    { id: 1, nombre: "LUNES", activado: true },
    { id: 2, nombre: "MARTES", activado: true },
    { id: 3, nombre: "MIERCOLES", activado: true },
    { id: 4, nombre: "JUEVES", activado: true },
    { id: 5, nombre: "VIERNES", activado: true },
    { id: 6, nombre: "SABADO", activado: true },
    { id: 7, nombre: "DOMINGO", activado: true },
];

// DOM
let contenedorDias = document.getElementById("contenedor_dias");
let contenedorDeportes = document.getElementById("contenedor_deportes");
let contenedorClientes = document.getElementById("contenedor_clientes");
let totalDeportes = document.getElementById("deportes");
let incLuces = document.getElementById("incrementoLuces");
let incFDS = document.getElementById("incrementoFDS");
let btnEditLuces = document.getElementById("editarLuces");
let btnEditFDS = document.getElementById("editarFDS");
let contenedorCardsReservas = document.getElementById("contenedor_reservas");


// Objeto con incrementos
const incrementos = {
    luces: 0.1,
    fds: 0.2,
};

//Actualizar datos en la pantalla
function actualizaDatos() {
    incLuces.innerText = `${incrementos.luces * 100}%`;
    incFDS.innerText = `${incrementos.fds * 100}%`;
    cargarDias();
    cargarDeportes();

}

// prompt modificar incremento de luces
let incremento1;
let incrementoX;
function editarIncrementoLuces() {

    do {
        incremento1 = hacerPregunta("Indica el valor porcentual de incremento por reservas con luces [no incluir el caracter %].");
    } while (incremento1[1] == false);
    incrementoX = Number(incremento1[0]) / 100;
    if (isNaN(incrementoX)) {
        alert("Por favor, colocar únicamente un número entero.");
        editarIncrementoLuces();
    } else {
        incrementos.luces = incrementoX;
        actualizaDatos();
        alert("Incremento por luces actualizado.");
    }

}

// prompt modificar incremento de FDS
let incremento2;
let incrementoY;
function editarIncrementoFDS() {
    do {
        incremento2 = hacerPregunta("Indica el valor porcentual de incremento por reservas de fin de semana [no incluir el caracter %].");
    } while (incremento2[1] == false);
    incrementoY = Number(incremento2[0]) / 100;
    if (isNaN(incrementoY)) {
        alert("Por favor, colocar únicamente un número entero.");
        editarIncrementoFDS();
    } else {
        incrementos.fds = incrementoY;
        actualizaDatos();
        alert("Incremento por fin de semana actualizado.");
    }

}


actualizaDatos();

//Registrar reserva

class reserva {
    constructor(dni, deporte, dia, hora, precioRegular, incrementoXLuces, incrementoXFDS) {
        this.dni = dni;
        this.deporte = deporte;
        this.dia = dia;
        this.hora = hora;
        this.precioRegular = precioRegular;
        this.incrementoXLuces = incrementoXLuces;
        this.incrementoXFDS = incrementoXFDS;

    }

};

const reservas = [];

// Realizar reserva
function realizarReserva() {

    let datosCliente = registrarCliente();
    let respuestaPrecio;
    let respuestaLuces;
    let deporteReserva;
    let cadenaDeportes = "";
    let cadenaDias = "";
    let horaReserva;
    let datoIncremento;
    let found;
    let horaReservaValor;
    let mensajeClientes = "";
    let diaSeleccionado;
    let diaSeleccionadoX;
    let tipoFound = "";
    let foundNombres;

    // Seleccionar deporte y obtener precio regular

    deportes.forEach(item => {
        if (item.activado == true) {
            cadenaDeportes = cadenaDeportes + ` [${item.nombre}]`;
        }

    }
    );

    do {
        do {
            deporteReserva = hacerPregunta(`${saludo} ${datosCliente[0]} ${datosCliente[1]},\n\n¿Qué deporte desea reservar${cadenaDeportes}?`);
        } while (deporteReserva[1] == false);
        respuestaPrecio = obtenerPrecio(deporteReserva[0]);

    } while (respuestaPrecio[1] == false);


    //Seleccionar día

    dias.forEach(item => {
        if (item.activado == true) {
            cadenaDias = cadenaDias + `[${item.nombre}] `;
        }

    }
    );

    do {
        do {
            diaSeleccionado = hacerPregunta(`Indica el día seleccionado:\n${cadenaDias}`);

        } while (diaSeleccionado[1] == false);

        found = dias.find(e => e.nombre === diaSeleccionado[0]);
        tipoFound = typeof found;
        if (tipoFound == "undefined" || found.activado === false) {
            alert("Por favor, selecciona únicamente alguno de los días que indicamos.")
        }
    } while (tipoFound === "undefined" || found.activado === false);
    diaSeleccionadoX = diaSeleccionado[0];
    datoIncremento = incrementoDia(diaSeleccionadoX);


    //Seleccionar horario

    do {
        do {
            horaReserva = hacerPregunta("¿A qué hora desea reservar?\n[6AM] [7AM] [8AM] [9AM] [10AM] [11AM] [12PM] [1PM] [2PM] [3PM] [4PM] [5PM] [6PM] [7PM] [8PM] [9PM] [10PM]");
            horaReservaValor = horaReserva[0].replace(" ", "");
        } while (horaReserva[1] == false);
        respuestaLuces = incrementoLuces(horaReservaValor);
        if (respuestaLuces[1] == false) {
            alert("Por favor, selecciona un horario de la lista mostrada.");
        }
    } while (respuestaLuces[1] == false);


    const nuevaReserva = new reserva(datosCliente[2], deporteReserva[0], diaSeleccionadoX, horaReservaValor, respuestaPrecio[0], respuestaLuces[0], datoIncremento[0]);
    reservas.push(nuevaReserva);




    //Pintar reservas en sección derecha

    alert(`FDS: ${incrementos.fds} / ${datoIncremento[0]} y Luces ${incrementos.luces} / ${respuestaLuces[0]}`);
    contenedorCardsReservas.innerHTML = "";
    let mensajeReservaFinal = "";
    reservas.forEach(item => {
        foundNombres = clientes.find(e => e.dni === item.dni);
        mensajeReservaFinal = mensajeReservaFinal + `
    <div class= "card_reserva">
        <p>DNI:  ${item.dni}</p>
        <p>Nombres: ${foundNombres.nombre} ${foundNombres.apellido}</p>
        <p>Deporte: ${item.deporte}</p>
        <p>Horario: ${item.dia} (${item.hora})</p>
        <p>Precio regular: S/.${parseFloat(item.precioRegular).toFixed(2)}</p>
        <p>Incremento: ${parseFloat((item.incrementoXLuces + item.incrementoXFDS) * 100).toFixed(2)}%</p>
        <p>Precio final: S/.${parseFloat(item.precioRegular * (1 + (item.incrementoXLuces + item.incrementoXFDS))).toFixed(2)}</p>
    </div > `


    });
    contenedorCardsReservas.innerHTML = mensajeReservaFinal;
    mensajeClientes = "";
    contenedorClientes.innerHTML = "";
    clientes.forEach(item => {
        mensajeClientes = mensajeClientes + `<li> ${item.nombre} ${item.apellido} (${item.dni})</li> `;
        contenedorClientes.innerHTML = mensajeClientes;
    })

}






//---------------------------------------------------------------
// Registrar cliente

class cliente {
    constructor(dni, nombre, apellido) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;

    }
};

const clientes = [];

function registrarCliente() {
    let clienteNombre;
    let clienteApellido;
    let clienteDNI;
    let clienteNombreX;
    let clienteApellidoX;
    let clienteDNIX;
    var found;
    do {
        clienteDNI = hacerPregunta("Indica tu DNI: [8 dígitos]");
        clienteDNIX = clienteDNI[0];
    } while (clienteDNI[1] == false);
    found = clientes.find(e => e.dni === clienteDNIX);

    if (typeof found === "undefined") {
        // Solicitar el resto de campos del cliente
        do {
            clienteNombre = hacerPregunta("Indica tu primer nombre:");
            clienteNombreX = clienteNombre[0];
        } while (clienteNombre[1] == false);
        do {
            clienteApellido = hacerPregunta("Indica tu apellido:");
            clienteApellidoX = clienteApellido[0];
        } while (clienteApellido[1] == false);
        nuevoCliente = new cliente(clienteDNI[0], clienteNombre[0], clienteApellido[0]);
        clientes.push(nuevoCliente);

    } else {
        //utiilizar datos del cliente precargado
        clienteNombreX = found.nombre;
        clienteApellidoX = found.apellido;
        alert(`¡Excelente! Ya te tenemos registrado...`);
    }






    return [clienteNombreX, clienteApellidoX, clienteDNIX];

}







// Función de actualizar los días que están activados

function cargarDias() {
    contenedorDias.innerHTML = "";
    dias.forEach(item => {
        if (item.activado == true) {
            let div = document.createElement("div");
            div.innerHTML = `<li> ${item.nombre}</li> `;
            contenedorDias.append(div);
        }
    })
};



// Función de actualizar los días que están activados

function cargarDeportes() {
    contenedorDeportes.innerHTML = "";
    totalDeportes.innerHTML = "";
    let codHtmDeporte = "";
    deportes.forEach(item => {

        if (item.activado == true) {
            let div = document.createElement("div");
            div.innerHTML = `<li> ${item.nombre}</li>`;
            contenedorDeportes.append(div);
            codHtmDeporte = codHtmDeporte + item.codHtml;

        }
        totalDeportes.innerHTML = codHtmDeporte;
    })
};



//Función Deshabilitar días

const deshabilitarDia = () => {
    let mensaje = "";
    dias.forEach(item => {
        if (item.activado == true) {
            mensaje = mensaje + `[${item.nombre}]`;
        }
    });
    let diaBloqueado = hacerPregunta(`Indica el día que desea bloquear: ${mensaje} `);
    dias.forEach(item => {
        if (diaBloqueado[0] === item.nombre || Number(diaBloqueado[0]) === item.id) {
            item.activado = false;
        }

    }

    )
    cargarDias();
};

//Función Deshabilitar deporte
const deshabilitarDeporte = () => {
    let mensaje = "";
    deportes.forEach(item => {
        if (item.activado == true) {
            mensaje = mensaje + `[${item.nombre}]`;
        }
    });
    let deporteBloqueado = hacerPregunta(`Indica el deporte que desea bloquear: ${mensaje} `);
    deportes.forEach(item => {
        if (deporteBloqueado[0] === item.nombre || Number(deporteBloqueado[0]) === item.id) {
            item.activado = false;
        }

    }

    )
    cargarDeportes();
};

// Función Reestablecer días
const reestablecerDias = () => {
    dias.forEach(item => {

        item.activado = true;
    })
    cargarDias();

};

// Función Reestablecer deportes
const reestablecerDeportes = () => {
    deportes.forEach(item => {

        item.activado = true;
    })
    cargarDeportes();



};

// Función: Hacer pregunta y repetir si respondió vacío. También reemplaza las vocales con tilde.
let respuesta;
let respuestaBoleana = false;
function hacerPregunta(pregunta) {

    respuesta = prompt(pregunta).toUpperCase();

    for (let x = 0; x <= respuesta.length; x++) {
        respuesta = respuesta.replace("Á", "A");
        respuesta = respuesta.replace("É", "E");
        respuesta = respuesta.replace("Í", "I");
        respuesta = respuesta.replace("Ó", "O");
        respuesta = respuesta.replace("Ú", "U");
    }

    if (respuesta.trim() == "") {
        alert("Por favor, responde la pregunta.")
        respuestaBoleana = false;
    } else {
        respuestaBoleana = true;

    }

    return [respuesta, respuestaBoleana];
}

// Incrementar al precio por prender las luces de la cancha cuando la reserva es en la noche. Se incrementará 20%
function incrementoLuces(horario) {
    let valorIncrementado = 0;
    let respuestaBoleanLuces = true;
    if (horario == "6PM" || horario == "7PM" || horario == "8PM" || horario == "9PM" || horario == "10PM") {
        valorIncrementado = incrementos.luces;
        respuestaBoleanLuces = true;
    } else if (horario == "6AM" || horario == "7AM" || horario == "8AM" || horario == "9AM" || horario == "10AM" || horario == "11AM" || horario == "12AM" || horario == "13AM" || horario == "14AM" || horario == "15AM" || horario == "16AM" || horario == "17AM") {
        valorIncrementado = 0;
        respuestaBoleanLuces = true;
    } else {
        respuestaBoleanLuces = false;

    }
    return [parseFloat(valorIncrementado), respuestaBoleanLuces];
}

// Mostrar precio de la cancha en base al deporte seleccionado

function obtenerPrecio(deporte) {
    let precio = 0;
    let respuestaBolean = true;
    let found;
    found = deportes.find(e => e.nombre === deporte);

    if (typeof found == "undefined" || found.activado == false) {
        alert("No contamos con ese deporte en el centro deportivo. Puedes seleccionar otra.");
        respuestaBolean = false;
    } else {
        respuestaBolean = true;
        precio = found.precio;

    }

    return [parseFloat(precio), respuestaBolean];

}

// Si el día de reserva es viernes, sábado o domingo, entonces se incrementa 10% al precio

function incrementoDia(diaReserva) {
    let incremento = 0;
    let respuestaBolean = true;

    if (diaReserva == "VIERNES" || diaReserva == "SABADO" || diaReserva == "DOMINGO") {
        incremento = incrementos.fds;
        respuestaBolean = true;
    } else if (diaReserva == "LUNES" || diaReserva == "MARTES" || diaReserva == "MIERCOLES" || diaReserva == "JUEVES") {
        respuestaBolean = true;
    } else {

        respuestaBolean = false;

    }
    return [parseFloat(incremento), respuestaBolean];
}










