

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
var redVictory;
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
	   bgReady = true;
        console.log("background loaded")
    };
    bgImage.src = "sprites/canvas_1.png";
    

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
    
    var redDeath=0;
    var boxKill=0;

    var redShip = new SpaceShip(100,170,300,"sprites/spacey_1_one.png",0);
    var smokePlume = new SpaceShip(49,redShip.y,0,"sprites/smoke_plume_2.png",10);
    var smokePlumeOne = new SpaceShip(37,redShip.y,0,"sprites/smoke_plume_2.png",10);
    var bgCloud = new SpaceShip(900,250,0,"sprites/cloud_9.png",10);
    var bgCloudNine = new SpaceShip(900,175,0,"sprites/cloud_9.png",10);
    var redShot = new SpaceShip(100,redShip.y,250,"sprites/shot_red.png",10)
    var boxSmash = new SpaceShip(redShot.x,redShot.y,100,"sprites/spacey_box_1_destroy_3.png",10);
    var oneWin = new SpaceShip(1200,175,0,"sprites/playa_one_victory.png",10);

    var reset = function () {
        this.x = 1270;
        this.y = 25 + (Math.random() * (canvas.height - 70));
    

    }; 


    var boxArray = [];
    for(i=0;i<11;i++){
        var box = new SpaceShip(1270+i*100,25 + (Math.random() * (canvas.height - 70)),100,"sprites/spacey_box_1.png",10);
        box.reset = reset;
        boxArray.push(box);
    };
   
    keysDown = {}
        
        document.addEventListener("keydown",function(e){
            keysDown[e.keyCode] = true
            
        }, false);
        
        document.addEventListener("keyup",function(e){ 
            delete keysDown[e.keyCode];
                
        }, false);


    var update = function (modifier){
       
        for(i=0;i<boxArray.length;i++){
            if (boxArray[i].gameMove === 10) {
                boxArray[i].x -= 6; 
                
            }
            if(boxArray[i].x <- 70) {
                boxArray[i].reset();
            
            }
        }
        if (bgCloud.gameMove === 10){
            bgCloud.x -= 1;
            bgCloudNine.x -= 2;
            smokePlume.x -= 12;
            smokePlumeOne.x -= 18;
        }
        if (bgCloud.x < -2000){
            bgCloud.x = 1100;
        }
        if (bgCloudNine.x < -1875){
            bgCloudNine.x = 850;
        }
        if (smokePlume.x <= 2) {
            smokePlume.x = 84;
            smokePlumeOne.y - 6;
            smokePlume.y + 6;
        }
        if (smokePlumeOne.x <= 2) {
            smokePlumeOne.x = 84;
            smokePlumeOne.y - 6;
            smokePlume.y + 6;
        }
        if (oneWin.gameMove === 10){
            oneWin.x -= 2;
        }
        if (38 in keysDown) { 
            redShip.y -= redShip.speed * modifier;
        }
        if (40 in keysDown) { 
            redShip.y += redShip.speed * modifier;
        }
        if (37 in keysDown) {
            drawRed = true;             
        }
        if (redShot.x > 1200) {
            redShot.x = 100
            redShot.y = redShip.y
            drawRed = false;
            shotMove = false;
        }
        if (shotMove) {
            redShot.x += 14;
        }
        if (redShip.y < 0){
            redShip.y = 0;
        }
        if (redShip.y > 525){
            redShip.y = 525;
        }
        for(i=0;i<boxArray.length;i++){
            if (redShip.x <= (boxArray[i].x + 40)
                && boxArray[i].x <= (redShip.x + 35)
                && redShip.y <= (boxArray[i].y + 35)
                && boxArray[i].y <= (redShip.y + 35)
                ) {console.log("Hit! * 7 red");
                    ++redDeath;
                    boxArray[i].reset();  
            }
      
        }
        for(i=0;i<boxArray.length;i++){
            if (redShot.x  <= (boxArray[i].x + 40)
                && boxArray[i].x <= (redShot.x + 35)
                && redShot.y <= (boxArray[i].y + 35)
                && boxArray[i].y <= (redShot.y + 35)
                ) {console.log("BoxSmash");
                   ++boxKill;
                   boxArray[i].reset();  
            }
      
        }
        if (boxKill > 21){
            redVictory = true;
        }
        if (redDeath > 3){
            gameOverRed = true;
        }
        if  (redDeath > 4){
            window.location.reload();
            //bgImage.src = "sprites/canvas_2.png";
            
        }
    };
    

    var drawGame = function(){
        
        if (bgReady){
            context.drawImage(bgImage,0,0);
     
        } 
        if(redVictory){
            context.drawImage(oneWin.image,oneWin.x,oneWin.y);
        }
        if (drawRed){
            context.drawImage(redShot.image,redShot.x,redShip.y);
            this.y = redShip.y;
            redShot.y = this.y;
            shotMove = true;
        }
        if (redShipReady){
            context.drawImage(bgCloud.image,bgCloud.x,bgCloud.y);
            context.drawImage(bgCloudNine.image,bgCloudNine.x,bgCloudNine.y);
            
            for(i=0;i<boxArray.length;i++){
                context.drawImage(boxArray[i].image,boxArray[i].x,boxArray[i].y);
                
            };
            context.drawImage(smokePlume.image,smokePlume.x,redShip.y+26)
            context.drawImage(smokePlumeOne.image,smokePlumeOne.x,redShip.y+24)
            context.drawImage(smokePlumeOne.image,smokePlumeOne.x +10,redShip.y+25)
            
            context.drawImage(redShip.image,redShip.x,redShip.y);
        }
        
    };
    var tickTock = function () {
        var now = Date.now();
        var delta = now - then;
    
        update(delta / 1200);
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

     
