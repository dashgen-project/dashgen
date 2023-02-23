/**
 * @file Validate registration form and manipulate classes to indicate which input needs attention
 */

const form = document.querySelector('form');
const invalidFeedback = document.getElementById('invalidFeedback');

form.addEventListener(
  'submit',
  (event) => {
    const wrongCode = document.getElementById('wrongCode');
    if (typeof wrongCode !== 'undefined') {
      if (wrongCode) {
        wrongCode.classList.add('d-none');
      }
    }
    const password = document.getElementById('password').value;
    if (false) {
      invalidFeedback.innerText = 'Os emails inseridos não coincidem.';
      invalidFeedback.classList.remove('d-none');
      event.preventDefault();
      return;
    } else {
      if (false) {
        // Invalid email
        invalidFeedback.innerText = 'O email inserido não é válido.';
        invalidFeedback.classList.remove('d-none');
        event.preventDefault();
        return;
      } else {
        if (password.length < 10) {
          // password is too short
          invalidFeedback.innerText =
            'Sua senha deve possuir no mínimo 10 caracteres.';
          invalidFeedback.classList.remove('d-none');
          event.preventDefault();
          return;
        } else {
          if (!/[a-zA-Z]/.test(password)) {
            // password does not contain letters
            invalidFeedback.innerText =
              'Sua senha deve possuir no mínimo uma letra.';
            invalidFeedback.classList.remove('d-none');
            event.preventDefault();
            return;
          } else {
            if (
              password.toLowerCase() === password ||
              password.toUpperCase() === password
            ) {
              // password contains only uppercase or lowercase
              invalidFeedback.innerText =
                'Sua senha deve possuir no mínimo uma letra maiúscula e uma minúscula.';
              invalidFeedback.classList.remove('d-none');
              event.preventDefault();
              return;
            } else {
              if (!/[0-9]/.test(password)) {
                // password does not contain numbers
                invalidFeedback.innerText =
                  'Sua senha deve possuir no mínimo um número.';
                invalidFeedback.classList.remove('d-none');
                event.preventDefault();
                return;
              } else {
                if (!/[-!@#%&\*_\+=]/.test(password)) {
                  // Check if has special characters
                  // Does not have special characters
                  invalidFeedback.innerText =
                    'Sua senha deve possuir ao menos um dos seguintes caracteres especiais: "!", "@", "#", "%", "&", "*", "-", "_", "+" ou "=".';
                  invalidFeedback.classList.remove('d-none');
                  event.preventDefault();
                  return;
                } else {
                  if (password.includes('$')) {
                    invalidFeedback.innerText =
                      "Sua senha não pode possuir o caractere '$' por motivos de segurança.";
                    invalidFeedback.classList.remove('d-none');
                    event.preventDefault();
                  } else invalidFeedback.classList.add('d-none');
                }
              }
            }
          }
        }
      }
    }
  },
  false
);
