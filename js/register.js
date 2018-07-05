// init auth
const auth = new Auth();

//init elements
const form = document.forms['register-form'];
const email = form.elements['email'];
const password = form.elements['password'];
const toLogin = document.querySelector('.to-login-btn');

// events
form.addEventListener('submit', onRegister);
toLogin.addEventListener('click', backToLogin);


// Event handlers
function onRegister(e) {
    e.preventDefault();
    if (email.value && password.value) {
        auth.register(email.value, password.value)
            .then(() => window.location = 'index.html')
            .catch(err => {
                console.log('no');
            })
    }
}

function backToLogin() {
    window.location = 'login.html'
}