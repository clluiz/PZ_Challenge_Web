const proxy = 'https://cors-anywhere.herokuapp.com/';
const videos = 'http://pbmedia.pepblast.com/pz_challenge/assets.json';

var videoComponent = (img,name,index) => {
    return `<div class="library__video">
                <a href="watch.html?video=${index}" target="blank">
                    <img src="${img}" alt="${name}">
                </a>
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

                sessionStorage.setItem('videos', JSON.stringify(data));
                let videos = data.objects;
                let videosContainer = document.getElementById("videos");
                let assetsLocation = data.assetsLocation;
                videos.forEach((video,index) => {
                    let li = document.createElement('li');
                    li.innerHTML = videoComponent(assetsLocation + '/' + video.im, video.name, index); 
                    videosContainer.appendChild(li);
                });
            });
    };
}