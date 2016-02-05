
var canvas;
var context;
var bgImage;
var bgRange;
var bgReady;
var redShipReady;
var boxReady;
var keysDown;


window.onload = function(){
    //var bounds = canvas.getBoundingClientRect();
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 600;
    console.log(context);
    
    document.body.appendChild(canvas);
    
    bgImage = new Image();
    bgImage.onload = function(){
	   bgReady = true;///
        console.log("background loaded")
    };
    bgImage.src = "sprites/canvas_1.png";
    
    
    //need extra input for shot function
    var SpaceShip = function(x,y,speed,src,shot,gameMove){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.src = src;
        this.shot = shot;
        this.gameMove = gameMove;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = function(){
            redShipReady = true;
            console.log ("red ready");
        };

    }; 
    
    //add shot function variable to SpaceShip construction
    
    var redShip = new SpaceShip(100,390,250,"sprites/spacey_1_one.png",0,0);
    var blueShip = new SpaceShip(100,170,250,"sprites/spacey_2_one.png",0,0);
    var boxShip = new SpaceShip(1270,350,100,"sprites/spacey_box_1.png",100,10);
    var bgRange = new SpaceShip(0,450,0,"sprites/spacey_range_5.png",0,0);
    
    console.log("elements ready");
       
    
    keysDown = {}
        //add event
        document.addEventListener("keydown",function(e){
            keysDown[e.keyCode] = true
            
        }, false);
        
        document.addEventListener("keyup",function(e){
            delete keysDown[e.keyCode];
                
        }, false);
        
        console.log("listeners ready");
    
    var reset = function () {

        
    };
    

    var update = function (modifier){
        // debugger
        if (boxShip.gameMove === 10) {
            boxShip.x -= 6; //* modifier;
        }
        if (38 in keysDown) { 
            redShip.y -= redShip.speed * modifier;
        }
        if (40 in keysDown) { 
            redShip.y += redShip.speed * modifier;
        }

        if (87 in keysDown) { 
            blueShip.y -= blueShip.speed * modifier;
        }
        if (83 in keysDown) { 
            blueShip.y += blueShip.speed * modifier;
        }
        //hit
        if (redShip.x <= (boxShip.x + 20)
            && boxShip.x <= (redShip.x + 20)
            && redShip.y <= (boxShip.y + 20)
            && boxShip.y <= (redShip.y + 20)
        
        
        ) {console.log("Hit! * 7 red");
            
        }
        if (blueShip.x <= (boxShip.x + 20)
            && boxShip.x <= (blueShip.x + 20)
            && blueShip.y <= (boxShip.y + 20)
            && boxShip.y <= (blueShip.y + 20)
        ){console.log("Hit! * 7 blue");

        }
    };

    var drawGame = function(){
        //if if checklist
        if (bgReady){
            context.drawImage(bgImage,0,0);
            //console.log("elements on canvas");
        } 
        if (redShipReady){
            context.drawImage(bgRange.image,bgRange.x,bgRange.y);
            context.drawImage(boxShip.image,boxShip.x,boxShip.y);
            context.drawImage(redShip.image,redShip.x,redShip.y);
            context.drawImage(blueShip.image,blueShip.x,blueShip.y);
        
        
            
            //console.log("ship ready");
        };    
    };
    //gameClock
    //tickTock game clock
    
    var tickTock = function () {
        var now = Date.now();
        var delta = now - then;
    
        update(delta / 1000);
        drawGame();
        
    
        then = now;
        //console.log("tick tock")
        
        requestAnimationFrame(tickTock);
    };
    //keeps timer more even through different browser
    var w = window;
    requestAnimationFrame = 
    w.requestAnimationFrame || 
    w.webkitRequestAnimationFrame || 
    w.msRequestAnimationFrame || 
    w.mozRequestAnimationFrame;
    
    var then = Date.now();
    update();
    tickTock();
    
};
     
            
      