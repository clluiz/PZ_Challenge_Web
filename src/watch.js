"use strict";

let videos = undefined;

class Player {

    constructor(video, audio) {
        this._video = video;
        this._audio = audio;
        // this._video.addEventListener('ended', () => {
        //     if(!this._audio.ended) {
        //         this._video.play();
        //     }
        // }, false);
    }

    start() {

        this._video.play();
        this._audio.play();
    }
}

var videoPlayer = function(id, src) {

    return `<video id="video_${id}" controls>
                <source src="${src}" type="video/mp4">
            </video>
            `; 
};

var audioPlayer = function(id, src) {

    return `<audio id="audio_${id}" controls>
                <source src="${src}" type="video/mp4">
            </audio>
            `;
}

var init = function(queryString) {

    if (!queryString || queryString.search('video') === -1) {
        alert('Ops! Parametros inválidos!');
        return;
    }

    let rawParameters = queryString.split('&');
    let parameters = {};
    rawParameters.forEach(function(element) {
        let arr = element.split('='),
            key = arr[0],
            value = arr[1];
        parameters[key] = parseInt(value);
    });

    start(parameters.video);
}

var start = function(index) {

    let assetsLocation = videos.assetsLocation;
    let container = document.getElementById("player");
    try {
        let video_object = videos.objects[index];
        document.getElementById('video_name').innerText = video_object.name;
        
        let divVideo = document.createElement('div');
        divVideo.innerHTML = videoPlayer(index, assetsLocation + "/" + video_object.bg); 
        container.appendChild(divVideo);
        let video = document.getElementById(`video_${index}`);

        let player = new Player(video, new Audio(assetsLocation + '/' + video_object.sg));
        player.start();

    } catch (e) {
        alert('Este vídeo não se encontra disponível.');
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        let queryString = window.location.href.split('?')[1];
        videos = JSON.parse(sessionStorage.getItem('videos'));
        init(queryString);
    };
}



