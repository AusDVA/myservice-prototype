jQuery(document).ready(function($){
	// open the panel
	$('.panel-btn').on('click', function(event){
		event.preventDefault();
		$('.panel').addClass('is-visible');
		$("#email").focus();
	});
	// close the panel
	$('.panel').on('click', function(event){
		if( $(event.target).is('.panel') || $(event.target).is('.panel-close') ) { 
			$('.panel').removeClass('is-visible');
			event.preventDefault();
		}
	});
	// open help panel on unauth screen
	$('.panel-help').on('click', function(event){
		event.preventDefault();
		$('.panel-home-help').addClass('is-visible');
	});
	// close the help panel
	$('.panel-home-help').on('click', function(event){
		if( $(event.target).is('.panel-home-help') || $(event.target).is('.panel-close') ) { 
			$('.panel-home-help').removeClass('is-visible');
			event.preventDefault();
		}
	});


    // Help slide gesture
      let panel = document.getElementById('help-panel');
      if (panel) {
        let touchRegion = new ZingTouch.Region(panel);
        let panelContent = document.getElementById('help-panel-content');
        touchRegion.bind(panelContent, 'swipe', (event) => {
          let direction = event.detail.data[0].currentDirection;
          if (direction < 45 || direction > 315) {
            $(panel).removeClass('is-visible');
          }
        });
      }
      else {
        console.log('no help panel');
      }

});
