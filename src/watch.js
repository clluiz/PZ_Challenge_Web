"use strict";

let videos = undefined;
let playing = undefined;

class Player {

    constructor(video, audio, subtitles) {
        this._video = video;
        this._audio = audio;
        this._video.addEventListener('ended', () => {
            if(!this._audio.ended) {
                this._video.play();
            }
        }, false);
        this._subtitles = subtitles;
    }

    start() {
        if(this._subtitles) {
            let subtitles = this._video.addTextTrack('subtitles','subtitles','en-US');
            subtitles.mode = 'showing';
            this._subtitles.forEach((subtile) => {
                subtitles.addCue(new VTTCue(subtile.time,subtile.time + 1.5,subtile.txt));
            });
        }
        this._video.play();
        this._audio.play();
    }
}

var videoPlayer = function(id, src) {

    return `<video class="video" id="video_${id}">
                <source src="${src}" type="video/mp4">
            </video>
            `; 
};

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
    playing = index;
    let container = document.getElementById("player");
    try {
        let video_object = videos.objects[index];
        document.getElementById('video_name').innerText = video_object.name;
        
        let divVideo = document.createElement('div');
        divVideo.innerHTML = videoPlayer(index, assetsLocation + "/" + video_object.bg); 
        container.appendChild(divVideo);
        let video = document.getElementById(`video_${index}`);

        let player = new Player(video, new Audio(assetsLocation + '/' + video_object.sg), video_object.txts);
        player.start();

    } catch (e) {
        alert('Este vídeo não se encontra disponível.');
        window.location.href = "index.html";
    }
}

var goTo = function(index) {
    window.location.href = `watch.html?video=${index}`;
}

var proximo = function() {
    
    let next = (playing + 1)
    if(next + 1 > videos.objects.length) {
        goTo(0);
    } else {
        goTo(next);
    }
}

var anterior = function() {
    let previous = (playing - 1)
    if(previous >= 0) {
        goTo(previous);
    }    
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        let queryString = window.location.href.split('?')[1];
        videos = JSON.parse(sessionStorage.getItem('videos'));
        init(queryString);
    };
}



