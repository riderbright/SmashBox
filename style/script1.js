

var canvas;
var context;
var bgImage;
var bgRange;
var bgReady;
var bgCloud;
var redShipReady;
var drawRed;
var shotMove
var boxReady;
var gameOverRed;
var keysDown;


window.onload = function(){
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
    //need extra input for shot function
var DeepField = function(x,y,speed,src,gameMove){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.src = src;
    this.gameMove = gameMove;
    this.image = new Image();
    this.image.src = src;
    this.image.onload = function(){
        worldsReady = true;
        console.log ("red ready");
    };
        
}
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
    
var CloudShip = function(x,y,speed,src,gameMove){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.src = src;
    this.gameMove = gameMove;
    this.image = new Image();
    this.image.src = src;
    this.image.onload = function(){
        skyReady = true;
        
    };
}; 
var BoxShip = function(x,y,speed,src,gameMove){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.src = src;
    this.gameMove = gameMove;
    this.image = new Image();
    this.image.src = src;
    this.image.onload = function(){
        shootReady = true;
        
    };

var Blast = function(x,y,speed,src,gameMove){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.src = src;
    this.gameMove = gameMove;
    this.image = new Image();
    this.image.src = src;
    this.image.onload = function(){
        shootReady = true;
        
    };
};
    
    var redDeath = 0;
    var world = new DeepField(0,0,0,"sprites/canvas_1.png",10);
    var redShip = new SpaceShip(100,170,250,"sprites/spacey_1_one.png",0);
    var boxShip = new BoxShip(1270,350,100,"sprites/spacey_box_1.png",10);
    var bgCloud = new CloudShip(900,250,0,"sprites/cloud_9.png",10);
    var bgCloudNine = new CloudShip(800,175,0,"sprites/cloud_9.png",10);
    var oneWin = new SpaceShip(410,175,0,"sprites/playa_one_victory.png",10);
    var redShot = new Blast(redShip.x,redShip.y,200,"sprites/shot_red.png",10)
    
    var resetBoxes = function () {
        this.x = 1270;
        this.y = 25 + (Math.random() * (canvas.height - 72));
    };

    var resetShip = function () {
        this.x = 100;
        this.y = 170;
    };
    
    var resetShot = function(){
        this.x = this.x
        this.y = this.y
    };    

    var boxArray = []; 
    for(i=0;i<7;i++){
        var box = new SpaceShip(1270+i*100,25 + (Math.random() * 
        (canvas.height - 70)),100,"sprites/spacey_box_1.png",10);
        box.resetBoxes = resetBoxes;
        boxArray.push(box);
    };
       
    
    keysDown = {}
        
        document.addEventListener("keydown",function(e){
            keysDown[e.keyCode] = true
        }, false);
        
        document.addEventListener("keyup",function(e){
            delete keysDown[e.keyCode];
        }, false);
        console.log("listeners ready");
    
    var updateBox = function (modifier){
       
        for(i=0;i<boxArray.length;i++){
            if (boxArray[i].gameMove === 10) {
                boxArray[i].x -= 6; 
                
            }
            if(boxArray[i].x <-100){
                boxArray[i].resetBoxes();
            }

        }
    }        

    var updateCanvas = function (modifier){
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
            bgCloudNine.x = 865;
        }
    }
        



        if (38 in keysDown) { 
            redShip.y -= redShip.speed * modifier;
        }
        if (40 in keysDown) { 
            redShip.y += redShip.speed * modifier;
        }
        
        if (32 in keysDown) {
            drawRed = true;             
        }
        if (shotMove) {
            redShot.y = redShot.y;
            redShot.x += 6;
        }
        if (redShip.y < 0){
            redShip.y = 0;
        }
        if (redShip.y > 525){
            redShip.y = 525;
        }
    
        //hit
        for(i=0;i<boxArray.length;i++){
            if (redShip.x <= (boxArray[i].x + 35)
                && boxArray[i].x <= (redShip.x + 35)
                && redShip.y <= (boxArray[i].y + 35)
                && boxArray[i].y <= (redShip.y + 35)
                ) {console.log("Hit! * 7 red");
                    ++redDeath;
                    boxArray[i].resetBoxes();  
            }
      
        }
    
        if (redDeath > 3){
            gameOverRed = true
        }

        if  (redDeath > 4){
           
            window.location.reload();
        }
    };
    

    var drawGame = function(){
        if (worldsReady){
            context.drawImage(world.image,world.x,world.y);
        } 
        
        if (){
            context.drawImage(redShot.image,redShot.x,redShip.y);
            shotMove = true;
       //}while {
       //    redShot.y <= 1235;
        }
        if (redShipReady){
            context.drawImage(bgCloud.image,bgCloud.x,bgCloud.y);
            context.drawImage(bgCloudNine.image,bgCloudNine.x,bgCloudNine.y);
            
            for(i=0;i<boxArray.length;i++){
                context.drawImage(boxArray[i].image,boxArray[i].x,boxArray[i].y);
            };
            
            context.drawImage(redShip.image,redShip.x,redShip.y);
        }
        
        if (gameOverRed){
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
