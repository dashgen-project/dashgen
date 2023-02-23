// check video URL

const form = document.querySelector('form');
const invalidFeedback = document.getElementById('invalidFeedback');

form.addEventListener(
  'submit',
  (event) => {
    const videoUrl = document.getElementById('videoUrl');
    let videoId;
    if (videoUrl.value.includes('v=')) {
      videoId = videoUrl.value.substring(
        videoUrl.value.indexOf('v=') + 2,
        videoUrl.value.indexOf('v=') + 13
      );
      videoUrl.value = `https://youtu.be/${videoId}`;
    } else {
      if (
        videoUrl.value.includes('https://youtu.be/') &&
        videoUrl.value.length >= 28
      ) {
        videoId = videoUrl.value.substring(17, 28);
        videoUrl.value = `https://youtu.be/${videoId}`;
      } else {
        invalidFeedback.innerText =
          'URL inválido. O URL deve estar no formato "https://youtu.be/idDoVideo" ou "https://www.youtube.com/watch?v=idDoVideo".';
        invalidFeedback.classList.remove('d-none');
        event.preventDefault();
      }
    }
  },
  false
);
