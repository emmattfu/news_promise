// init Auth
const auth = new Auth();

// init elements
const form = document.forms['login-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const registerBtn = document.querySelector('.register-btn');

// check auth state
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location = 'index.html';
    }
});

form.addEventListener('submit', onLogin);
registerBtn.addEventListener('click', createAccount);

function onLogin(e) {
    e.preventDefault();
    if (email.value && password.value) {
        auth.login (email.value, password.value )
            .then(() => window.location = 'index.html')
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
            })
    }
}

function createAccount() {
    window.location = 'register.html';
}