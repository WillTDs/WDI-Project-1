console.log('yo');

$(document).ready(function(){
  // animateDiv();

});

function makeNewPosition(){
  const h = $('.window').height() - 50;
  const nh = Math.floor(Math.random() * h);
  return [nh];
}

function animateDiv(){
  // const mover = makeNewPosition();
  const mover = [0, $('.window').height() - 50];
  $('.blockOne').animate({ top: mover[0], left: 0 }, function(){
    animateDiv();
  });
}
