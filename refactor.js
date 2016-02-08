var update = function (modifier){
    moveBoxes();
    moveClouds();
    respondToKeyPress(modifier);
    setWinMessage();
    keepShipsOnScreen();
    trackHits();
    killOnHit();
};

function moveBoxes(){
  for(i=0;i<boxArray.length;i++){
      if (boxArray[i].gameMove === 10) {
          boxArray[i].x -= 6;

      };
      if(boxArray[i].x <-100){
          boxArray[i].reset();

      };
  };
};

function moveClouds() {
  if (bgCloud.gameMove === 10){
      bgCloud.x -= 1;
  };
  if (bgCloud.x < -2000){
      bgCloud.x = 1100;
  };
  if (bgCloudNine.gameMove === 10){
      bgCloudNine.x -= 2;
  };
  if (bgCloudNine.x < -1875){
      bgCloudNine.x = 850;
  };
};

function respondToKeyPress(modifier){
  if (38 in keysDown) {
      redShip.y -= redShip.speed * modifier;
  };
  if (40 in keysDown) {
      redShip.y += redShip.speed * modifier;
  };
  if (87 in keysDown) {
      blueShip.y -= blueShip.speed * modifier;
  };
  if (83 in keysDown) {
      blueShip.y += blueShip.speed * modifier;
  };
};

function setWinMessage(){
  if (oneWin.gameMove === 10){
      oneWin.x -=2;
  };
  if (twoWin.gameMove === 10){
      oneWin.x +=2;
  };
};

function keepShipsOnScreen(){
  if (redShip.y < 0){
      redShip.y = 0;
  };
  if (redShip.y > 525){
      redShip.y = 525;
  };
  if (blueShip.y < 0){
      blueShip.y = 0;
  };
  if (blueShip.y > 525){
      blueShip.y = 525;
  };
};

function trackHits(){
  for(i=0;i<boxArray.length;i++){
      if (redShip.x <= (boxArray[i].x + 35)
          && boxArray[i].x <= (redShip.x + 35)
          && redShip.y <= (boxArray[i].y + 35)
          && boxArray[i].y <= (redShip.y + 35)
          ) {console.log("Hit! * 7 red");
              ++redDeath;
              boxArray[i].reset();
      };
      if (blueShip.x <= (boxArray[i].x + 35)
          && boxArray[i].x <= (blueShip.x + 35)
          && blueShip.y <= (boxArray[i].y + 35)
          && boxArray[i].y <= (blueShip.y + 35)
          ){console.log("Hit! * 7 blue");

              ++blueDeath

              boxArray[i].reset();
      };
  };
};

function killOnHit(){
  if (blueDeath > 0){
      //context.drawImage()
      gameOverBlue = true;

  } else if (redDeath > 0){
      //context.drawImage
      gameOverRed = true;
  };
};
