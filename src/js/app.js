// console.log('yo');
//
// $(document).ready(function(){
//   // animateDiv();
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
//


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

function line(y) {
  const $redLine = $('<div />');
  $('.gameWindow').append($redLine);
  $redLine.css({ backgroundColor: 'red', width: '660px', height: '2px', top: `${y}px`, position: 'absolute' });
}

function printMousePos(event) {
  const y = event.offsetY;
  console.log(event);
  line(y);
}

document.addEventListener('click', printMousePos);
