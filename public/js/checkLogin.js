// check login form

const form = document.querySelector('form');
const invalidFeedback = document.getElementById('invalidFeedback');

form.addEventListener(
  'submit',
  (event) => {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!email.length || !password.length) {
      invalidFeedback.innerText = 'Email e/ou senha faltando.';
      invalidFeedback.classList.remove('d-none');
      event.preventDefault();
    }
  },
  false
);
