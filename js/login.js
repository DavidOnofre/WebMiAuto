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

function registrar() {

    //Obtener elementos
    const txtEmail = document.getElementById('txtEmailRegistrar').value;
    const txtPassword = document.getElementById('txtPasswordRegistrar').value;

    firebase.auth().createUserWithEmailAndPassword(txtEmail, txtPassword)
        .then(function () {
            verificar();

            contenido.innerHTML = ` 
            <div class="container mt-5">
                <div class="alert alert-success" role="alert">
                <button class = "close" data-dismiss = "alert">  <span>&times;</span> </button>
                Usuario creado correctamente, <strong>revise su correo.</strong>
                </div>
            </div>
            `;

        })

        .catch(function (error) {

            // Manejar errores aquí.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
};

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification()
        .then(function () {
            // Enviando correo.
            console.log('Enviando correo ...');

        }).catch(function (error) {
            // Error al enviar mensaje.
            console.log(error);
        });
};

function ingresar() {

    //Obtener elementos
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;

    
    firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword)
        .catch(function (error) {

            // Manejar errores aquí.
            var errorCode = error.code;
            var errorMessage = error.message;
  
            console.log('codigo ' + errorCode);
            console.log('mensaje '+ errorMessage);

            contenido.innerHTML = ` 
            <div class="container mt-5">
                <div class="alert alert-danger" role="alert">
                <button class = "close" data-dismiss = "alert">  <span>&times;</span> </button>
                ` + errorMessage + `
                </div>
            </div>
            `;

        });
};

function observador() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log('Existe usuario activo');
            console.log('*************************');
            console.log(user.emailVerified);
            console.log('*************************');
            aparece(user);

        } else {
            // User is signed out.
            console.log('No existe usuario activo');
            contenido.innerHTML = ` 
            <div class="container mt-5">
                <div class="alert alert-primary" role="alert">
                    Usuario no logueado.
                </div>
            </div>
            `;
        }
    });
};
observador();

function aparece(user) {
    var user = user;

    if (user.emailVerified) {
        irMenu();
    }

};

function salir() {
    firebase.auth().signOut()
        .then(function () {
            console.log('Saliendo ...');
        })
        .catch(function (error) {
            console.log(error);
        })
};



function irMenu() {
    location.href = './index.html'
};

