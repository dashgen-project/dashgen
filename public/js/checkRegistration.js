/**
 * @file Validate registration form and manipulate classes to indicate which input needs attention
 */

// Needs improvements in terms of accessibility

const email = document.getElementById('username');
const emailConfirmation = document.getElementById('emailConfirmation');
const password = document.getElementById('password');
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    // check if emails are equal
    if (email.value !== emailConfirmation.value) {
        emailConfirmation.setAttribute('class', 'form-control is-invalid');
        event.preventDefault();
    } else {
        emailConfirmation.setAttribute('class', 'form-control is-valid');
        email.setAttribute('class', 'form-control is-valid');
    }

    // check if password length is correct
    if (password.value.length < 5) {
        password.setAttribute('class', 'form-control is-invalid');
        event.preventDefault();
    } else {
        password.setAttribute('class', 'form-control is-valid');
    }
}, false);