$(document).ready(function(){

  //// GLOBAL VARIABLES ///////////////////////////////////


  //// BLOCK ANIMATION //////////////////////////////////// BROKEN

  function blockLoopOne() {
    $('.blockOne').animate({'top': '500'}, {
      duration: 1000,
      complete: function() {

        $('.blockOne').animate({top: 0}, {
          duration: 1000,
          complete: blockLoopOne});
      }});
  }

  function blockLoopTwo() {
    $('.blockTwo').animate({'top': '500'}, {
      duration: 2000,
      complete: function() {

        $('.blockTwo').animate({top: 0}, {
          duration: 2000,
          complete: blockLoopTwo});
      }});
  }

  function blockLoopThree() {
    $('.blockThree').animate({'top': '500'}, {
      duration: 3000,
      complete: function() {

        $('.blockThree').animate({top: 0}, {
          duration: 3000,
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
    $redLine.css({ backgroundColor: 'red', width: '660px', height: '3px', top: `${y}px`, position: 'absolute' });

    checkCollision();
  }

  function printMousePos(event) {
    const y = event.offsetY;
    console.log(event);
    line(y);
  }

  document.addEventListener('click', printMousePos);


  //// COLLISION DETECTION ///////////////////////////////// BROKEN

  function checkCollision() {

    const $blockOne = $('.blockOne');
    const $redline = $('.redline');

    const redLinePos = $redline.position();
    const blockOne = $blockOne.position();

    const blockOneTop = blockOne.top;
    const redLineBottomPos = redLinePos.top + $redline.height();

    if(blockOneTop <= redLineBottomPos) {
      console.log('hit');
    }
  }


});
