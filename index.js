'use strict'

// variable
/*
const medias = {audio: false, video: {
                    facingMode: {
                        exact: 'environment'
                    }
                }},
                */
const medias = {audio: false, video: true},
    video = document.getElementById("video"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    snapshotCanvas = document.getElementById('snapshot'),
    captureButton = document.getElementById('capture');

var num = 1;




/////////////
//click action
/////////////


captureButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
    let message = document.getElementById("msg");

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

            var elem = document.createElement('div');
            elem.innerHTML = "<div id=" + num + " style='width:300px;'><img src=" + url + " /></div><br>"

            var parent = document.getElementById("results");
            parent.insertBefore(elem, parent.firstChild);

            var numdiv = document.getElementById(num);
            var msg = document.createElement('div');

            msg.innerHTML = result.text;
            numdiv.appendChild(msg);
            num += 1;
        });
});



//
requestAnimationFrame(draw);
navigator.getUserMedia(medias, successCallback, errorCallback);



// functions
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
