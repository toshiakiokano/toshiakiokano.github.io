'use strict'

///////////////
// variable
///////////////
const medias = {audio: false, video: {
                    facingMode: {
                        exact: 'environment'
                    }
                }},
const medias = {audio: false, video: true},
    video = document.getElementById("video"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    snapshotCanvas = document.getElementById('snapshot'),
    captureButton = document.getElementById('capture'),
    message = document.getElementById("msg");


var num = 1;




///////////////
//click action
///////////////


captureButton.addEventListener('click', function() {
    let context = snapshot.getContext('2d');

    context.drawImage(video, 100, 300, 600, 200, 0, 0, snapshotCanvas.width,
        snapshotCanvas.height);

    const url = snapshot.toDataURL("image/png");

    Tesseract
        .recognize(url, {
            lang: 'eng'
        })
        .progress(function(p) {
            message.innerText = p.status + ": " + p.progress;
        })
        .then(function(result) {
            console.log(result);

            message.innerText = "Progress Complete";

            let elem = document.createElement('div');
            elem.innerHTML = "<div id=" + num + " style='width:300px;'><img src=" + url + " /></div><br>"

            let parent = document.getElementById("results");
            parent.insertBefore(elem, parent.firstChild);

            let numdiv = document.getElementById(num);
            let msg = document.createElement('div');

            msg.innerHTML = result.text;
            numdiv.appendChild(msg);

            num += 1;
        });
});



///////////////
// initialize
///////////////
requestAnimationFrame(draw);
navigator.getUserMedia(medias, successCallback, errorCallback);
firstLoading();



///////////////
// functions
///////////////
function successCallback(stream) {
    video.srcObject = stream;
};
function errorCallback(error) {
    console.log(error);
};


function draw() {
    canvas.width = 300
    //window.innerWidth;
    canvas.height = 100
    //window.innerHeight;

    ctx.drawImage(video, 100, 300, 600, 200,
        0, 0, 300, 100);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;

    for(let i = 0; i < data.length; i += 4) {
        let ave = (data[i + 0] + data[i + 1] + data[i + 2]) / 3;

        data[i + 0] =
            data[i + 1] =
                data[i + 2] = (ave > 255 / 2) ? 255 : (ave > 255 / 4) ? 127 : 0;
        data[i + 3] = 255;
    }

    ctx.putImageData(imgData, 0, 0);
    requestAnimationFrame(draw);
}


function firstLoading() {
    Tesseract
        .recognize("u.jpg", {
            lang: 'jpn'
        })
        .progress(function(p) {
            message.innerText = "準備中" + p.status + ":  " + (100 * p.progress).toFixed(1) + "%";
        })
        .then(function(result) {
            message.innerText = "準備完了";
        });
}
