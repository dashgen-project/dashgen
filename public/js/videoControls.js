/**
 * @file Course dashboard media controls (handles videos and chapters changing)
 */

/**
 * @description Class to handle media control in the course dashboards
 */
class MediaControl {
  constructor(
    videoFrame,
    videoBtns,
    videoContent,
    videoId,
    chaptersList,
    classPart,
    chaptersDropdowns
  ) {
    this.videoFrame = videoFrame;
    this.videoBtns = videoBtns;
    this.videoContent = videoContent;
    this.videoId = videoId;
    this.chaptersList = chaptersList;
    this.classPart = classPart;
    this.chaptersDropdowns = chaptersDropdowns;
  }
}

/**
 * @description Get DOM elements of specific class part
 * @param {*} classPart - [preCE | preCNE | forCE | forCNE | postCE | postCNE]
 * preCE - pre-class essential
 * preCNE - pre-class non essential
 * forCE - for class essential
 * forCNE - for class non essential
 * postCE - post class essential
 * postCNE - post class non essential
 * @returns Object of class MediaControl
 */
const getCtrlElements = (classPart) => {
  let baseStr = `${classPart}video`;
  const videoFrame = document.getElementById(baseStr);
  let videoBtns = [];
  for (let i = 0; i < 3; i++) {
    videoBtns.push(document.getElementById(`${baseStr}${i}`));
  }
  let chaptersDropdowns = [];
  for (let i = 0; i < 3; i++) {
    chaptersDropdowns.push(
      document.getElementById(`${classPart}chaptersDropdown${i}`)
    );
  }
  const videoContent = document.getElementById(`${baseStr}content`);
  const videoId = videoFrame.src
    .split('/')[4]
    .substring(0, videoFrame.src.split('/')[4].indexOf('?'));
  const chaptersList = document.getElementById(`${classPart}chaptersList0`);
  return new MediaControl(
    videoFrame,
    videoBtns,
    videoContent,
    videoId,
    chaptersList,
    classPart,
    chaptersDropdowns
  );
};

const classParts = ['preCE', 'preCNE', 'forCE', 'forCNE', 'postCE', 'postCNE'];
let mediaControls = [];
for (let classPt of classParts) {
  mediaControls.push(getCtrlElements(classPt));
}

/**
 * @description Update video time
 * @param {*} videoFrame - Reference to video iframe element
 * @param {*} videoId - Video ID
 * @param {*} chaptersList - Reference to chapters list element
 */
const chaptersSrcHandler = (videoFrame, videoId, chaptersList) => {
  if (chaptersList) {
    chaptersList.addEventListener('click', (e) => {
      const timeInSeconds = e.target.id;
      console.log('changed time');
      videoFrame.src = `https://www.youtube.com/embed/${videoId}?start=${timeInSeconds}&autoplay=1&rel=0`;
    });
  }
};

for (let control of mediaControls) {
  chaptersSrcHandler(control.videoFrame, control.videoId, control.chaptersList);
}

/**
 * @description Controls which chapters lists to display
 * @param {*} ctrl - Object of class MediaControl
 */
const chaptersListDisplayHandler = (ctrl) => {
  let { videoFrame, videoBtns, classPart, chaptersDropdowns } = ctrl;
  for (let i = 0; i < videoBtns.length; i++) {
    if (videoBtns[i]) {
      videoBtns[i].addEventListener('click', () => {
        videoFrame.src = videoBtns[i].value;
        let videoId = videoFrame.src
          .split('/')[4]
          .substring(0, videoFrame.src.split('/')[4].indexOf('?'));
        let chaptersList = document.getElementById(
          `${classPart}chaptersList${i}`
        );
        chaptersSrcHandler(ctrl.videoFrame, videoId, chaptersList);
        for (let j = 0; j < chaptersDropdowns.length; j++) {
          if (i !== j) {
            if (!chaptersDropdowns[j].classList.contains('d-none')) {
              chaptersDropdowns[j].classList.add('d-none');
            }
          } else {
            if (chaptersDropdowns[j].classList.contains('d-none')) {
              chaptersDropdowns[j].classList.remove('d-none');
            }
          }
        }
      });
    }
  }
};

for (let control of mediaControls) {
  chaptersListDisplayHandler(control);
}
