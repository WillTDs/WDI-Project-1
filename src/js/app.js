$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////

  const $level      = $('#level');
  const $gameOver   = $('#gameOver');
  const $score      = $('#score');
  const $hScore     = $('#hScore');
  const $startBtn   = $('.startBtn');
  const $p          = $('p');
  const $mainMenu   = $('.mainMenu');
  const $mouseBox   = $('.mouseBox');
  const $gameWindow = $('.gameWindow');
  const $blocks     = $('.blocks');
  const levels = {
    '1': [5000, 3000],
    '2': [5000, 4000, 3000],
    '3': [5000, 3500, 2000, 1500]
  };

  let lives            = 3;
  let score            = 0;
  let hScore           = 0;

  //// BLOCK CREATOR //////////////////////////////////////

  function generateBlocks(numberToGenerate) {
    const blockAmount = levels[`${numberToGenerate}`]; // pulling the correct level array from levels object
    let blockArrLength = blockAmount.length; // finding length of array (number of blocks to generate)

    $blocks.empty();
    while (blockArrLength--){
      const html = `
      <li>
        <div class="block"></div>
      </li>
      `;
      const $block = $(html);
      $blocks.append($block);
    }

    // animate blocks
    blockAmount.forEach(blockLoop);
  }

  //// BLOCK ANIMATION //////////////////////////////////// WORKING

  function blockLoop(duration, blockIndex) {
    $blocks.find(`li:nth-child(${blockIndex+1}) .block`).animate({'top': '87%'}, {
      duration,
      complete: function() {

        $blocks.find(`li:nth-child(${blockIndex+1}) .block`).animate({top: '0%'}, {
          duration,
          complete: function() {
            blockLoop(duration, blockIndex);
          }});
      }});
  }

  //// REDLINE FUNCTION & MOUSE COORDS/////////////////// HALF WORKING

  function line(y) {
    const $redLine = $('<div class="redline" />');
    $gameWindow.append($redLine);
    $redLine.css({ backgroundColor: 'red', width: '700px', height: '3px', top: `${y}px`, position: 'absolute' });
    checkCollision();
  }

  function printMousePos(event) {
    const y = event.offsetY;
    console.log(event);
    line(y);
  }

  $mouseBox.on('click', printMousePos);

  //// COLLISION DETECTION ///////////////////////////////// WORKING

  function checkCollision() {

    const $redline   = $('.redline');
    const $blocks    = $('.block');
    const redLinePos = $redline.offset();

    $blocks.each((i, block) => {
      const blockPos = $(block).offset();
      blockPos.bottom = $(block).height() + blockPos.top;
      redLinePos.bottom = $redline.height() + redLinePos.top;
      if(blockPos.top <= redLinePos.bottom && redLinePos.top <= blockPos.bottom){
        $(block).addClass('collided');
      }

      const hitAmount  = $(block).filter('.collided').length;
      const missAmount = $(block).not('.collided').length;

      console.log(hitAmount);
      console.log(missAmount);

      if ($(block).hasClass('collided')){
        applyScore();
        applyTopScore();
        $(block).remove();
      } else {
        removeHeart();
        lifeCheck();
      }

    });

  }

  //// AUDIO /////////////////////// GULP NOT ACCEPTING AUDIO FOLDER

  // function audio3() {
  //   const audioTriple = new Audio('audio/3punch.wav');
  //   const audioWow = new Audio('audio/wow.wav');
  //   audioTriple.play();
  //   audioWow.play();
  // }
  //
  // function audio2() {
  //   const audioPunch = new Audio('/audio/punch.wav');
  //   audioPunch.play();
  //   audioPunch.play();
  // }
  //
  // function audio1() {
  //   const audioPunch = new Audio('/audio/punch.wav');
  //   audioPunch.play();
  // }

  //// HEART DESTROYER /////////////////////////////// HALF WORKING

  function lifeCheck() {
    if(lives === 0){
      $gameOver.hide().text('Game Over').fadeIn(1000);
      $('.block').fadeOut(1000);
    }
  }

  function removeHeart() {
    $('#heart1').attr('src', '/images/heartempty.png');
    lives -= 1;
    lifeCheck();
  }

  //// SCORING //////////////////////////////////////// HALF WORKING

  function applyScore() {
    score += 50;
    $score.text('Score: ' + score);
  }

  function applyTopScore() {
    if(score > hScore) {
      hScore = score;
      $hScore.text('High Score: ' + hScore);
    }
  }

  function resetScore() {
    score = 0;
    $score.text(score);
  }

  /// Level Loader /////////////////////////////////////// BROKEN

  function mainMenu(){
    resetScore();
    $startBtn.click(levelOne);
  }

  function levelOne(){
    $mainMenu.hide();
    $level.html('Level 1');
    $startBtn.hide();
    $p.hide();

    generateBlocks(1);
  }

  // function levelTwo(){
  //  $level.html('Level 2');
  // }
  //
  // function levelThree(){
  //  $level.html('Level 3');
  // }

  // function mainMenu(){
  //   resetScore();
  //   $startBtn.click(function() {
  //     levelOne();
  //   });
  // }

  mainMenu();
  // levelOne();
  applyTopScore();
  // $startBtn.hide();
  // $p.hide();

  ///////////////

});
