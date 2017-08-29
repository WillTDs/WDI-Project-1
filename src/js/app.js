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

  // let numberToGenerate = 1;
  let lives            = 3;
  let score            = 0;
  let hScore           = 0;

  //// BLOCK CREATOR //////////////////////////////////////

  function generateBlocks(numberToGenerate) {
    console.log('in here');
    $blocks.empty();
    while (numberToGenerate--){
      const html = `
        <li>
          <div class="block"></div>
        </li>
      `;
      const $block = $(html);
      $blocks.append($block);
    }
  }

  //// BLOCK ANIMATION //////////////////////////////////// WORKING

  function blockLoopOne() {
    $blocks.find('li:nth-child(1) .block').animate({'top': '87%'}, {
      duration: 6000,
      complete: function() {

        $blocks.find('li:nth-child(1) .block').animate({top: '0%'}, {
          duration: 6000,
          complete: blockLoopOne});
      }});
  }

  function blockLoopTwo() {
    $('#blockTwo').animate({'top': '87%'}, {
      duration: 3000,
      complete: function() {

        $('#blockTwo').animate({top: '0%'}, {
          duration: 3000,
          complete: blockLoopTwo});
      }});
  }

  function blockLoopThree() {
    $('#blockThree').animate({'top': '87%'}, {
      duration: 1500,
      complete: function() {

        $('#blockThree').animate({top: '0%'}, {
          duration: 1500,
          complete: blockLoopThree});
      }});
  }

  //// REDLINE FUNCTION & MOUSE COORDS/////////////////// HALF WORKING

  function line(y) {
    const $redLine = $('<div class="redline" />');
    $('.gameWindow').append($redLine);
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

    const $blockOne   = $('#blockOne');
    const $blockTwo   = $('#blockTwo');
    const $blockThree = $('#blockThree');
    const $allBlocks  = $('.block');
    const $redline    = $('.redline');

    const blockOne = $blockOne.position();
    const blockTwo = $blockTwo.position();
    const blockThree = $blockThree.position();
    const redLinePos = $redline.position();

    const blockOneTop = blockOne.top;
    const blockTwoTop = blockTwo.top;
    const blockThreeTop = blockThree.top;
    const redLineBottomPos = redLinePos.top + $redline.height();

    if(blockOneTop <= redLineBottomPos && blockTwoTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      // audio3();
      $allBlocks.hide();
      applyScore3();
      applyTopScore();

    } else if(blockOneTop <= redLineBottomPos && blockTwoTop <= redLineBottomPos) {
      // audio2();
      $blockOne.hide();
      $blockTwo.hide();
      applyScore2();
      RemoveOneHeart();

    } else if(blockTwoTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      // audio2();
      $blockTwo.hide();
      $blockThree.hide();
      applyScore2();
      RemoveOneHeart();

    } else if(blockOneTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      // audio2();
      $blockOne.hide();
      $blockThree.hide();
      applyScore2();
      RemoveOneHeart();

    } else if(blockOneTop <= redLineBottomPos) {
      // audio1();
      $blockOne.hide();
      applyScore1();
      RemoveTwoHearts();

    } else if(blockTwoTop <= redLineBottomPos) {
      // audio1();
      $blockTwo.hide();
      applyScore1();
      RemoveTwoHearts();

    } else if(blockThreeTop <= redLineBottomPos) {
      // audio1();
      $blockThree.hide();
      applyScore1();
      RemoveTwoHearts();

    } else {
      RemoveThreeHearts();
    }

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

  function RemoveOneHeart() {
    $('#heart1').attr('src', '/images/heartempty.png');
    lives -= 1;
    lifeCheck();
  }

  function RemoveTwoHearts() {
    $('#heart1').attr('src', '/images/heartempty.png');
    $('#heart2').attr('src', '/images/heartempty.png');
    lives -= 2;
    lifeCheck();
  }

  function RemoveThreeHearts() {
    $('.heart').attr('src', '/images/heartempty.png');
    lives -= 3;
    lifeCheck();
  }

  //// SCORING //////////////////////////////////////// HALF WORKING

  function applyScore3() {
    score += 150;
    $score.text('Score: ' + score);
  }

  function applyScore2() {
    score += 100;
    $score.text('Score: ' + score);
  }

  function applyScore1() {
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

    generateBlocks(5);
    blockLoopOne();
    blockLoopTwo();
    blockLoopThree();
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
