const preCEvideoFrame = document.getElementById('preCEvideo');
const preCEvideo0Btn = document.getElementById('preCEvideo0');
const preCEvideo1Btn = document.getElementById('preCEvideo1');
const preCEvideo2Btn = document.getElementById('preCEvideo2');
const preCEvideoContent = document.getElementById('preCEvideoContent');
let preCEvideoId = preCEvideoFrame.src.split('/')[4].substring(0, preCEvideoFrame.src.split('/')[4].indexOf('?'));
let preCEchaptersList = document.getElementById('preCEchaptersList0');

const preCNEvideoFrame = document.getElementById('preCNEvideo');
const preCNEvideo0Btn = document.getElementById('preCNEvideo0');
const preCNEvideo1Btn = document.getElementById('preCNEvideo1');
const preCNEvideo2Btn = document.getElementById('preCNEvideo2');
const preCNEvideoContent = document.getElementById('preCNEvideoContent');
let preCNEvideoId = preCNEvideoFrame.src.split('/')[4].substring(0, preCNEvideoFrame.src.split('/')[4].indexOf('?'));
let preCNEchaptersList = document.getElementById('preCNEchaptersList0');

const forCEvideoFrame = document.getElementById('forCEvideo');
const forCEvideo0Btn = document.getElementById('forCEvideo0');
const forCEvideo1Btn = document.getElementById('forCEvideo1');
const forCEvideo2Btn = document.getElementById('forCEvideo2');
const forCEvideoContent = document.getElementById('forCEvideoContent');
let forCEvideoId = forCEvideoFrame.src.split('/')[4].substring(0, forCEvideoFrame.src.split('/')[4].indexOf('?'));
let forCEchaptersList = document.getElementById('forCEchaptersList0');

const forCNEvideoFrame = document.getElementById('forCNEvideo');
const forCNEvideo0Btn = document.getElementById('forCNEvideo0');
const forCNEvideo1Btn = document.getElementById('forCNEvideo1');
const forCNEvideo2Btn = document.getElementById('forCNEvideo2');
const forCNEvideoContent = document.getElementById('forCNEvideoContent');
let forCNEvideoId = forCNEvideoFrame.src.split('/')[4].substring(0, forCNEvideoFrame.src.split('/')[4].indexOf('?'));
let forCNEchaptersList = document.getElementById('forCNEchaptersList0');

const postCEvideoFrame = document.getElementById('postCEvideo');
const postCEvideo0Btn = document.getElementById('postCEvideo0');
const postCEvideo1Btn = document.getElementById('postCEvideo1');
const postCEvideo2Btn = document.getElementById('postCEvideo2');
const postCEvideoContent = document.getElementById('postCEvideoContent');
let postCEvideoId = postCEvideoFrame.src.split('/')[4].substring(0, postCEvideoFrame.src.split('/')[4].indexOf('?'));
let postCEchaptersList = document.getElementById('postCEchaptersList0');

const postCNEvideoFrame = document.getElementById('postCNEvideo');
const postCNEvideo0Btn = document.getElementById('postCNEvideo0');
const postCNEvideo1Btn = document.getElementById('postCNEvideo1');
const postCNEvideo2Btn = document.getElementById('postCNEvideo2');
const postCNEvideoContent = document.getElementById('postCNEvideoContent');
let postCNEvideoId = postCNEvideoFrame.src.split('/')[4].substring(0, postCNEvideoFrame.src.split('/')[4].indexOf('?'));
let postCNEchaptersList = document.getElementById('postCNEchaptersList0');

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
chaptersSrcHandler(preCNEchaptersList, preCNEvideoId, preCNEvideoFrame);

chaptersSrcHandler(forCEchaptersList, forCEvideoId, forCEvideoFrame);
chaptersSrcHandler(forCNEchaptersList, forCNEvideoId, forCNEvideoFrame);

chaptersSrcHandler(postCEchaptersList, postCEvideoId, postCEvideoFrame);
chaptersSrcHandler(postCNEchaptersList, postCNEvideoId, postCNEvideoFrame);

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

if (preCNEvideo0Btn) {
    preCNEvideo0Btn.addEventListener('click', () => {
        preCNEvideoFrame.src = preCNEvideo0Btn.value;
        preCNEvideoId = preCNEvideoFrame.src.split('/')[4].substring(0, preCNEvideoFrame.src.split('/')[4].indexOf('?'));
        preCNEchaptersList = document.getElementById('preCNEchaptersList0');
        chaptersSrcHandler(preCNEchaptersList, preCNEvideoId, preCNEvideoFrame);
        if (!preCNEchaptersDropdown1.classList.contains('d-none')) {
            preCNEchaptersDropdown1.classList.add('d-none');
        }
        if (!preCNEchaptersDropdown2.classList.contains('d-none')) {
            preCNEchaptersDropdown2.classList.add('d-none');
        }
        if (preCNEchaptersDropdown0.classList.contains('d-none')) {
            preCNEchaptersDropdown0.classList.remove('d-none');
        }
    });
}

if (preCNEvideo1Btn) {
    preCNEvideo1Btn.addEventListener('click', () => {
        preCNEvideoFrame.src = preCNEvideo1Btn.value;
        preCNEvideoId = preCNEvideoFrame.src.split('/')[4].substring(0, preCNEvideoFrame.src.split('/')[4].indexOf('?'));
        preCNEchaptersList = document.getElementById('preCNEchaptersList1');
        chaptersSrcHandler(preCNEchaptersList, preCNEvideoId, preCNEvideoFrame);
        if (!preCNEchaptersDropdown0.classList.contains('d-none')) {
            preCNEchaptersDropdown0.classList.add('d-none');
        }
        if (!preCNEchaptersDropdown2.classList.contains('d-none')) {
            preCNEchaptersDropdown2.classList.add('d-none');
        }
        if (preCNEchaptersDropdown1.classList.contains('d-none')) {
            preCNEchaptersDropdown1.classList.remove('d-none');
        }
    });
}

if (preCNEvideo2Btn) {
    preCNEvideo2Btn.addEventListener('click', () => {
        preCNEvideoFrame.src = preCNEvideo2Btn.value;
        preCNEvideoId = preCNEvideoFrame.src.split('/')[4].substring(0, preCNEvideoFrame.src.split('/')[4].indexOf('?'));
        preCNEchaptersList = document.getElementById('preCNEchaptersList2');
        chaptersSrcHandler(preCNEchaptersList, preCNEvideoId, preCNEvideoFrame);
        if (!preCNEchaptersDropdown0.classList.contains('d-none')) {
            preCNEchaptersDropdown0.classList.add('d-none');
        }
        if (!preCNEchaptersDropdown1.classList.contains('d-none')) {
            preCNEchaptersDropdown1.classList.add('d-none');
        }
        if (preCNEchaptersDropdown2.classList.contains('d-none')) {
            preCNEchaptersDropdown2.classList.remove('d-none');
        }
    });
}

if (forCEvideo0Btn) {
    forCEvideo0Btn.addEventListener('click', () => {
        forCEvideoFrame.src = forCEvideo0Btn.value;
        forCEvideoId = forCEvideoFrame.src.split('/')[4].substring(0, forCEvideoFrame.src.split('/')[4].indexOf('?'));
        forCEchaptersList = document.getElementById('forCEchaptersList0');
        chaptersSrcHandler(forCEchaptersList, forCEvideoId, forCEvideoFrame);
        if (!forCEchaptersDropdown1.classList.contains('d-none')) {
            forCEchaptersDropdown1.classList.add('d-none');
        }
        if (!forCEchaptersDropdown2.classList.contains('d-none')) {
            forCEchaptersDropdown2.classList.add('d-none');
        }
        if (forCEchaptersDropdown0.classList.contains('d-none')) {
            forCEchaptersDropdown0.classList.remove('d-none');
        }
    });
}

if (forCEvideo1Btn) {
    forCEvideo1Btn.addEventListener('click', () => {
        forCEvideoFrame.src = forCEvideo1Btn.value;
        forCEvideoId = forCEvideoFrame.src.split('/')[4].substring(0, forCEvideoFrame.src.split('/')[4].indexOf('?'));
        forCEchaptersList = document.getElementById('forCEchaptersList1');
        chaptersSrcHandler(forCEchaptersList, forCEvideoId, forCEvideoFrame);
        if (!forCEchaptersDropdown0.classList.contains('d-none')) {
            forCEchaptersDropdown0.classList.add('d-none');
        }
        if (!forCEchaptersDropdown2.classList.contains('d-none')) {
            forCEchaptersDropdown2.classList.add('d-none');
        }
        if (forCEchaptersDropdown1.classList.contains('d-none')) {
            forCEchaptersDropdown1.classList.remove('d-none');
        }
    });
}

if (forCEvideo2Btn) {
    forCEvideo2Btn.addEventListener('click', () => {
        forCEvideoFrame.src = forCEvideo2Btn.value;
        forCEvideoId = forCEvideoFrame.src.split('/')[4].substring(0, forCEvideoFrame.src.split('/')[4].indexOf('?'));
        forCEchaptersList = document.getElementById('forCEchaptersList2');
        chaptersSrcHandler(forCEchaptersList, forCEvideoId, forCEvideoFrame);
        if (!forCEchaptersDropdown0.classList.contains('d-none')) {
            forCEchaptersDropdown0.classList.add('d-none');
        }
        if (!forCEchaptersDropdown1.classList.contains('d-none')) {
            forCEchaptersDropdown1.classList.add('d-none');
        }
        if (forCEchaptersDropdown2.classList.contains('d-none')) {
            forCEchaptersDropdown2.classList.remove('d-none');
        }
    });
}

if (forCNEvideo0Btn) {
    forCNEvideo0Btn.addEventListener('click', () => {
        forCNEvideoFrame.src = forCNEvideo0Btn.value;
        forCNEvideoId = forCNEvideoFrame.src.split('/')[4].substring(0, forCNEvideoFrame.src.split('/')[4].indexOf('?'));
        forCNEchaptersList = document.getElementById('forCNEchaptersList0');
        chaptersSrcHandler(forCNEchaptersList, forCNEvideoId, forCNEvideoFrame);
        if (!forCNEchaptersDropdown1.classList.contains('d-none')) {
            forCNEchaptersDropdown1.classList.add('d-none');
        }
        if (!forCNEchaptersDropdown2.classList.contains('d-none')) {
            forCNEchaptersDropdown2.classList.add('d-none');
        }
        if (forCNEchaptersDropdown0.classList.contains('d-none')) {
            forCNEchaptersDropdown0.classList.remove('d-none');
        }
    });
}

if (forCNEvideo1Btn) {
    forCNEvideo1Btn.addEventListener('click', () => {
        forCNEvideoFrame.src = forCNEvideo1Btn.value;
        forCNEvideoId = forCNEvideoFrame.src.split('/')[4].substring(0, forCNEvideoFrame.src.split('/')[4].indexOf('?'));
        forCNEchaptersList = document.getElementById('forCNEchaptersList1');
        chaptersSrcHandler(forCNEchaptersList, forCNEvideoId, forCNEvideoFrame);
        if (!forCNEchaptersDropdown0.classList.contains('d-none')) {
            forCNEchaptersDropdown0.classList.add('d-none');
        }
        if (!forCNEchaptersDropdown2.classList.contains('d-none')) {
            forCNEchaptersDropdown2.classList.add('d-none');
        }
        if (forCNEchaptersDropdown1.classList.contains('d-none')) {
            forCNEchaptersDropdown1.classList.remove('d-none');
        }
    });
}

if (forCNEvideo2Btn) {
    forCNEvideo2Btn.addEventListener('click', () => {
        forCNEvideoFrame.src = forCNEvideo2Btn.value;
        forCNEvideoId = forCNEvideoFrame.src.split('/')[4].substring(0, forCNEvideoFrame.src.split('/')[4].indexOf('?'));
        forCNEchaptersList = document.getElementById('forCNEchaptersList2');
        chaptersSrcHandler(forCNEchaptersList, forCNEvideoId, forCNEvideoFrame);
        if (!forCNEchaptersDropdown0.classList.contains('d-none')) {
            forCNEchaptersDropdown0.classList.add('d-none');
        }
        if (!forCNEchaptersDropdown1.classList.contains('d-none')) {
            forCNEchaptersDropdown1.classList.add('d-none');
        }
        if (forCNEchaptersDropdown2.classList.contains('d-none')) {
            forCNEchaptersDropdown2.classList.remove('d-none');
        }
    });
}

if (postCEvideo0Btn) {
    postCEvideo0Btn.addEventListener('click', () => {
        postCEvideoFrame.src = postCEvideo0Btn.value;
        postCEvideoId = postCEvideoFrame.src.split('/')[4].substring(0, postCEvideoFrame.src.split('/')[4].indexOf('?'));
        postCEchaptersList = document.getElementById('postCEchaptersList0');
        chaptersSrcHandler(postCEchaptersList, postCEvideoId, postCEvideoFrame);
        if (!postCEchaptersDropdown1.classList.contains('d-none')) {
            postCEchaptersDropdown1.classList.add('d-none');
        }
        if (!postCEchaptersDropdown2.classList.contains('d-none')) {
            postCEchaptersDropdown2.classList.add('d-none');
        }
        if (postCEchaptersDropdown0.classList.contains('d-none')) {
            postCEchaptersDropdown0.classList.remove('d-none');
        }
    });
}

if (postCEvideo1Btn) {
    postCEvideo1Btn.addEventListener('click', () => {
        postCEvideoFrame.src = postCEvideo1Btn.value;
        postCEvideoId = postCEvideoFrame.src.split('/')[4].substring(0, postCEvideoFrame.src.split('/')[4].indexOf('?'));
        postCEchaptersList = document.getElementById('postCEchaptersList1');
        chaptersSrcHandler(postCEchaptersList, postCEvideoId, postCEvideoFrame);
        if (!postCEchaptersDropdown0.classList.contains('d-none')) {
            postCEchaptersDropdown0.classList.add('d-none');
        }
        if (!postCEchaptersDropdown2.classList.contains('d-none')) {
            postCEchaptersDropdown2.classList.add('d-none');
        }
        if (postCEchaptersDropdown1.classList.contains('d-none')) {
            postCEchaptersDropdown1.classList.remove('d-none');
        }
    });
}

if (postCEvideo2Btn) {
    postCEvideo2Btn.addEventListener('click', () => {
        postCEvideoFrame.src = postCEvideo2Btn.value;
        postCEvideoId = postCEvideoFrame.src.split('/')[4].substring(0, postCEvideoFrame.src.split('/')[4].indexOf('?'));
        postCEchaptersList = document.getElementById('postCEchaptersList2');
        chaptersSrcHandler(postCEchaptersList, postCEvideoId, postCEvideoFrame);
        if (!postCEchaptersDropdown0.classList.contains('d-none')) {
            postCEchaptersDropdown0.classList.add('d-none');
        }
        if (!postCEchaptersDropdown1.classList.contains('d-none')) {
            postCEchaptersDropdown1.classList.add('d-none');
        }
        if (postCEchaptersDropdown2.classList.contains('d-none')) {
            postCEchaptersDropdown2.classList.remove('d-none');
        }
    });
}

if (postCNEvideo0Btn) {
    postCNEvideo0Btn.addEventListener('click', () => {
        postCNEvideoFrame.src = postCNEvideo0Btn.value;
        postCNEvideoId = postCNEvideoFrame.src.split('/')[4].substring(0, postCNEvideoFrame.src.split('/')[4].indexOf('?'));
        postCNEchaptersList = document.getElementById('postCNEchaptersList0');
        chaptersSrcHandler(postCNEchaptersList, postCNEvideoId, postCNEvideoFrame);
        if (!postCNEchaptersDropdown1.classList.contains('d-none')) {
            postCNEchaptersDropdown1.classList.add('d-none');
        }
        if (!postCNEchaptersDropdown2.classList.contains('d-none')) {
            postCNEchaptersDropdown2.classList.add('d-none');
        }
        if (postCNEchaptersDropdown0.classList.contains('d-none')) {
            postCNEchaptersDropdown0.classList.remove('d-none');
        }
    });
}

if (postCNEvideo1Btn) {
    postCNEvideo1Btn.addEventListener('click', () => {
        postCNEvideoFrame.src = postCNEvideo1Btn.value;
        postCNEvideoId = postCNEvideoFrame.src.split('/')[4].substring(0, postCNEvideoFrame.src.split('/')[4].indexOf('?'));
        postCNEchaptersList = document.getElementById('postCNEchaptersList1');
        chaptersSrcHandler(postCNEchaptersList, postCNEvideoId, postCNEvideoFrame);
        if (!postCNEchaptersDropdown0.classList.contains('d-none')) {
            postCNEchaptersDropdown0.classList.add('d-none');
        }
        if (!postCNEchaptersDropdown2.classList.contains('d-none')) {
            postCNEchaptersDropdown2.classList.add('d-none');
        }
        if (postCNEchaptersDropdown1.classList.contains('d-none')) {
            postCNEchaptersDropdown1.classList.remove('d-none');
        }
    });
}

if (postCNEvideo2Btn) {
    postCNEvideo2Btn.addEventListener('click', () => {
        postCNEvideoFrame.src = postCNEvideo2Btn.value;
        postCNEvideoId = postCNEvideoFrame.src.split('/')[4].substring(0, postCNEvideoFrame.src.split('/')[4].indexOf('?'));
        postCNEchaptersList = document.getElementById('postCNEchaptersList2');
        chaptersSrcHandler(postCNEchaptersList, postCNEvideoId, postCNEvideoFrame);
        if (!postCNEchaptersDropdown0.classList.contains('d-none')) {
            postCNEchaptersDropdown0.classList.add('d-none');
        }
        if (!postCNEchaptersDropdown1.classList.contains('d-none')) {
            postCNEchaptersDropdown1.classList.add('d-none');
        }
        if (postCNEchaptersDropdown2.classList.contains('d-none')) {
            postCNEchaptersDropdown2.classList.remove('d-none');
        }
    });
}