/**
 * @file Gets yt video chapters information from description. Uses youtube api.
 */

const axios = require('axios');
const youtubeApiKey = process.env.YOUTUBE_API_KEY;

const getChaptersData = async (videoId) => {
    // If video ID is null, return false
    if (videoId === '') {
        return false;
    }

    // Function for filtering array elements which don't contain a timestamp
    const notText = (array) => {
        const regexTimePattern = /\d:\d/;
        for (let i = 0; i < array.length; i++) {
            let result = regexTimePattern.exec(array[i]);
            if (result === null) {
                array[i] = "";
            }
        }
    }
    const videoDataResponse = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeApiKey}`,
        { headers: { 'Accept': 'application/json' } }
    );
    const description = JSON.stringify(videoDataResponse.data.items[0].snippet.description); //DESCRIÇÃO DO VÍDEO

    // Find [number]:[number] pattern in description
    const numberNumberPattern = /\d:\d/gi;
    let descriptionLines = [], numberNumbeResult;
    while ((numberNumbeResult = numberNumberPattern.exec(description))) {
        descriptionLines.push(numberNumbeResult.index);
    }

    let min = [], sec = [], hour = [], chapterTitle = [], chapterStartIndex, chapterEndIndex;

    // Verifies if last [number]:[number] correspondence is in the last description line
    if (description.indexOf("\\n", descriptionLines[descriptionLines.length - 1]) === -1) { //é na última linha
        chapterEndIndex = description.length - 1;
    } else { // not in the last line
        chapterEndIndex = description.indexOf("\\n", descriptionLines[descriptionLines.length - 1]);
    }

    // Verifies if first [number]:[number] correspondence is in the first description line
    switch (descriptionLines[0]) {
        case 1: // it's in the first line ([number]:[number] pattern)
            chapterStartIndex = 1;
            break;
        case 2: // it's in the first line ([number][number]:[number] pattern)
            chapterStartIndex = 2;
            break;
        default: //it's not in the first line
            const auxiliarString = description.substring(descriptionLines[0] - 6);
            chapterStartIndex = auxiliarString.indexOf("\\n") + descriptionLines[0] - 4;
    }

    // get description part with timestamp and titles
    const chapters = description.substring(chapterStartIndex, chapterEndIndex);

    // separete lines
    const notFilteredLine = chapters.split("\\n");

    // filter lines which don't have [number]:[number] pattern
    notText(notFilteredLine);

    // filter empty lines
    const filteredLine = notFilteredLine.filter(Boolean);


    for (let i = 0; i < filteredLine.length; i++) {
        const notNumberOrColonRegex = /[^:\d]/; // not number nor ":"
        const numberRegex = /\d/; // number
        let numberResult = numberRegex.exec(filteredLine[i]);
        filteredLine[i] = filteredLine[i].substring(numberResult.index); // starts line in first number found
        let notNumberOrColonResult = notNumberOrColonRegex.exec(filteredLine[i]);
        let tempo = filteredLine[i].substring(0, notNumberOrColonResult.index); // timestamp end (not number nor ":")
        let tempoSeparado = tempo.split(":"); // split timestamps in each ":"
        switch (tempoSeparado.length) {
            case 2: // doesn't have hour
                hour[i] = 0;
                min[i] = Number(tempoSeparado[0]);
                sec[i] = Number(tempoSeparado[1]);
                break;
            case 3: // has hour
                hour[i] = Number(tempoSeparado[0]);
                min[i] = Number(tempoSeparado[1]);
                sec[i] = Number(tempoSeparado[2]);
                break;
        }
        const numberOrLetterRegex = /[a-z0-9]/i; // number or letter 
        const auxiliarString = filteredLine[i].substring(notNumberOrColonResult.index); // auxiliar string starts when not number nor ":"
        let numberOrLetterResult = numberOrLetterRegex.exec(auxiliarString);

        // chapter title starts in first letter or number found in auxiliarString
        chapterTitle[i] = auxiliarString.substring(numberOrLetterResult.index);
    }
    let chaptersData = [];
    for (let i = 0; i < chapterTitle.length; i++) {
        chaptersData[i] = {
            title: chapterTitle[i],
            timestamp: [hour[i], min[i], sec[i]]
        }
    }
    return chaptersData;
}

exports.getChaptersData = getChaptersData;