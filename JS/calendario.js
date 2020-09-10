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
            // Usuario logeado
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





































