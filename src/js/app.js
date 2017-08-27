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
      duration: 1000,
      complete: function() {

        $('.blockThree').animate({top: '0%'}, {
          duration: 1000,
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
      console.log('perfect');
    } else {
      console.log('nah m8');
    }
  }

  //// AUDIO ////////////////////////////////////////////// BROKEN

});
