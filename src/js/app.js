$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////


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
      duration: 3000,
      complete: function() {

        $('.blockTwo').animate({top: '0%'}, {
          duration: 3000,
          complete: blockLoopTwo});
      }});
  }

  function blockLoopThree() {
    $('.blockThree').animate({'top': '87%'}, {
      duration: 5000,
      complete: function() {

        $('.blockThree').animate({top: '0%'}, {
          duration: 5000,
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

      $('#triple').play();

    } else if(blockOneTop <= redLineBottomPos && blockTwoTop <= redLineBottomPos) {
      // audio2();
      $blockOne.hide();
      $blockTwo.hide();
      RemoveOneHeart();

    } else if(blockTwoTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      // audio2();
      $blockTwo.hide();
      $blockThree.hide();
      RemoveOneHeart();

    } else if(blockOneTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      // audio2();
      $blockOne.hide();
      $blockThree.hide();
      RemoveOneHeart();

    } else if(blockOneTop <= redLineBottomPos) {
      // audio1();
      $blockOne.hide();
      RemoveTwoHearts();

    } else if(blockTwoTop <= redLineBottomPos) {
      // audio1();
      $blockTwo.hide();
      RemoveTwoHearts();

    } else if(blockThreeTop <= redLineBottomPos) {
      // audio1();
      $blockThree.hide();
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

  //// HEART DESTROYER //////////////////////////////////////

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



});
