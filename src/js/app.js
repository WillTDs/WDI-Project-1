$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////

  const $level      = $('#level');
  const $gameOver   = $('#gameOver');
  const $score      = $('#score');
  const $hScore     = $('#hScore');
  const $startBtn   = $('.startBtn');
  const $nextLevel  = $('.nextLevel');
  const $restartBtn = $('restart');
  const $hearts     = $('.heart');
  const $mainMenu   = $('.mainMenu');
  const $mouseBox   = $('.mouseBox');
  const $gameWindow = $('.gameWindow');
  const $blocks     = $('.blocks');

  const levels      = {
    '1': [3000, 2000],
    '2': [4000, 2000, 5000],
    '3': [5000, 4000, 2000, 1000],
    '4': [5000, 3000, 1500, 3000, 5000],
    '5': [1200, 3300, 5100, 3000, 2600, 800]
  };

  let lives        = 3;
  let score        = 0;
  let hScore       = 0;
  let currentLevel = 1;

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
    console.log('adding new red line at level:', currentLevel);
    const $redLine = $('<div class="redline" />');
    $gameWindow.append($redLine);
    $redLine.css({ backgroundColor: 'red', width: '700px', height: '6px', top: `${y}px`, position: 'absolute' });
    audioLaser();
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
      console.log('block check!');
      const blockPos    = $(block).offset();
      blockPos.bottom   = $(block).height() + blockPos.top;
      redLinePos.bottom = $redline.height() + redLinePos.top;

      if(blockPos.top <= redLinePos.top && redLinePos.bottom <= blockPos.bottom){
        console.log('collided!');
        $(block).addClass('collided');
      }

      if($(block).hasClass('collided')){
        score += 50;
        $score.text('Score: ' + score);
        applyTopScore();
        $(block).remove();
      } else {
        lives--;
      }
    });

    if($('.block').length === 0){
      currentLevel++;
      $nextLevel.show();
    }

    $hearts.slice(0, 3 - lives).attr('src', '/images/heartempty.png');
    if(lives === 0){
      $gameOver.hide().text('Game Over').fadeIn(1000);
      $('.block').fadeOut(1000);
    }

  }

  function newLevel(){
    audioWow();
    levelChange();
    $nextLevel.hide();
  }

  $nextLevel.find('button').on('click', newLevel);

  //// SCORING //////////////////////////////////////// WORKING

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

  function audioYeh() {
    const audioYeahSound = new Audio('/audio/ohyeah.wav');
    audioYeahSound.play();
  }

  function audioWow() {
    const audioWowSound = new Audio('/audio/wow.wav');
    audioWowSound.play();
  }

  function audioLaser() {
    const audioLaserSound = new Audio('/audio/laserbeam.wav');
    audioLaserSound.play();
  }

  const audio = $('#mainTrack')[0];

  $('select').on('change', (e)=> {
    audio.src = $(e.target).val();
    audio.play();
  });

  $('#mute').on('click', ()=> {
    audio.pause();
  });

  /// RESTART BUTTON ///////////////////////////////////// BROKEN

  $restartBtn.click(function() {
    resetScore();
    mainMenu();
  });

  /// LEVEL LOADER /////////////////////////////////////// WORKING

  function mainMenu(){
    resetScore();
    $startBtn.click(() => {
      audioYeh();
      $mainMenu.hide();
      levelChange();
    });
  }

  function levelChange(){
    $level.html(`Level ${currentLevel}`);
    $('.redline').remove();
    generateBlocks(currentLevel);
    // audio4();
  }

  /////////////////////////////////////////////////////////

  gameInit();

});
