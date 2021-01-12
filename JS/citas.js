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
var bandera = true; //editar

function innerHTML(uid, result) {
    return document.getElementById(uid).innerHTML += result;
};

function inputsTask(uid, result) {
    return document.getElementById(uid).value = result;
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