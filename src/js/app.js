$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////

  const $score  = $('#score');
  const $hScore = $('#hScore');

  let score   = 0;
  let hScore  = 0;

  //// BLOCK ANIMATION //////////////////////////////////// WORKING

  function blockLoopOne() {
    $('.blockOne').animate({'top': '87%'}, {
      duration: 4000,
      complete: function() {

        $('.blockOne').animate({top: '0%'}, {
          duration: 4000,
          complete: blockLoopOne});
      }});
  }

  function blockLoopTwo() {
    $('.blockTwo').animate({'top': '87%'}, {
      duration: 4000,
      complete: function() {

        $('.blockTwo').animate({top: '0%'}, {
          duration: 4000,
          complete: blockLoopTwo});
      }});
  }

  function blockLoopThree() {
    $('.blockThree').animate({'top': '87%'}, {
      duration: 4000,
      complete: function() {

        $('.blockThree').animate({top: '0%'}, {
          duration: 4000,
          complete: blockLoopThree});
      }});
  }

  blockLoopOne();
  blockLoopTwo();
  blockLoopThree();

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

  document.addEventListener('click', printMousePos);


  //// COLLISION DETECTION ///////////////////////////////// WORKING

  function checkCollision() {

    const $blockOne   = $('.blockOne');
    const $blockTwo   = $('.blockTwo');
    const $blockThree = $('.blockThree');
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

      $blockOne.hide();
      $blockTwo.hide();
      $blockThree.hide();
      applyScore3();
      applyTopScore();
      // $('#triple').get[0].play();

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

  //// AUDIO ////////////////////////////////////////////// BROKEN

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

  //// HEART DESTROYER ///////////////////////////////////// WORKING

  function RemoveOneHeart() {
    $('#heart1').attr('src', '/images/heartempty.png');
  }

  function RemoveTwoHearts() {
    $('#heart1').attr('src', '/images/heartempty.png');
    $('#heart2').attr('src', '/images/heartempty.png');
  }

  function RemoveThreeHearts() {
    $('#heart1').attr('src', '/images/heartempty.png');
    $('#heart2').attr('src', '/images/heartempty.png');
    $('#heart3').attr('src', '/images/heartempty.png');
  }

  //// SCORING /////////////////////////////////////////////// HALF WORKING

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

  // function resetScore() {
  //   score = 0;
  //   $score.text(score);
  // }


  applyTopScore();

});
