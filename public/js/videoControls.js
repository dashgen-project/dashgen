const videoIframe = document.querySelector('iframe');
const videoId = videoIframe.src.split('/')[4].substring(0, videoIframe.src.split('/')[4].indexOf('?'));
const chaptersList = document.getElementById('chaptersList');
const videosList = document.getElementById('videosList');
if (typeof chaptersList !== 'undefined') {
    chaptersList.addEventListener('click', (e) => {
        const timeInSeconds = e.target.id;
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?start=${timeInSeconds}&autoplay=1&rel=0`;
    });
}
if (typeof videosList !== 'undefined') {
    videosList.addEventListener('click', (e) => {
        location.href = e.target.id;
    });
}