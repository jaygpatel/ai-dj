song= "";
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristY = 0;

function preload(){

 song = loadsound("music.mp3");   
}
function setup(){
    
    canvas = createCanvas(600, 500);
     canvas.center();

     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, modleLoaded)
     poseNet.on('pose', gotPoses);


}

function gotPoses(results){

    if(results.lenght>0)
    {
        console.log(results);
        scoreLeftWrist = result[0].pose.keypionts [9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
    
        console.log("leftWristX = "+ leftWristX + "leftWristY = "+leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightWristX = "+ rightWristX + "rightWristY = "+rightWristY)


    }
}

function modleLoaded(){
    console.log('poseNet is Initialized');
}

function draw(){

    image(video, 0, 0, 600, 500);
    
    fill("#FF0000");
    stroke("FF0000");
   if(scoreLeftWrist>0.2){

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY  = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    leftWristY_divide_1000 = remove_decimal/1000;
    volume = leftWristY_divide_1000 *2 ;
    document.getElementById("volume").innerHTML = "volume ="+volume;
    song.setVolume(volume);

   }
}

function play(){

    song.play();

    song.setVolume(1);
    song.rate(1);

}