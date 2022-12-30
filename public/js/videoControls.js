const preCEvideoFrame = document.getElementById('preCEvideo');
const preCEvideo0Btn = document.getElementById('preCEvideo0');
const preCEvideo1Btn = document.getElementById('preCEvideo1');
const preCEvideo2Btn = document.getElementById('preCEvideo2');
const preCEvideoContent = document.getElementById('preCEvideoContent');
let preCEvideoId = preCEvideoFrame.src.split('/')[4].substring(0, preCEvideoFrame.src.split('/')[4].indexOf('?'));
let preCEchaptersList = document.getElementById('preCEchaptersList0');

// const preCEvideosList = document.getElementById('preCEvideosList');
const chaptersSrcHandler = (chaptersList, videoId, videoFrame) => {
    if (chaptersList) {
        chaptersList.addEventListener('click', (e) => {
            const timeInSeconds = e.target.id;
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?start=${timeInSeconds}&autoplay=1&rel=0`;
        });
    }
}

chaptersSrcHandler(preCEchaptersList, preCEvideoId, preCEvideoFrame);

// if (typeof videosList !== 'undefined') {
//     videosList.addEventListener('click', (e) => {
//         location.href = e.target.id;
//     });
// }

if (preCEvideo0Btn) {
    preCEvideo0Btn.addEventListener('click', () => {
        preCEvideoFrame.src = preCEvideo0Btn.value;
        preCEvideoId = preCEvideoFrame.src.split('/')[4].substring(0, preCEvideoFrame.src.split('/')[4].indexOf('?'));
        preCEchaptersList = document.getElementById('preCEchaptersList0');
        chaptersSrcHandler(preCEchaptersList, preCEvideoId, preCEvideoFrame);
        if (!preCEchaptersDropdown1.classList.contains('d-none')) {
            preCEchaptersDropdown1.classList.add('d-none');
        }
        if (!preCEchaptersDropdown2.classList.contains('d-none')) {
            preCEchaptersDropdown2.classList.add('d-none');
        }
        if (preCEchaptersDropdown0.classList.contains('d-none')) {
            preCEchaptersDropdown0.classList.remove('d-none');
        }
    });
}

if (preCEvideo1Btn) {
    preCEvideo1Btn.addEventListener('click', () => {
        preCEvideoFrame.src = preCEvideo1Btn.value;
        preCEvideoId = preCEvideoFrame.src.split('/')[4].substring(0, preCEvideoFrame.src.split('/')[4].indexOf('?'));
        preCEchaptersList = document.getElementById('preCEchaptersList1');
        chaptersSrcHandler(preCEchaptersList, preCEvideoId, preCEvideoFrame);
        if (!preCEchaptersDropdown0.classList.contains('d-none')) {
            preCEchaptersDropdown0.classList.add('d-none');
        }
        if (!preCEchaptersDropdown2.classList.contains('d-none')) {
            preCEchaptersDropdown2.classList.add('d-none');
        }
        if (preCEchaptersDropdown1.classList.contains('d-none')) {
            preCEchaptersDropdown1.classList.remove('d-none');
        }
    });
}

if (preCEvideo2Btn) {
    preCEvideo2Btn.addEventListener('click', () => {
        preCEvideoFrame.src = preCEvideo2Btn.value;
        preCEvideoId = preCEvideoFrame.src.split('/')[4].substring(0, preCEvideoFrame.src.split('/')[4].indexOf('?'));
        preCEchaptersList = document.getElementById('preCEchaptersList2');
        chaptersSrcHandler(preCEchaptersList, preCEvideoId, preCEvideoFrame);
        if (!preCEchaptersDropdown0.classList.contains('d-none')) {
            preCEchaptersDropdown0.classList.add('d-none');
        }
        if (!preCEchaptersDropdown1.classList.contains('d-none')) {
            preCEchaptersDropdown1.classList.add('d-none');
        }
        if (preCEchaptersDropdown2.classList.contains('d-none')) {
            preCEchaptersDropdown2.classList.remove('d-none');
        }
    });
}