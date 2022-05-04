img = "";
img1 = "";
sttus = "";
objects = [];
function preload() {
    img = loadImage('dog_cat.jpg');
    img1 = loadImage('a.jpg');
}
function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (sttus != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects detected";
            document.getElementById("count").innerHTML = "No. of objects - "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }
}
function modelLoaded() {
    console.log("model loaded!");
    sttus = true;
   
}
function gotResult(error, results) {
    if (error) {
        console.error(error)
    }
    console.log(results);
    objects = results
}