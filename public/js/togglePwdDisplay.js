/**
 * Toggle password visibility on forms
 */

const toggleBtn = document.getElementById('togglePwdBtn');
const pwd = document.getElementById('password');

toggleBtn.addEventListener('click', (evt) => {
  if (evt.target.innerText === 'Mostrar senha') {
    evt.target.innerText = 'Ocultar senha';
    pwd.setAttribute('type', 'text');
  } else if (evt.target.innerText === 'Ocultar senha') {
    evt.target.innerText = 'Mostrar senha';
    pwd.setAttribute('type', 'password');
  }
});
