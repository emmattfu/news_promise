// init Auth
const auth = new Auth();

const ui = new LoginUi();

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
    if (!email.value || !password.value) return ui.showError('Please fill in all the lines');
    if (email.value && password.value) {
        auth.login (email.value, password.value )
            .then(() => window.location = 'index.html')
            .catch((error) => {
                let errorMessage = error.message;
                ui.showError(errorMessage);
            })
    }
}

function createAccount(e) {
    e.returnValue = false;
    window.location = 'register.html';
}