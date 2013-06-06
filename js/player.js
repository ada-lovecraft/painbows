

   // ----------------------------------------
        // Particle
        // ----------------------------------------

        function Particle( x, y, radius ) {
            this.init( x, y, radius );
        }

        Particle.prototype = {

            init: function( x, y, radius ) {

                this.alive = true;

                this.radius = radius || 10;
                this.wander = 0.15;
                this.theta = random( TWO_PI );
                this.drag = 0.92;
                this.color = '#fff';

                this.x = x || 0.0;
                this.y = y || 0.0;

                this.vx = 0.0;
                this.vy = 0.0;
            },

            move: function() {

                this.x += this.vx;
                this.y += this.vy;

                this.vx *= this.drag;
                this.vy *= this.drag;

                this.theta += random( -0.5, 0.5 ) * this.wander;
                this.vx += sin( this.theta ) * 0.1;
                this.vy += cos( this.theta ) * 0.1;

                this.radius *= 0.96;
                this.alive = this.radius > 0.5;
            },

            draw: function( ctx ) {

                ctx.beginPath();
                ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        };

        // ----------------------------------------
        // Example
        // ----------------------------------------

        var MAX_PARTICLES = 280;
        var RAINBOW_COLOURS = [ '#FF0000', '#FF8000', '#00FFFF', '#00FF00', '#0000FF', '#CC00FF', '#BF5FFF' ];
        var PAINBOW_COLOURS = [ '#FFFFFF', '#FF0000', '#00FF00', '#0000FF'];
        var color = RAINBOW_COLOURS;
        var particles = [];
        var pool = [];

        var demo = Sketch.create({
            container: document.getElementById( 'container' )
        });

        demo.setup = function() {

            // Set off some initial particles.
            var i, x, y;

            for ( i = 0; i < 20; i++ ) {
                x = ( demo.width * 0.5 ) + random( -100, 100 );
                y = ( demo.height * 0.5 ) + random( -100, 100 );
                //demo.spawn( x, y );
            }
        };

        demo.spawnRainbow = function( x, y, radius ) {

            if ( particles.length >= MAX_PARTICLES )
                pool.push( particles.shift() );

            particle = pool.length ? pool.pop() : new Particle();
            particle.init( x, y,radius );

            particle.wander = random( 0.5, 2.0 );
            particle.color = random( colors );
            particle.drag = random( 0.9, 0.99 );

            theta = random( TWO_PI );
            force = random( 2, 8 );

            particle.vx = sin( theta ) * force;
            particle.vy = cos( theta ) * force;

            particles.push( particle );
        };

        demo.spawnPainbow = function( x, y, radius ) {

            if ( particles.length >= MAX_PARTICLES )
                pool.push( particles.shift() );

            particle = pool.length ? pool.pop() : new Particle();
            particle.init( x, y,radius );

            particle.wander = random( 0.5, 2.0 );
            particle.color = random( COLOURS );
            particle.drag = random( 0.9, 0.99 );

            theta = random( TWO_PI );
            force = random( 2, 8 );

            particle.vx = sin( theta ) * force;
            particle.vy = cos( theta ) * force;

            particles.push( particle );
        };

        demo.update = function() {

            var i, particle;

            for ( i = particles.length - 1; i >= 0; i-- ) {

                particle = particles[i];

                if ( particle.alive ) particle.move();
                else pool.push( particles.splice( i, 1 )[0] );
            }
        };

        demo.draw = function() {

            demo.globalCompositeOperation  = 'lighter';

            for ( var i = particles.length - 1; i >= 0; i-- ) {
                particles[i].draw( demo );
            }
        };

        /*
        demo.mousemove = function() {

            var particle, theta, force, touch, max, i, j, n;

            for ( i = 0, n = demo.touches.length; i < n; i++ ) {

                touch = demo.touches[i], max = random( 1, 4 );
                for ( j = 0; j < max; j++ ) {
                  demo.spawn( touch.x, touch.y );
                }

            }
        };
        */
        
     


  var
    AUDIO_FILE        = 'songs/painbows'
    , dancer, kick, happy, pain, squeal;


  dancer = new Dancer();



function doHappy(e) {
  x = ( demo.width * 0.5 ) + random( -demo.width/2, demo.width / 2 );
  y = ( demo.height * 0.5 ) + random( -demo.height/2, demo.height/2 );
  
  demo.spawnRainbow(x,y, 1000*e);

}

function doPain(e) {
  x = ( demo.width * 0.5 ) + random( -demo.width/2, demo.width / 2 );
  y = ( demo.height * 0.5 ) + random( -demo.height/2, demo.height/2 );
  demo.spawnRainbow(x,y, 1000*e);

}

function doSqueal(e) {
  $('#haha').show();
}

function decaySqueal(e) {
  $('#haha').hide();
}

function beginRainbow() {
  $('body').removeClass('painbow');
  colors = RAINBOW_COLOURS;
  $('#lol').hide();
  $('#haha').hide();
}

function beginPainbow() {
  $('body').addClass('painbow');
  colors = PAINBOW_COLOURS;
  $lol = $('#lol');
  $lol.css('left',(demo.width * 0.5) - ($lol.width()/2) + 'px');
  $lol.css('top', (demo.height * 0.5) - ($lol.height()/2) + 'px');
  $lol.show();
}

function restartRainbow() {
  console.log('restarting');

happy = dancer.createKick({
  frequency: [0,500],
  threshold: 0,
  onKick: doHappy,
   //offKick: decayHappy
});

pain = dancer.createKick({
    frequency: [0,2.5],
    threshold: .6,
    onKick: doPain
  });

squeal = dancer.createKick({
  frequency: [3,200],
  threshold: .1,
  onKick: doSqueal
  ,offKick: decaySqueal
});

 dancer.onceAt( 0, function () {
    beginRainbow();
    happy.on();
  }).onceAt( 6, function () {
    beginPainbow();
    happy.off();
    pain.on();
    squeal.on();
  }).onceAt( 63, function() {
    pain.off();
    squeal.off();
    dancer.pause();
    restartRainbow();
  })
  .load({ src: AUDIO_FILE, codecs: [ 'mp3' ]})

  dancer.play();
}

restartRainbow();

/*
 

 

    beginPainbow();
  
  
  //dancer.play();
  // For debugging
  window.dancer = dancer;

  setupRainbow();
  dancer.play();



function setupRainbow() {
  
}



function decayHappy() {

}


function doKick(a,b,c,d,e) {
  sketch.spawn();

}

function decay(e) {
}

function beginRainbow() {
  console.log('rainbow');
}

function beginPainbow() {
  console.log('painbow');
}
*/