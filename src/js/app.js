$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////

  const $level      = $('#level');
  const $gameOver   = $('#gameOver');
  const $score      = $('#score');
  const $hScore     = $('#hScore');
  const $redLine    = $('.redLine');
  const $startBtn   = $('.startBtn');
  const $nextLevel  = $('.nextLevel');
  const $restartBtn = $('.restart');
  const $hearts     = $('.heart');
  const $mainMenu   = $('.mainMenu');
  const $mouseBox   = $('.mouseBox');
  const $gameWindow = $('.gameWindow');
  const $blocks     = $('.blocks');
  const audio       = $('#mainTrack')[0];

  const levels      = {
    '1': [4000, 3000],
    '2': [4000, 2000, 5000],
    '3': [5000, 4000, 2000, 1000],
    '4': [5000, 3000, 1500, 3000, 5000],
    '5': [1200, 3300, 5100, 3000, 2600, 800],
    '6': [800, 2100, 1300, 2700, 700, 1850, 900]
  };

  let lives        = 3;
  let score        = 0;
  let hScore       = 0;
  let currentLevel = 1;
  let $newLine     = null;

  //// INITILISATION //////////////////////////////////

  function gameInit() {
    mainMenu();
    applyTopScore();
  }

  //// BLOCK CREATOR //////////////////////////////////

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

  //// BLOCK ANIMATION ////////////////////////////////

  function blockLoop(duration, blockIndex) {
    $blocks.find(`li:nth-child(${blockIndex+1}) .block`).animate({'top': '87%'}, {
      duration,
      specialEasing: {
        top: 'linear'
      },
      complete: function() {

        $blocks.find(`li:nth-child(${blockIndex+1}) .block`).animate({top: '0%'}, {
          duration,
          specialEasing: {
            top: 'linear'
          },
          complete: function() {
            blockLoop(duration, blockIndex);
          }});
      }});
  }

  //// REDLINE FUNCTION & MOUSE COORDS/////////////////

  function line(y) {
    console.log('adding new red line at level:', currentLevel);
    const $redLine = $('<div class="redline" />');
    $newLine = $redLine;
    $gameWindow.append($redLine);
    $redLine.css({ backgroundColor: 'red', width: '100%', height: '1.2%', top: `${y}px`, position: 'absolute' });
    audioLaser();
    checkCollision();
  }

  function printMousePos(event) {
    const y = event.offsetY;
    line(y);
    console.log(event);
  }

  $mouseBox.on('click', printMousePos);

  //// COLLISION DETECTION ////////////////////////////

  function checkCollision() {

    const $redline   = $newLine;
    const $blocks    = $('.block');
    const redLinePos = $redline.offset();

    $blocks.each((i, block) => {
      console.log('block check!');
      const blockPos    = $(block).offset();
      blockPos.bottom   = $(block).height() + blockPos.top;
      redLinePos.bottom = $redline.height() + redLinePos.top;

      if(redLinePos.bottom <= blockPos.bottom === false) console.log('top:', blockPos.top <= redLinePos.top, 'bottom: ', redLinePos.bottom <= blockPos.bottom, 'dif', Math.round(Math.abs(redLinePos.bottom - blockPos.bottom)));

      if(blockPos.top <= redLinePos.top && redLinePos.bottom <= blockPos.bottom) {
        console.log('collided!');
        $(block).addClass('collided');
      }

      if($(block).hasClass('collided')){
        $(block).remove();
        score += 50;
        $score.text('Score: ' + score);
        applyTopScore();
        audioBeep();
      } else {
        lives--;
      }
    });

    if($('.block').length === 0){
      audioCheer();
      currentLevel++;
      $nextLevel.show();
    }

    $hearts.slice(0, 3 - lives).attr('src', '/public/images/heartempty.png');
    if(lives <= 0){
      audioFail();
      $('.block').fadeOut({ duration: 1000, queue: false });
      $gameOver.text('Game Over').hide().fadeIn(1000);
      $redline.fadeOut(1000);
    }

  }

  //// SCORING ////////////////////////////////////////

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

  //// AUDIO //////////////////////////////////////////

  function audioYeh() {
    const audioYeahSound = new Audio('/public/audio/ohyeah.wav');
    audioYeahSound.play();
  }

  function audioBeep() {
    const audioBeepSound = new Audio('/public/audio/beep.mp3');
    audioBeepSound.play();
  }

  function audioLaser() {
    const audioLaserSound = new Audio('/public/audio/laserbeam.wav');
    audioLaserSound.play();
  }

  function audioFail() {
    const audioFailSound = new Audio('/public/audio/fail.mp3');
    audioFailSound.play();
  }

  function audioCheer() {
    const audioCheerSound = new Audio('/public/audio/cheer.wav');
    audioCheerSound.play();
  }

  $('select').on('change', (e)=> {
    audio.src = $(e.target).val();
    audio.play();
  });

  $('#mute').on('click', ()=> {
    audio.pause();
  });

  /// RESTART BUTTON /////////////////////////////////////

  $restartBtn.click(() => {
    resetScore();
    $nextLevel.hide();
    $gameOver.hide();
    $redLine.hide();
    $mainMenu.show();
    $hearts.attr('src', '/public/images/heartfull.png');
    lives = 3;
    currentLevel = 1;
    mainMenu();
  });

  /// LEVEL LOADER ///////////////////////////////////////

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

  function newLevel(){
    levelChange();
    $nextLevel.hide();
  }

  $nextLevel.find('button').on('click', newLevel);

  ///////////////////////////////////////////////////////

  gameInit();
});
