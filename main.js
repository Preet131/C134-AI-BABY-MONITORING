alert_sound = "";
labels = [];
status = "";
objects = [];
function preload() {
    alert_sound = loadSound('alert.wav');

}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects...";

}


function modelLoaded() {
    console.log("Model Initialized!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
}


function draw() {

    image(video, 0, 0, 600, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = (objects.length - 1); i >= 0; i--) {
            document.getElementById("status").innerHTML = "Status: Objects Detected!";

            if (labels.includes(objects[i].label)) {
                continue;

            }
            if (labels == "person") {
                document.getElementById("status").innerHTML = "Status: Baby Detected";
                if (alert_sound.isPlaying == true) {
                    alert_sound.stop();
                }
            }
            if (labels != 'person' || objects.length < 0) 
            {
                    alert_sound.play();
            }
            console.log(alert_sound.isPlaying())
            labels = objects[i].label;


        }
    }
}