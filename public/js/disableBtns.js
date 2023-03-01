/**
 * @file Disable dropdown buttons which do not have content
 */

dropdownBtns = document.getElementsByClassName('dropdown-menu');
for (let btn of dropdownBtns) {
  let btnsContainer;
  if (btn.childElementCount < 1) {
    btnTag = btn.previousSibling.previousSibling;
    btnsContainer = btnTag.parentElement.parentElement;
    btnTag.remove();
    if (
      Array.from(btnsContainer).every((el) => {
        return el.childNodes[1].childElementCount < 1;
      })
    ) {
      btnsContainer.innerText =
        'Caso não haja nada aqui, esta parte da aula não possui materiais ainda.';
      btnsContainer.classList.add('fs-4');
    }
  }
}

const changeClassPartBtns = [
  document.getElementById('preClassBtn'),
  document.getElementById('forClassBtn'),
  document.getElementById('postClassBtn'),
];

const classSections = [
  document.getElementById('preClassMaterial'),
  document.getElementById('forClassMaterial'),
  document.getElementById('postClassMaterial'),
];

for (let i = 0; i < 3; i++) {
  changeClassPartBtns[i].addEventListener(
    'click',
    (evt) => {
      classSections[i].classList.remove('d-none');
      for (let j = 0; j < 3; j++) {
        if (j !== i) {
          classSections[j].classList.add('d-none');
        }
      }
      evt.target.classList.remove('fs-4');
      evt.target.classList.add('fs-2');
      let nextSibling = evt.target.nextElementSibling,
        prevSibling = evt.target.previousElementSibling;
      while (nextSibling) {
        nextSibling.classList.remove('fs-2');
        nextSibling.classList.add('fs-4');
        nextSibling = nextSibling.nextElementSibling;
      }
      while (prevSibling) {
        prevSibling.classList.remove('fs-2');
        prevSibling.classList.add('fs-4');
        prevSibling = prevSibling.previousElementSibling;
      }
    },
    false
  );
}

// dropdownBtnContainers = document.getElementsByClassName('dropdown');
// for (let cont of dropdownBtnContainers) {
//   if (cont.childElementCount < 1) {
//     cont.innerText = 'Sem material';
//   }
// }
