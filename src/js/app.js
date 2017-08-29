$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////

  const $level      = $('#level');
  const $gameOver   = $('#gameOver');
  const $score      = $('#score');
  const $hScore     = $('#hScore');
  const $startBtn   = $('.startBtn');
  const $restartBtn = $('restart');
  // const $p          = $('p');
  const $mainMenu   = $('.mainMenu');
  const $mouseBox   = $('.mouseBox');
  const $gameWindow = $('.gameWindow');
  const $blocks     = $('.blocks');
  const levels      = {
    '1': [5000, 3000],
    '2': [5000, 4000, 3000],
    '3': [5000, 3500, 2000, 1500],
    '4': [5000, 4000, 3000, 2000, 1000]
  };

  let heart1 = true;
  let heart2 = true;
  let lives   = 3;
  let score   = 0;
  let hScore  = 0;

  //// INITILISATION ///////////////////////////////////// BROKEN

  function gameInit() {
    mainMenu();
    applyTopScore();
  }

  //// BLOCK CREATOR ////////////////////////////////////// WORKING

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

  //// REDLINE FUNCTION & MOUSE COORDS///////////////////// WORKING

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

  //// COLLISION DETECTION ///////////////////////////////// ALMOST WORKING

  function checkCollision() {

    const $redline   = $('.redline');
    const $blocks    = $('.block');
    const redLinePos = $redline.offset();

    $blocks.each((i, block) => {

      const blockPos    = $(block).offset();
      blockPos.bottom   = $(block).height() + blockPos.top;
      redLinePos.bottom = $redline.height() + redLinePos.top;

      if(blockPos.top <= redLinePos.bottom && redLinePos.top <= blockPos.bottom){
        $(block).addClass('collided');
      }

      console.log($(block).filter('.collided').length);
      console.log($(block).not('.collided').length);

      if($(block).hasClass('collided')){
        applyScore();
        applyTopScore();
        $(block).remove();
      } else if(heart1 === true) {
        removeHeart1();
      } else if(heart1 === false) {
        removeHeart2();
      } else if(heart2 === false) {
        removeHeart3();
      }


    });

  }

  //// HEART DESTROYER /////////////////////////////// HALF WORKING

  function lifeCheck() {
    if(lives === 0){
      $gameOver.hide().text('Game Over').fadeIn(1000);
      $('.block').fadeOut(1000);
    }
  }

  function removeHeart1() {
    $('#heart1').attr('src', '/images/heartempty.png');
    console.log('1 has run');
    heart1 = false;
    lives -= 1;
    lifeCheck();
  }
  function removeHeart2() {
    $('#heart2').attr('src', '/images/heartempty.png');
    console.log('2 has run');
    heart2 = false;
    lives -= 1;
    lifeCheck();
  }
  function removeHeart3() {
    $('#heart3').attr('src', '/images/heartempty.png');
    console.log('3 has run');
    lives -= 1;
    lifeCheck();
  }

  //// SCORING //////////////////////////////////////// WORKING

  function applyScore() {
    score += 50;
    $score.text('Score: ' + score);
    if(score === 100) {
      levelTwo();
    } else if(score === 250) {
      levelThree();
    } else if(score === 450) {
      levelFour();
    } else if(score > 550) {
      $gameWindow.html('CONGRATULATIONS');
    }
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

  //// AUDIO /////////////////// GULP NOT ACCEPTING AUDIO FOLDER

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
  // function audio4() {
  //   const audioYeah = new Audio('/audio/ohyeah.wav');
  //   audioYeah.play();
  // }

  /// RESTART BUTTON ///////////////////////////////////// BROKEN

  $restartBtn.click(function() {
    resetScore();
    mainMenu();
  });

  /// LEVEL LOADER /////////////////////////////////////// WORKING

  function mainMenu(){
    resetScore();
    $startBtn.click(levelOne);
    // audio4();
  }

  function levelOne(){
    $mainMenu.hide();
    $level.html('Level 1');
    lives = 3;
    generateBlocks(1);
  }
  function levelTwo(){
    $level.html('Level 2');
    $('.redline').remove();
    $('#heart1').attr('src', '/images/heartfull.png');
    $('#heart2').attr('src', '/images/heartfull.png');
    $('#heart3').attr('src', '/images/heartfull.png');
    lives = 3;
    generateBlocks(2);
  }
  function levelThree(){
    $level.html('Level 3');
    $('.redline').remove();
    $('#heart1').attr('src', '/images/heartfull.png');
    $('#heart2').attr('src', '/images/heartfull.png');
    $('#heart3').attr('src', '/images/heartfull.png');
    lives = 3;
    generateBlocks(3);
  }
  function levelFour(){
    $level.html('Level 4');
    $('.redline').remove();
    $('#heart1').attr('src', '/images/heartfull.png');
    $('#heart2').attr('src', '/images/heartfull.png');
    $('#heart3').attr('src', '/images/heartfull.png');
    lives = 3;
    generateBlocks(4);
  }


  /////////////////////////////////////////////////////////

  gameInit();

});
