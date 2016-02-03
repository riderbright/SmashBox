
var canvas;
var context;
var bgImage;

window.onload = function(){
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 700;
    console.log(context);
    
    document.body.appendChild(canvas);
    //canvas var defined
    console.log("canvas placed");
    console.log (canvas)
    
    bgImage = new Image();
    bgImage.onload = function(){
	   bgReady = true;
       drawBackground();
    console.log("background loaded")
    };
    
    bgImage.src = "sprites/canvas_1.png";
    //background image placed
    //next load other images
    
    console.log(bgImage);

    //declare other variables
    var spaceShip = {
        speed: 200, 
        x: 77,
        y: 350,
    };
    spaceShip.src = "";
    
    

    var spaceBox = {
        speed: 175,
        x: 1000,
        y: 350,
    };
    spaceBox.src = "";

    console.log("elements ready");
    //extra objects declared
    var boxesKilled = 0;
    var lifeCount = 3;

    var drawBackground = function () {
       if (bgReady){
        context.drawImage(bgImage,0,0);
        console.log("elements on canvas");
        }
    }


    

}
      
    

      