objects = [];
video = "";
status = "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw()
{
    image(video, 0, 0, 640, 420);
    if(status != "")
    {
        object_detector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "The number of objects are: " + objects.length;

            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start()
{
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded()
{
    console.log("cocossd is initialized!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}