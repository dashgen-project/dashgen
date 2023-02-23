// check playlist URL

const form = document.querySelector('form');
const invalidFeedback = document.getElementById('invalidFeedback');

form.addEventListener(
  'submit',
  (event) => {
    const playlistUrl = document.getElementById('playlistUrl');
    if (playlistUrl.value.includes('list=')) {
      const playlistId = playlistUrl.value.substring(
        playlistUrl.value.indexOf('list=') + 5,
        playlistUrl.value.indexOf('list=') + 39
      );
      playlistUrl.value = `https://www.youtube.com/playlist?list=${playlistId}`;
    } else {
      invalidFeedback.innerText =
        'URL inválido. O URL deve possuir um termo "list=..." indicando a ID da playlist, com 34 caracteres.';
      invalidFeedback.classList.remove('d-none');
      event.preventDefault();
    }
  },
  false
);
