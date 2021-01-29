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
            aparece(user);
        } else {
            // Usuario no logeado
            noLogeado();
        }
    });
};

observador();

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

function arrayJson(uid, nombre, apellido, correo, telefono, kilometraje, marca, modelo, placa) {
    var data = {
        uid: uid,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
        auto: {
            kilometraje: kilometraje,
            marca: marca,
            modelo: modelo,
            placa: placa,
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

    if (uid.length == 0 || nombre.length == 0 || apellido.length == 0 || correo.length == 0 || telefono.length == 0) {
        alert("Campos vac&iacute;os");
    } else {

        var arrayData = arrayJson(uid, nombre, apellido, correo, telefono, "kilometraje", "marca", "modelo", "placa");
        var task = firebase.database().ref("Persona/" + uid);
        task.set(arrayData);

        inputsTask("uid", "");
        inputsTask("nombre", "");
        inputsTask("apellido", "");
        inputsTask("correo", "");
        inputsTask("telefono", "");
    }

    if (bandera) {
        alert("Agregado Exitosamente")
    } else {
        alert("Editado Exitosamente")
        refrescar();
    }
};

function table(uid, nombre, apellido, correo, telefono) {

    return '<tr>' +
        '<td>' + nombre + '</td>' +
        '<td>' + apellido + '</td>' +
        '<td>' + correo + '</td>' +
        '<td>' + telefono + '</td>' +
        '<td><i class="fas fa-edit size-fas"' +
        ' onclick = "editTask(' + '\'' + uid + '\'' + ', ' + '\'' + nombre + '\'' + ' , ' + '\'' + apellido + '\'' + ' , ' + '\'' + correo + '\'' + ' , ' + '\'' + telefono + '\'' + ')">' +
        '</i></td>' +
        '<td><i class="fas fa-trash-alt size-fas" onclick="remove(' + '\'' + uid + '\'' + ')"></i></td>' +
        '</tr>';
};

function watchTask() {
    var task = firebase.database().ref("Persona/");
    task.on("child_added", function (data) {
        var taskValue = data.val();
        var result = table(taskValue.uid, taskValue.nombre, taskValue.apellido, taskValue.correo, taskValue.telefono);
        innerHTML("loadTask", result);
    });
};

function editTask(uid, nombre, apellido, correo, telefono) {

    var boton = document.getElementById("boton");
    boton.innerHTML = 'Editar';

    bandera = false;

    inputsTask("uid", uid);
    inputsTask("nombre", nombre);
    inputsTask("apellido", apellido);
    inputsTask("correo", correo);
    inputsTask("telefono", telefono);

};

function remove(uid) {
    var task = firebase.database().ref("Persona/" + uid);
    task.remove();
    location.reload();
};

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
observador();

function aparece(user) {
    var user = user;
    if (user.emailVerified) {
        logeado(user.email);
    }
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

function noLogeado() {
    var obj1 = document.getElementById("obj1");
    var obj2 = document.getElementById("obj2");

    obj1.style.display = 'none';
    obj2.style.display = 'block';
};

function logeado(email) {
    var obj1 = document.getElementById("obj1");
    var obj2 = document.getElementById("obj2");
    var bienvenido = document.getElementById("bienvenido");

    bienvenido.innerHTML = "Bienvenido! " + email + "&nbsp";
    obj1.style.display = 'block';
    obj2.style.display = 'none';
};

function refrescar() {
    location.href = './index.html'
};