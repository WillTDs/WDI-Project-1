$(document).ready(function(){


  //// BLOCK ANIMATION //////////////////////////////////// BROKEN

  // animateDiv();
  //
  // });
  //
  // function makeNewPosition(){
  //   const h = $('.window').height() - 50;
  //   const nh = Math.floor(Math.random() * h);
  //   return [nh];
  // }
  //
  // function animateDiv(){
  //   // const mover = makeNewPosition();
  //   const mover = [0, $('.window').height() - 50];
  //   $('.blockOne').animate({ top: mover[0], left: 0 }, function(){
  //     animateDiv();
  //   });
  // }

  //// SHOW COORDINATES OF MOUSE//////////////////////////// BROKEN

  // function showCoords() {
  //   const x = event.clientX;
  //   const y = event.clientY;
  //   const coords = 'x coordinates: ' + x + ', y coordinates: ' + y;
  //   console.log(coords);
  // }
  //
  // const $mouseBox = $('mouseBox');
  //
  // $mouseBox.click(function() {
  //   // showCoords();
  //   console.log(window.printMousePos());
  // });

  //// REDLINE FUNCTION //////////////////////////////////// HALF WORKING

  function line(y) {
    const $redLine = $('<div class="redline" />');
    $('.gameWindow').append($redLine);
    $redLine.css({ backgroundColor: 'red', width: '660px', height: '3px', top: `${y}px`, position: 'absolute' });
  }

  function printMousePos(event) {
    const y = event.offsetY;
    console.log(event);
    line(y);
  }

  document.addEventListener('click', printMousePos);


  //// COLLISION DETECTION ///////////////////////////////// BROKEN

  // var hitList = $('.redline').collision('.blockOne');
  //
  // console.log(hitList);

  // function isCollide(a, b) {
  //   return !(
  //     ((a.y + a.height) < (b.y)) ||
  //     (a.y > (b.y + b.height)) ||
  //     ((a.x + a.width) < b.x) ||
  //     (a.x > (b.x + b.width))
  //   );
  // }
  //
  // function rect(obj) {
  //   return {
  //     x: parseInt($(obj).css('left')),
  //     y: parseInt($(obj).css('top')),
  //     width: $(obj).width(),
  //     height: $(obj).height()
  //   };
  // }
  //
  // const a = rect('.redline');
  // const b = rect('.blockOne');
  //
  // console.log(isCollide(a, b));
  // const $redline = $('redline');
  // const $blockOne = $('blockOne');
  //
  // function checkCollision () {
  //   const redLinePos = $redline.position();
  //   const blockOne = $blockOne.position();
  //   const framePos = $frame.offset();
  //
  //   const ballRightPos = ballPos.left + $ball.width();
  //   const frameTopPos = framePos.top;
  //   const frameBottomPos = framePos.top + $frame.height();
  //   const ballTopPos = ballPos.top;
  //   const ballBottomPos = ballPos.top + $ball.height();
  //
  //
  //   if(ballRightPos >= targetPos.left) {
  //
  //     // console.log(ballTopPos >= frameTopPos, ballBottomPos <= frameBottomPos, ballBottomPos, frameBottomPos);
  //
  //     if(ballTopPos >= frameTopPos && ballBottomPos <= frameBottomPos) {
  //       console.log('hit');
  //       $ball.stop().hide();
  //     } else {
  //       console.log('miss');
  //     }




  function checkCollision() {

    const $redline = $('.redline');
    const $blockOne = $('.blockOne');

    const $redLinePos = $redline.position();
    const blockOne = $blockOne.position();

    const blockOneTop = blockOne.top;
    const redLineBottomPos = $redLinePos.top + $redline.height();

    if(blockOneTop <= redLineBottomPos) {
      console.log('hit');
    }
  }

  checkCollision();
});
