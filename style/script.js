

var canvas;
var context;
var bgImage;
var bgRange;
var bgReady;
var bgCloud;
var redShipReady;
var boxReady;
var gameOverRed;
var gameOverBlue;
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
    var SpaceShip = function(x,y,speed,src,gameMove){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.src = src;
        this.gameMove = gameMove;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = function(){
            redShipReady = true;
            console.log ("red ready");
        };

    }; 
    
    var redDeath = 0;
    var blueDeath = 0;
    
    var redShip = new SpaceShip(100,170,250,"sprites/spacey_1_one.png",0);
    var blueShip = new SpaceShip(100,390,250,"sprites/spacey_2_one.png",0);
    var boxShip = new SpaceShip(1270,350,100,"sprites/spacey_box_1.png",10);
    var bgCloud = new SpaceShip(900,250,0,"sprites/cloud_9.png",10);
    var bgCloudNine = new SpaceShip(800,175,0,"sprites/cloud_9.png",10);
    var twoWin = new SpaceShip(410,175,0,"sprites/playa_two_victory.png",10);
    var oneWin = new SpaceShip(410,175,0,"sprites/playa_one_victory.png",10);
    var reset = function () {
        this.x = 1270;
        this.y = 25 + (Math.random() * (canvas.height - 70));
    };

    var boxArray = [];
    for(i=0;i<7;i++){
        var box = new SpaceShip(1270+i*100,25 + (Math.random() * (canvas.height - 70)),100,"sprites/spacey_box_1.png",10);
        box.reset = reset;
        boxArray.push(box);
    };
    
    console.log("elements ready");
       
    
    keysDown = {}
        
        document.addEventListener("keydown",function(e){
            keysDown[e.keyCode] = true
            
        }, false);
        
        document.addEventListener("keyup",function(e){
            delete keysDown[e.keyCode];
                
        }, false);
        
        console.log("listeners ready");
    

    var update = function (modifier){
       
        for(i=0;i<boxArray.length;i++){
            if (boxArray[i].gameMove === 10) {
                boxArray[i].x -= 6; 
                
            }
            if(boxArray[i].x <-100){
                boxArray[i].reset();
            
            }
        }
        if (bgCloud.gameMove === 10){
            bgCloud.x -= 1;
        }
        if (bgCloud.x < -2000){
            bgCloud.x = 1100;
        }
        if (bgCloudNine.gameMove === 10){
            bgCloudNine.x -= 2;
        }
        if (bgCloudNine.x < -1875){
            bgCloudNine.x = 850;
        }
        if (oneWin.gameMove === 10){
            oneWin.x -=2;
        }
        if (twoWin.gameMove === 10){
            oneWin.x +=2;
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
        if (redShip.y < 0){
            redShip.y = 0;
        }
        if (redShip.y > 525){
            redShip.y = 525;
        }
        if (blueShip.y < 0){
            blueShip.y = 0;
        }
        if (blueShip.y > 525){
            blueShip.y = 525;
        }
        //hit
        for(i=0;i<boxArray.length;i++){
            if (redShip.x <= (boxArray[i].x + 35)
                && boxArray[i].x <= (redShip.x + 35)
                && redShip.y <= (boxArray[i].y + 35)
                && boxArray[i].y <= (redShip.y + 35)
                ) {console.log("Hit! * 7 red");
                    ++redDeath;
                    boxArray[i].reset();  
            }
            if (blueShip.x <= (boxArray[i].x + 35)
                && boxArray[i].x <= (blueShip.x + 35)
                && blueShip.y <= (boxArray[i].y + 35)
                && boxArray[i].y <= (blueShip.y + 35)
                ){console.log("Hit! * 7 blue");
                    
                    ++blueDeath
                    
                    boxArray[i].reset();
            }
        }
        if (blueDeath > 0){
            //context.drawImage()
            gameOverBlue = true;

        } else if (redDeath > 0){
            //context.drawImage
            gameOverRed = true;
        }
    };
    
    var drawGame = function(){
        //if if checklist
        if (bgReady){
            context.drawImage(bgImage,0,0);
            //console.log("elements on canvas");
        } 
        if (redShipReady){
            context.drawImage(bgCloud.image,bgCloud.x,bgCloud.y);
            context.drawImage(bgCloudNine.image,bgCloudNine.x,bgCloudNine.y);
            
            for(i=0;i<boxArray.length;i++){
                context.drawImage(boxArray[i].image,boxArray[i].x,boxArray[i].y);
            };
            
            context.drawImage(redShip.image,redShip.x,redShip.y);
            context.drawImage(blueShip.image,blueShip.x,blueShip.y);
        }
        if (gameOverRed){
            context.drawImage(twoWin.image,twoWin.x,twoWin.y);
        }
        else if (gameOverBlue){
            context.drawImage(oneWin.image,oneWin.x,oneWin.y);
        }   
    };
   
    
    var tickTock = function () {
        var now = Date.now();
        var delta = now - then;
    
        update(delta / 1000);
        drawGame();
        then = now;
        requestAnimationFrame(tickTock);
    };
   
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

     
            
      