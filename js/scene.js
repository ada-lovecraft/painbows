(function() {
  var container;
  var renderer, particle;
  var mouseX = 0, mouseY = 0;

  init();
  animate();

  function init() {
    var container = $('<canvas/>', {
      id: 'testing'
    });
    console.log(container);
    $('body').append(container);
  }

  function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }

  function onDocumentTouch( event ) {
    if ( event.touches.length == 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  var t = 0;
  function render() {
    
  }

})();
