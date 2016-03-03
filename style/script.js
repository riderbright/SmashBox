var canvas;
var context;
var bgImage;
var bgRange;
var bgReady;
var bgCloud;
var redShipReady;
var drawRed;
var shotMove;
var drawSmash;
var smashBox;
var boxReady;
var gameOverRed;
var redVictory;
var afterBurn;
var keysDown;


window.onload = function () {
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1200;
    canvas.height = 600;
    console.log(context);

    document.body.appendChild(canvas);

    bgImage = new Image();
    bgImage.onload = function () {
        bgReady = true;

    };
    bgImage.src = "sprites/canvas_4.png";


    var SpaceShip = function (x, y, speed, src, gameMove) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.src = src;
        //this.src = valueAtIndexOf(i)
        this.gameMove = gameMove;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = function () {
            redShipReady = true;
            console.log("red ready");
        };

    };

    var animateShip = function (x, y, speed, src, gameMove) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.src = src;
        //this.src = [i]
        this.gameMove = gameMove;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = function () {
            redShipReady = true;
            console.log("red ready");
        };

    };
    var redDeath = 0;
    var boxKill = 0;
    //var sprites = ["",""]
    var redShip = new SpaceShip(100, 170, 400, "sprites/spacey_2_one.png", 0);
    var blueShip = new SpaceShip(100, 300, 400, "sprites/spacey_1_one.png", 0);
    //var rangeOne = new SpaceShip(0,532,0,"sprites/spacey_range_8.png",10);
    //var rangeTwo = new SpaceShip(1200,532,0,"sprites/spacey_range_8.png",10);
    var smokePlume = new SpaceShip(49, redShip.y, 0, "sprites/smoke_plume_1.png", 10);
    var smokePlumeOne = new SpaceShip(37, redShip.y, 0, "sprites/smoke_plume_1.png", 10);
    var burner = new SpaceShip(52, redShip.y, 0, "sprites/shot_red_1.png", 10);
    var bgCloud = new SpaceShip(920, 250, 0, "sprites/cloud_9.png", 10);
    var bgCloudNine = new SpaceShip(920, 175, 0, "sprites/cloud_9.png", 10);
    var redShot = new SpaceShip(150, 0, 250, "sprites/red_shot_9.png", 10)
    var burnerTwo = new SpaceShip(150, 0, 250, "sprites/shot_red_1.png", 10);
    var boxSmash = new SpaceShip(0, 0, 100, "sprites/boxsmash.png", 10);
    var boxSmashTwo = new SpaceShip(0, 0, 100, "sprites/spacey_box_1_destroy_4.png", 10);
    var oneWin = new SpaceShip(400, 175, 0, "sprites/playa_one_victory.png", 10);

    var reset = function () {
        this.x = 1270;
        this.y = 25 + (Math.random() * (canvas.height - 75));


    };


    //var gold = ["sprites/spacey_block_gold_shine_1.png", "sprites/spacey_block_gold_shine_2.png", "sprites/spacey_block_gold_shine_3.png", "sprites/space_block_gold_shine_4.png"]

    var boxArray = [];
    for (i = 0; i < 12; i++) {
        var box = new SpaceShip(1270 + i * 100, 50 + (Math.random() * (canvas.height - 70)), 100, "sprites/spacey_box_1.png", 10);
        var rock = new SpaceShip(1270 + i * 100, 50 + (Math.random() * (canvas.height - 70)), 100, "sprites/spacey_block_2_b.png", 10);
        box.reset = reset;
        rock.reset = reset;
        boxArray.push(box);
        //if(i %2){
        //    boxArray.push(box);
        //}else{
        //    boxArray.push(rock);
        //}

    };
    var rockArray = [];
    for (i = 0; i < 9; i++) {
        var rock = new SpaceShip(1270 + i * 100, 50 + (Math.random() * (canvas.height - 70)), 100, "sprites/spacey_block_2_b.png", 10);
        rock.reset = reset;
        rockArray.push(rock);
    };
    var stoneArray = [];
    for (i = 0; i < 8; i++) {
        var stone = new SpaceShip(1270 + i * 100, 50 + (Math.random() * (canvas.height - 70)), 100, "sprites/spacey_block_4_b.png", 10);
        stone.reset = reset;
        stoneArray.push(stone);
    };
    keysDown = {}

    document.addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true

    }, false);

    document.addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];

    }, false);


    var update = function (modifier) {

        for (i = 0; i < boxArray.length; i++) {
            if (boxArray[i].gameMove === 10) {
                boxArray[i].x -= 7;

            }
            if (boxArray[i].x < canvas.width - 1270) {
                boxArray[i].reset();

            }

        }
        for (i = 0; i < rockArray.length; i++) {
            if (rockArray[i].gameMove === 10) {
                rockArray[i].x -= 6;

            }
            if (rockArray[i].x < -70) {
                rockArray[i].reset();

            }

        }
        for (i = 0; i < stoneArray.length; i++) {
            if (stoneArray[i].gameMove === 10) {
                stoneArray[i].x -= 5;

            }
            if (stoneArray[i].x < canvas.width - 1270) {
                stoneArray[i].reset();

            }

        }

        if (bgCloud.gameMove === 10) {
            bgCloud.x -= 1.8;
            bgCloudNine.x -= 2.4;
            //rangeOne.x -=1.2;
            //rangeTwo.x-=1.2;
            smokePlume.x -= 12;
            smokePlumeOne.x -= 18;
            afterBurn = true
            boxSmash.y -= 0.3;
        }
        if (bgCloud.x < -2000) {
            bgCloud.x = 1100;
        }
        if (bgCloudNine.x < -1875) {
            bgCloudNine.x = 920;
        }
        //if (rangeOne.x <= -1200){
        //    rangeOne.x = 1200;
        //}
        //if (rangeTwo.x <= -1200){
        //    rangeTwo.x = 1200;     
        //}
        if (smokePlume.x <= 2) {
            smokePlume.x = 84;
            smokePlumeOne.y - 6;
            smokePlume.y + 6;
            afterBurn = true;
        }
        if (smokePlumeOne.x <= 2) {
            smokePlumeOne.x = 84;
            smokePlumeOne.y - 6;
            smokePlume.y + 6;
            afterBurn = false;
        }
        if (oneWin.gameMove === 10) {
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
            redShot.y = redShip.y
        }
        if (redShot.x > 1200) {
            redShot.x = 100
                //redShot.y = redShip.y  "for control of the shot"
            drawRed = false;
            shotMove = false;
        }
        if (shotMove) {
            redShot.x += 21;
        }
        if (redShip.y < 0) {
            redShip.y = 0;
        }
        if (redShip.y > 525) {
            redShip.y = 525;
        }
        for (i = 0; i < boxArray.length; i++) {
            if (redShip.x <= (boxArray[i].x + 40) && boxArray[i].x <= (redShip.x + 35) && redShip.y <= (boxArray[i].y + 35) && boxArray[i].y <= (redShip.y + 55)) {
                ++redDeath;
                boxArray[i].reset();
            }

        }
        for (i = 0; i < rockArray.length; i++) {
            if (redShip.x <= (rockArray[i].x + 40) && rockArray[i].x <= (redShip.x + 35) && redShip.y <= (rockArray[i].y + 35) && rockArray[i].y <= (redShip.y + 55)) {
                ++redDeath;
                rockArray[i].reset();
            }

        }
        if (drawRed) {
            for (i = 0; i < boxArray.length; i++) {
                if (redShot.x <= (boxArray[i].x + 40) && boxArray[i].x <= (redShot.x + 35) && redShot.y <= (boxArray[i].y + 35) && boxArray[i].y <= (redShot.y + 35)) {
                    console.log("BoxSmash");
                    ++boxKill;
                    boxSmash.x = redShot.x;
                    boxSmash.y = redShot.y;
                    drawSmash = true;
                    boxArray[i].reset();
                }

            }
        }
        if (boxSmash.y < redShot.y - 3.14) {
            drawSmash = false;
            drawSmashOne = true;
        }
        if (boxSmash.y > redShot.y + 3.14) {
            drawSmash = false;
            drawSmashOne = true;

        }
        if (boxKill > 21) {
            redVictory = true;

        }
        //if (redDeath >= 21){
        //    bgImage.src = "sprites/canvas_3.png";
        //    gameOverRed = true;
        //}

    };


    var drawGame = function () {

        if (bgReady) {
            context.drawImage(bgImage, 0, 0);

        }
        if (redVictory) {
            context.drawImage(oneWin.image, oneWin.x, oneWin.y);
        }
        //if (drawRed){
        //    context.drawImage(redShot.image,redShot.x,redShot.y);
        //    shotMove = true;
        //}
        if (afterBurn) {
            context.drawImage(burner.image, burner.x + 24, redShip.y - 2)
        }
        if (afterBurn && shotMove) {
            context.drawImage(burnerTwo.image, redShot.x, redShot.y)
        }
        if (redShipReady) {
            //context.drawImage(rangeOne.image,rangeOne.x,rangeOne.y);
            //context.drawImage(rangeTwo.image,rangeTwo.x,rangeTwo.y);
            context.drawImage(bgCloud.image, bgCloud.x, bgCloud.y);
            context.drawImage(bgCloudNine.image, bgCloudNine.x, bgCloudNine.y);
            for (i = 0; i < stoneArray.length; i++) {
                context.drawImage(stoneArray[i].image, stoneArray[i].x, stoneArray[i].y);
            };
            for (i = 0; i < rockArray.length; i++) {
                context.drawImage(rockArray[i].image, rockArray[i].x, rockArray[i].y);
            };
            for (i = 0; i < boxArray.length; i++) {
                context.drawImage(boxArray[i].image, boxArray[i].x, boxArray[i].y);

            };
            if (drawRed) {
                context.drawImage(redShot.image, redShot.x, redShot.y);
                shotMove = true;
            }
            context.drawImage(smokePlume.image, smokePlume.x, redShip.y + 26)
            context.drawImage(smokePlumeOne.image, smokePlumeOne.x, redShip.y + 24)
            context.drawImage(smokePlumeOne.image, smokePlumeOne.x + 10, redShip.y + 25)
            context.drawImage(redShip.image, redShip.x, redShip.y);
        }
        if (drawSmash) {
            context.drawImage(boxSmash.image, boxSmash.x, boxSmash.y);
            boxSmash.x += 2;
            smashBox = true;
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