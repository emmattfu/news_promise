// init auth
const auth = new Auth();

const ui = new LoginUi();

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
    if (!email.value || !password.value) return ui.showError('Please fill in all the lines');
    if (email.value && password.value) {
        auth.register(email.value, password.value)
            .then(() => window.location = 'index.html')
            .catch(error => {
                let errorMessage = error.message;
                ui.showError(errorMessage);
            })
    }
}

function backToLogin(e) {
    e.returnValue = false;
    window.location = 'login.html'
}