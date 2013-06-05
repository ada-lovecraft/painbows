(function () {

  var
    AUDIO_FILE        = 'songs/painbows'
    , dancer, kick;

  /*
   * Dancer.js magic
   */

  dancer = new Dancer();
  happy = dancer.createKick({
    frequency: [0,500],
    threshold: 0.5,
    onKick: doHappy,
    offKick: decayHappy
  });

  kick = dancer.createKick({
    frequency: [0,5],
    threshold: .7,
    onKick: doKick,
    offKick: decay
  });

  dancer.onceAt( 0, function () {
    setupRainbow();
    kick.on();
    beginRainbow();
  }).onceAt( 4, function () {
    beginPainbow();
  }).load({ src: AUDIO_FILE, codecs: [ 'mp3' ]})
  
  dancer.play();
  // For debugging
  window.dancer = dancer;

  console.log('lol');


})();

function setupRainbow() {
  $canvas = $('canvas')[0];
  console.log($canvas);
}

function doHappy() {

}


function decayHappy() {

}


function doKick(a,b,c,d,e) {
  console.log(a,b,c,d,e);
}

function decay(e) {
  console.log('decay');
}

function beginRainbow() {
  console.log('rainbow');
}

function beginPainbow() {
  console.log('painbow');
}