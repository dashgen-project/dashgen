/**
 * @file Playlist dashboard video controls, handles video and chapter changing
 */

const videoIFrame = document.querySelector('iframe'); /** Get iframe node */
const videoId = videoIFrame.src.split('/')[4].substring(0, videoIFrame.src.split('/')[4].indexOf('?')); /** Get video ID */
const videoBtns = document.getElementsByClassName('video-btn'); /** Get change video buttons nodes */
const chapterBtns = document.getElementsByClassName('chapter-btn'); /** Get change chapter buttons nodes */

/**
 * @description Add event listeners to "change video" buttons
 * @param {nodeList} nl - "Change video" buttons node list
 */
function addVideoControls(nl) {
    if (nl.length) {
        const arr = Array.prototype.slice.call(nl);
        arr.forEach(function (el) {
            el.addEventListener('click', function (evt) {
                location.href = el.id;
            });
        });
    } else {
        console.log('Oops, nodeList is empty!');
    }
}

/**
 * @description Add event listeners to "change chapter" buttons
 * @param {NodeList} nl - "Change chapter" buttons node list
 * @param {String} id - Current video ID
 * @param {Node} frame - Current video iFrame node
 */
function addChapterControls(nl, id, frame) {
    if (nl.length) {
        const arr = Array.prototype.slice.call(nl);
        arr.forEach(function (el) {
            el.addEventListener('click', function (evt) {
                const timeInSeconds = el.id;
                frame.src = `https://www.youtube.com/embed/${id}?start=${timeInSeconds}&autoplay=1&rel=0`;
            });
        });
    } else {
        console.log('Oops, nodeList is empty!');
    }
}

addVideoControls(videoBtns);
addChapterControls(chapterBtns, videoId, videoIFrame);