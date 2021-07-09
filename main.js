prediction1 = "";
prediction2 = "";

//camera properties
Webcam.set({
    width: 350,
     height: 350,
     image_format: 'png',
     png_quality: 90,
});

// gettting the camera 
camera = document.getElementById("camera");

Webcam.attach(camera);

//take snapshots
function takeSnapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id"captured_image" src="' + data_uri + '"/>"';        
    })
}
console.log("ml5 version:" + ml5.version);

calassifier = ml5.imageClassifier("model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

//using google to speak for me!!!!!!!!!!!!!!!!
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "And the second prediciton is" + prediction_2;
    saythis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);   
    synth.speak(saythis);    
}

//checking
function check(){
    img = document.getElementById("captured_image");
    classifier.classsify(img, gotResult);
}

//result check
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128513";   
        };                
        if(results[0].label == "Confused"){
            document.getElementById("update_emoji").innerHTML = "&#129488";   
        };                
        if(results[0].label == "Tired"){
            document.getElementById("update_emoji").innerHTML = "&#128554";   
        };
        if(results[1].label == "Happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128513";   
        };                
        if(results[1].label == "Confused"){
            document.getElementById("update_emoji2").innerHTML = "&#129488";   
        };                
        if(results[1].label == "Tired"){
            document.getElementById("update_emoji2").innerHTML = "&#128554";   
        };                                
    }
}