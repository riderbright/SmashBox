
var canvas;
var context;
var bgImage;
var redShipReady;


window.onload = function(){
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 600;
    console.log(context);
    
    document.body.appendChild(canvas);
    
    

    console.log (canvas);
    //construct background
    bgImage = new Image();
    bgImage.onload = function(){
	   bgReady = true;
       //drawGame used to add all images in start postion
      // drawGame();
    console.log("background loaded")
    };
    
    bgImage.src = "sprites/canvas_1.png";
    //background image placed
    //next load other images
    
    //need constructor function for other elements
    var SpaceShip = function(x,y,speed,src){
        //input unique to each ship w this.
        //value to the redShip() & blueShip()
        //and if SpaceShip.protoype.newAttribute 
        //then u can add a shared attribute 
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.src = src;
        this.image = new Image();
        this.image.src = src;
        // added image onload/
        // learing more about add attributes 
        // & instances 
        this.image.onload = function(){
            redShipReady = true;
            console.log ("red ready");
        };

    };    //define variables w unique input
    
    var redShip = new SpaceShip(77,400,60,"sprites/spacey_1.png");
        
    //var blueShip = new SpaceShip(77,222,60,"sprites/spacey_2.png");
    
    

    spaceBox = {
        speed: 175,
        x: 1000,
        y: 350,
    };
    spaceBox.src = "";

    console.log("elements ready");
    //extra objects declared
    

    var drawGame = function(){
        //if if checklist
        if (bgReady){
            context.drawImage(bgImage,0,0);
            console.log("elements on canvas");
        } 
        if (redShipReady){
            context.drawImage(redShip.image,0,0)
            console.log("ship ready");
        }
    }

    //add event listeners,
    //waits for 1000 milliseconds before running first input,
    setTimeout(drawGame,1000);
    

}
      
    

      