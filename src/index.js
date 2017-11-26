const proxy = 'https://cors-anywhere.herokuapp.com/';
const videos = 'http://pbmedia.pepblast.com/pz_challenge/assets.json';

var videoComponent = (img, name) => {
    return `<div>
                <img src="${img}" alt="${name}">
                <p>${name}</p>
            </div>`
};

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        fetch(proxy + videos, {
            "method": 'get',
            "content-type": 'application/json'
        }).then((response) => response.json())
            .then(function (data) {
                let videos = data.objects;
                let videosContainer = document.getElementById("videos");
                let assetsLocation = data.assetsLocation;
                let domParser = new DOMParser();
                videos.forEach((video) => {
                    let li = document.createElement('li');
                    li.innerHTML = videoComponent(assetsLocation + '/' + video.im, video.name); 
                    videosContainer.appendChild(li);
                });
            });
    };
}