// /**
//  * @file Disable dropdown buttons which do not have content
//  */

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

      // Get span that tells which material is being shown
      const shownMaterial = document.getElementById('shownMaterial'); 
      
      // Change text telling which material is being visualized
      switch(evt.target.id) {
        case 'preClassBtn':
          shownMaterial.textContent = 'pré-aula';
          break;
        case 'forClassBtn':
          shownMaterial.textContent = 'de aula';
          break;
        case 'postClassBtn':
          shownMaterial.textContent = 'pós-aula';
          break;
        default:
          console.log('unexpected target id');
          break;
      }

      evt.target.classList.remove('btn-secondary');
      evt.target.classList.add('btn-primary');
      let nextSibling = evt.target.nextElementSibling,
        prevSibling = evt.target.previousElementSibling;
      while (nextSibling) {
        nextSibling.classList.remove('btn-primary');
        nextSibling.classList.add('btn-secondary');
        nextSibling = nextSibling.nextElementSibling;
      }
      while (prevSibling) {
        prevSibling.classList.remove('btn-primary');
        prevSibling.classList.add('btn-secondary');
        prevSibling = prevSibling.previousElementSibling;
      }
    },
    false
  );
}

dropdownBtns = document.getElementsByClassName('dropdown-menu');
for (let btn of dropdownBtns) {
  if (btn.childElementCount < 1) {
    btnTag = btn.previousSibling.previousSibling;
    btnTag.classList.add('disabled');
    const notAvaiable = document.createElement('div');
    notAvaiable.classList.add('text-center', 'd-none', 'bg-warning');
    notAvaiable.innerText = '(não disponível)';
    // btnTag.after(notAvaiable);
    // btnTag.insertAdjacentHTML('afterend', 'não disponível');
    btnTag.parentNode.addEventListener('mouseover', (evt) => {
      console.log('onmouseover');
      console.log(evt.target.childNodes);
      // console.log(evt.target.childNodes);
      evt.target.childNodes[1].innerText += ' (não disponível)';
    });
    btnTag.parentNode.addEventListener('mouseout', (evt) => {
      console.log('onmouseout');
      evt.target.childNodes[1].innerText =
        evt.target.childNodes[1].innerText.split(' (')[0];
      // console.log(evt.target.childNodes);
      // evt.target.childNodes[2].classList.add('d-none');
    });
  }
}
