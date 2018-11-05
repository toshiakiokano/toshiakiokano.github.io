const medias = {audio: false, video; {
    facingMode: "user"
}};
//const medias = {audio: false, video: true};
const video = document.getElementById("video");

navigator.getUserMedia(medias, successCallback, errorCallback);

function successCallback(stream) {
    video.srcObject = stream;
}
function errorCallback(error) {
    alert(error);
}
