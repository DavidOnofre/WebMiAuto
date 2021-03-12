/*!
    * Start Bootstrap - Agency v6.0.3 (https://startbootstrap.com/theme/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 74,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict



//Integración Firebase.

var firebaseConfig = {
    apiKey: "AIzaSyBg4qE5EwlqiQ9JkYzXfeGhcASASPmbl4E",
    authDomain: "miauto-ef21e.firebaseapp.com",
    databaseURL: "https://miauto-ef21e.firebaseio.com",
    projectId: "miauto-ef21e",
    storageBucket: "",
    messagingSenderId: "655018290353",
    appId: "1:655018290353:web:f758d42ab98918f1"
};

firebase.initializeApp(firebaseConfig);

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // Usuario activo
            console.log('Existe usuario activo');
            console.log('*************************');
            console.log(user.emailVerified);
            console.log('*************************');
            aparece(user);
        } else {
            console.log('No existe usuario activo');
            noLogeado();
        }
    });
};

function aparece(user) {
    var user = user;
    if (user.emailVerified) {
        logeado(user.email);
    }
};

function noLogeado() {
    var obj1 = document.getElementById("obj1");
    var obj2 = document.getElementById("obj2");

    obj1.style.display = 'none';
    obj2.style.display = 'block';
};

observador();

function logeado(email) {
    var obj1 = document.getElementById("obj1");
    var obj2 = document.getElementById("obj2");
    var bienvenido = document.getElementById("bienvenido");

    bienvenido.innerHTML = "Bienvenido! " + email + "&nbsp";
    obj1.style.display = 'block';
    obj2.style.display = 'none';
};

function salir() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Saliendo ...');
            location.href = './login.html'
        })
        .catch(function (error) {
            console.log(error);
        })
};

var bandera = true; //editar

function getID(uid) {
    return document.getElementById(uid).value;
};

function innerHTML(uid, result) {
    return document.getElementById(uid).innerHTML += result;
};

function inputsTask(uid, result) {
    return document.getElementById(uid).value = result;
};

function arrayJson(uid, nombre, apellido, correo, telefono, placa, marca, modelo, kilometraje, tipoMantenimiento, observaciones, fechakilometraje, gastos) {
    var data = {
        uid: uid,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
        auto: [{
            placa: placa,
            marca: marca,
            modelo: modelo,
            kilometraje: kilometraje,
            kilometrajeAceite: kilometraje,
            kilometrajeGasolina: kilometraje,
            kilometrajeLlantas: kilometraje,
            kilometrajeBateria: kilometraje,
            kilometrajeElectricidad: kilometraje
        }
        ],
        mantenimiento: {
            tipoMantenimiento: tipoMantenimiento,
            observaciones: observaciones,
            fechakilometraje: fechakilometraje,
            gastos: gastos
        }
    };
    return data;
};

function insertTask() {

    var uid = getID("uid");
    var nombre = getID("nombre");
    var apellido = getID("apellido");
    var correo = getID("correo");
    var telefono = getID("telefono");

    var placa = getID("placa");
    var marca = getID("marca");
    var modelo = getID("modelo");
    var kilometraje = getID("kilometraje");

    if (uid.length == 0 || nombre.length == 0 || apellido.length == 0 || correo.length == 0 || telefono.length == 0 || placa.length == 0 || marca.length == 0 || modelo.length == 0 || kilometraje.length == 0) {
        alert("Campos vacíos");
    } else {

        var arrayData = arrayJson(uid, nombre, apellido, correo, telefono, placa, marca, modelo, kilometraje, "tipoMantenimiento", "observaciones", "fechakilometraje", "gastos");
        var task = firebase.database().ref("Persona/" + uid);
        task.set(arrayData);

        inputsTask("uid", "");
        inputsTask("nombre", "");
        inputsTask("apellido", "");
        inputsTask("correo", "");
        inputsTask("telefono", "");

        inputsTask("placa", "");
        inputsTask("marca", "");
        inputsTask("modelo", "");
        inputsTask("kilometraje", "");

    }

    if (bandera) {
        alert("Agregado Exitosamente")
    } else {
        alert("Editado Exitosamente")
        location.reload();
    }
};

function tablaClientes(uid, nombre, apellido, correo, telefono, placa, marca, modelo, kilometraje) {

    return '<tr>' +
        '<td>' + uid + '</td>' +
        '<td>' + nombre + '</td>' +
        '<td>' + apellido + '</td>' +
        '<td>' + correo + '</td>' +
        '<td>' + telefono + '</td>' +
        '<td>' + placa + '</td>' +
        '<td>' + marca + '</td>' +
        '<td>' + modelo + '</td>' +
        '<td>' + kilometraje + '</td>' +
        '<td><i class="fas fa-edit size-fas"' +
        ' onclick = "editTask(' + '\'' + uid + '\'' + ',' + '\'' + nombre + '\'' + ' ,' + '\'' + apellido + '\'' + ' ,' + '\'' + correo + '\'' + ' ,' + '\'' + telefono + '\'' + ' ,' + '\'' + placa + '\'' + ' ,' + '\'' + marca + '\'' + ' ,' + '\'' + modelo + '\'' + ' ,' + '\'' + kilometraje + '\'' + ')">' +
        '</i></td>' +
        '<td><i class="fas fa-trash-alt size-fas" onclick="remove(' + '\'' + uid + '\'' + ')"></i></td>' +
        '</tr>';
};

function tablaVehiculos(uid, nombre, apellido, placa, marca, modelo, kilometraje) {

    return '<tr>' +
        '<td>' + uid + '</td>' +
        '<td>' + nombre + '</td>' +
        '<td>' + apellido + '</td>' +
        '<td>' + placa + '</td>' +
        '<td>' + marca + '</td>' +
        '<td>' + modelo + '</td>' +
        '<td>' + kilometraje + '</td>' +
        '</tr>';
};

function tablaMantenimientos(uid, placa, tipoMantenimiento, observaciones, fechakilometraje, gastos) {

    return '<tr>' +
        '<td>' + uid + '</td>' +
        '<td>' + placa + '</td>' +
        '<td>' + tipoMantenimiento + '</td>' +
        '<td>' + observaciones + '</td>' +
        '<td>' + fechakilometraje + '</td>' +
        '<td>' + gastos + '</td>' +
        '<td>' +
        '<a href=".././reportes/OrdenPagoRTV.pdf" download="ReporteMantenimiento" ><i class="fas fa-file-pdf" style="font-size:36px ;color:red"> </i></a> ' +
        '</td>' +
        '</tr>';
};

function cargarClientes() {
    var task = firebase.database().ref("Persona/");
    
    task.on("child_added", function (data) {
        var datosClientes = data.val();
        var result = tablaClientes(
            datosClientes.uid,
            datosClientes.nombre,
            datosClientes.apellido,
            datosClientes.correo,
            datosClientes.telefono,
            datosClientes.auto[0].placa,
            datosClientes.auto[0].marca,
            datosClientes.auto[0].modelo,
            datosClientes.auto[0].kilometraje);

        innerHTML("tbodyClientes", result);
    });

    cargarVehiculos();
    cargarMantenimientos();
};

function cargarVehiculos() {
	var task = firebase.database().ref("Persona/");

	task.on("child_added", function (data) {
		var datosVehiculos = data.val();
		for (let i = 0; i < datosVehiculos.auto.length; i++) {

			if (i == 0) {
				var result = tablaVehiculos(
					datosVehiculos.uid,
					datosVehiculos.nombre,
					datosVehiculos.apellido,
					datosVehiculos.auto[i].placa,
					datosVehiculos.auto[i].marca,
					datosVehiculos.auto[i].modelo,
					datosVehiculos.auto[i].kilometraje);
				innerHTML("tbodyVehiculos", result);

			} else {
				var result = tablaVehiculos(
					"",
					"",
					"",
					datosVehiculos.auto[i].placa,
					datosVehiculos.auto[i].marca,
					datosVehiculos.auto[i].modelo,
					datosVehiculos.auto[i].kilometraje);
				innerHTML("tbodyVehiculos", result);
			}
		}
	});
};

function cargarMantenimientos() {
    var task = firebase.database().ref("Persona/");
    
    task.on("child_added", function (data) {
        var datosMantenimientos = data.val();
        var result = tablaMantenimientos(
            datosMantenimientos.uid,
            datosMantenimientos.auto[0].placa,
            datosMantenimientos.mantenimiento.tipoMantenimiento,
            datosMantenimientos.mantenimiento.observaciones,
            datosMantenimientos.mantenimiento.fechakilometraje,
            datosMantenimientos.mantenimiento.gastos);

        innerHTML("tbodyMantenimientos", result);
    });
};

function editTask(uid, nombre, apellido, correo, telefono, placa, marca, modelo, kilometraje) {

    var boton = document.getElementById("boton");
    boton.innerHTML = 'Editar';

    bandera = false;

    inputsTask("uid", uid);
    inputsTask("nombre", nombre);
    inputsTask("apellido", apellido);
    inputsTask("correo", correo);
    inputsTask("telefono", telefono);

    inputsTask("placa", placa);
    inputsTask("marca", marca);
    inputsTask("modelo", modelo);
    inputsTask("kilometraje", kilometraje);

};

function remove(uid) {
    var task = firebase.database().ref("Persona/" + uid);
    task.remove();
    location.reload();
};

//combos depedientes
var Chevrolet = [
    { display: "Aveo", value: "Aveo" },
    { display: "Grand Vitara", value: "Grand Vitara" },
    { display: "Sail", value: "Sail" }];

var Kia = [
    { display: "Picanto", value: "Picanto" },
    { display: "Sportage r", value: "Sportage r" },
    { display: "Rio", value: "Rio" }];

var Hyundai = [
    { display: "Tucson", value: "Tucson" },
    { display: "Santa Fe", value: "Santa Fe" },
    { display: "i10", value: "i10" }];

var Mazda = [
    { display: "Cx-3", value: "Cx-3" },
    { display: "bt-50", value: "bt-50" },
    { display: "Allegro", value: "Allegro" }];

var Toyota = [
    { display: "Rav 4", value: "Rav 4" },
    { display: "Corola", value: "Corola" },
    { display: "Fortuner", value: "Fortuner" }];

// Aqui verificamos dependncia
$("#marca").change(function () {
    var parent = $(this).val();
    switch (parent) {
        case 'Chevrolet':
            list(Chevrolet);
            break;
        case 'Kia':
            list(Kia);
            break;
        case 'Hyundai':
            list(Hyundai);
            break;
        case 'Mazda':
            list(Mazda);
            break;
        case 'Toyota':
            list(Toyota);
            break;
    }
});

//function to populate child select box
function list(array_list) {
    $("#modelo").html(""); //reset child options
    $(array_list).each(function (i) { //populate child options
        $("#modelo").append("<option value=\"" + array_list[i].value + "\">" + array_list[i].display + "</option>");
    });
    $("#aqui").addClass('hidden');
    $(".box--oculto").removeClass('hidden');
}

function myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i, j, visible;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        visible = false;
        /* Obtenemos todas las celdas de la fila, no sólo la primera */
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                visible = true;
            }
        }
        if (visible === true) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}
