/**
 * @file Knowmia ourse dashboard media controls (handles videos changing)
 */

/**
 * @description Class to handle media control in the course dashboards
 */
class MediaControl {
  constructor(videoFrame, videoBtns, videoContent, videoUrl, classPart) {
    this.videoFrame = videoFrame;
    this.videoBtns = videoBtns;
    this.videoContent = videoContent;
    this.videoUrl = videoUrl;
    this.classPart = classPart;
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
  const videoContent = document.getElementById(`${baseStr}content`);
  const videoUrl = videoFrame.src
    .substring(0, videoFrame.src.length - 2);
  return new MediaControl(
    videoFrame,
    videoBtns,
    videoContent,
    videoUrl,
    classPart,
  );
};

const classParts = ['preCE', 'preCNE', 'forCE', 'forCNE', 'postCE', 'postCNE'];
let mediaControls = [];
for (let classPt of classParts) {
  mediaControls.push(getCtrlElements(classPt));
}

/**
 * @description Controls which chapters lists to display
 * @param {*} ctrl - Object of class MediaControl
 */
const changeVideoHandler = (ctrl) => {
  let { videoFrame, videoBtns, classPart } = ctrl;
  for (let i = 0; i < videoBtns.length; i++) {
      if (videoBtns[i]) {
          videoBtns[i].addEventListener('click', () => {
              videoFrame.src = `${videoBtns[i].value}/e`;
          });
      }
  }
}

for (let control of mediaControls) {
  changeVideoHandler(control);
}