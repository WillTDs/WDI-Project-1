$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////


  //// BLOCK ANIMATION //////////////////////////////////// WORKING

  function blockLoopOne() {
    $('.blockOne').animate({'top': '87%'}, {
      duration: 5000,
      complete: function() {

        $('.blockOne').animate({top: '0%'}, {
          duration: 5000,
          complete: blockLoopOne});
      }});
  }

  function blockLoopTwo() {
    $('.blockTwo').animate({'top': '87%'}, {
      duration: 5000,
      complete: function() {

        $('.blockTwo').animate({top: '0%'}, {
          duration: 5000,
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
      audio3();

    } else if(blockOneTop <= redLineBottomPos && blockTwoTop <= redLineBottomPos) {
      $blockOne.hide();
      $blockTwo.hide();
      audio2();

    } else if(blockTwoTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      $blockTwo.hide();
      $blockThree.hide();
      audio2();

    } else if(blockOneTop <= redLineBottomPos && blockThreeTop <= redLineBottomPos) {
      $blockOne.hide();
      $blockThree.hide();
      audio2();

    } else if(blockOneTop <= redLineBottomPos) {
      $blockOne.hide();
      audio1();

    } else if(blockTwoTop <= redLineBottomPos) {
      $blockTwo.hide();
      audio1();

    } else if(blockThreeTop <= redLineBottomPos) {
      $blockThree.hide();
      audio1();
    }
  }

  //// AUDIO ////////////////////////////////////////////// BROKEN

  function audio3() {
    const audioTriple = new Audio('/audio/3punch.wav');
    const audioWow = new Audio('/audio/wow.wav');
    audioTriple.play();
    audioWow.play();
  }

  function audio2() {
    const audioPunch = new Audio('/audio/punch.wav');
    audioPunch.play();
    audioPunch.play();
  }

  function audio1() {
    const audioPunch = new Audio('/audio/punch.wav');
    audioPunch.play();  
  }


});
