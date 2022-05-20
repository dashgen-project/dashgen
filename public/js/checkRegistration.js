const email = document.getElementById('username');
const emailConfirmation = document.getElementById('emailConfirmation');
const password = document.getElementById('password');
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    if (email.value !== emailConfirmation.value) {
        emailConfirmation.setAttribute('class', 'form-control is-invalid');
        event.preventDefault();
    } else {
        emailConfirmation.setAttribute('class', 'form-control is-valid');
        email.setAttribute('class', 'form-control is-valid');
    }
    if (password.value.length < 5) {
        password.setAttribute('class', 'form-control is-invalid');
        event.preventDefault();
    } else {
        password.setAttribute('class', 'form-control is-valid');
    }
}, false);