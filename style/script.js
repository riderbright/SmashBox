
var canvas;
var context;
var bgImage;
var bgReady;
var redShipReady;

window.onload = function(){
    //var bounds = canvas.getBoundingClientRect();
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 600;
    console.log(context);
    
    document.body.appendChild(canvas);
    
    

    console.log ("canvas");
    bgImage = new Image();
    bgImage.onload = function(){
	   bgReady = true;///
        console.log("background loaded")
    };
    bgImage.src = "sprites/canvas_1.png";
    
    

    var SpaceShip = function(x,y,speed,src,heart){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.src = src;
        this.heart = heart;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = function(){
            redShipReady = true;
            console.log ("red ready");
        };

    }; 
    
    
    var redShip = new SpaceShip(100,450,100,"sprites/spacey_1_one.png",3);
    var blueShip = new SpaceShip(100,250,100,"sprites/spacey_2_one.png",3);
    var boxShip = new SpaceShip(1100,350,100,"sprites/spacey_box_1.png",0);    
    

    console.log("elements ready");
    //declare other extra game objects
  
    
    
    var keysDown = {}
        //add event
        document.addEventListener("keydown",function(e){
            keysDown[e.keycode==38||40||39||37] = true
            console.log("keys down")
        }, false);
        
        document.addEventListener("keyup",function(e){
            delete keysDown[e.keycode==38||40||39||37];
            console.log("keys down")    
        }, false);
        
        console.log("listeners ready");
    
    var reset = function () {
        
    };
    console.log("reset funk"); 

//add switch function
    var update = function (modifier){
        if (38 in keysDown) { 
            redship.y -= redShip.speed * modifier;
        }
        if (40 in keysDown) { 
            redShip.y += redShip.speed * modifier;
        }
        if (37 in keysDown) { 
            redShip.x -= redShip.speed * modifier;
        }
        if (39 in keysDown) { 
            redShip.x += redShip.speed * modifier;
        }
       
        console.log("updating")
        
        if (redShip.x <= (boxShip.x + 25)
            && boxShip.x <= (redShip.x + 25)
            && redShip.y <= (boxShip.y + 25)
            && boxShip.y <= (redShip.y + 25)
        
        //   if (blueShip.x <= (boxShip.x + 25)
        //    && boxShip.x <= (blueShip.x + 25)
        //    && blueShip.y <= (boxShip.y + 25)
        //    && boxShip.y <= (blueShip.y + 25)
        ) { heartCount=1;
            reset();
        }
    };

    var drawGame = function(){
        //if if checklist
        if (bgReady){
            context.drawImage(bgImage,0,0);
            console.log("elements on canvas");
        } 
        if (redShipReady){
            context.drawImage(boxShip.image,boxShip.x,boxShip.y);
            context.drawImage(redShip.image,redShip.x,redShip.y);
            context.drawImage(blueShip.image,blueShip.x,blueShip.y);
        
            
            console.log("ship ready");
        };    
    };

//gameClock
// main is main game clock
    var main = function () {
        var now = Date.now();
        var delta = now - then;
    
        update(delta / 1000);
        drawGame();
    
        then = now;
        console.log("tick tock")
        
        requestAnimationFrame(main);
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
    main(); 
};
      
            
      